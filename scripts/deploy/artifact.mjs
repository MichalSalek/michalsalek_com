import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { lstat, readFile, readdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const digest = value => createHash('sha256').update(value).digest('hex');
const gitSha = () => execFileSync('git', ['rev-parse', 'HEAD'], {encoding: 'utf8'}).trim();

// The commit identifies all tracked build inputs, including lockfile and Next config.
// The explicit public environment and tool versions identify the remaining inputs.
export function configurationDigest(env = process.env, node = process.version, npm = execFileSync('npm', ['--version'], {encoding: 'utf8'}).trim()) {
    const publicEnv = Object.fromEntries(Object.entries(env).filter(([key]) => key.startsWith('NEXT_PUBLIC_')).sort(([a], [b]) => a.localeCompare(b)));
    return digest(JSON.stringify({publicEnv, nodeEnv: env.NODE_ENV ?? null, node, npm}));
}

async function filesIn(dir, prefix = '') {
    const result = {};
    for (const name of (await readdir(dir)).sort()) {
        const relative = prefix ? `${prefix}/${name}` : name;
        const path = join(dir, name);
        const stat = await lstat(path);
        if (stat.isDirectory()) Object.assign(result, await filesIn(path, relative));
        else if (stat.isFile()) result[relative] = digest(await readFile(path));
        else throw new Error(`Unsupported artifact entry: ${relative}`);
    }
    return result;
}

export async function createManifest(out, {sha, runId, config}) {
    const release = JSON.parse(await readFile(join(out, 'release.json'), 'utf8'));
    if (release.sha !== sha || release.dirty !== false) throw new Error('Release metadata does not identify a clean target SHA');
    return {version: 1, sha, runId, config, files: await filesIn(out)};
}

export async function verifyManifest(out, manifest, expected) {
    if (manifest.version !== 1 || manifest.sha !== expected.sha || manifest.runId !== expected.runId || manifest.config !== expected.config) {
        throw new Error('Artifact provenance or build configuration mismatch');
    }
    const actual = await createManifest(out, expected);
    if (JSON.stringify(actual.files) !== JSON.stringify(manifest.files)) throw new Error('Artifact contents do not match manifest');
}

async function main() {
    const [action, manifestPath, runId] = process.argv.slice(2);
    if (!['create', 'verify'].includes(action) || !manifestPath || !/^\d+$/.test(runId ?? '')) throw new Error('Usage: artifact.mjs create|verify MANIFEST RUN_ID');
    const expected = {sha: gitSha(), runId, config: configurationDigest()};
    if (action === 'create') await writeFile(manifestPath, JSON.stringify(await createManifest('out', expected)) + '\n');
    else await verifyManifest('out', JSON.parse(await readFile(manifestPath, 'utf8')), expected);
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main().catch(error => { console.error(error.message); process.exitCode = 1; });
