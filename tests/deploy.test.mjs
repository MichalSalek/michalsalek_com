import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, readlink, access, rm, symlink, chmod, copyFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { configurationDigest, createManifest, verifyManifest } from '../scripts/deploy/artifact.mjs';

const script = resolve('scripts/deploy/remote-release.sh');
test('release adoption, rollback and locking preserve the original site', async () => {
    const root = await mkdtemp(join(tmpdir(), 'static-release-'));
    const run = (action, release) => spawnSync('bash', [script, root, action, release], {encoding: 'utf8'});
    try {
        await mkdir(join(root, 'public_html'));
        await writeFile(join(root, 'public_html/index.html'), 'original');
        for (const id of ['first', 'second']) {
            await mkdir(join(root, 'releases', id), {recursive: true});
            await writeFile(join(root, 'releases', id, 'index.html'), id);
            await writeFile(join(root, 'releases', id, 'release.json'), '{}');
        }
        assert.equal(run('activate', 'first').status, 0);
        assert.equal(await readlink(join(root, 'public_html')), 'releases/first');
        await access(join(root, 'legacy-first/index.html'));
        assert.equal(run('verify', 'first').status, 0);
        assert.equal(run('activate', 'second').status, 0);
        assert.notEqual(run('rollback', 'first').status, 0, 'A stale operation must not replace a newer release');
        assert.equal(run('rollback', 'second').status, 0);
        assert.equal(await readlink(join(root, 'public_html')), 'releases/first');
        await mkdir(join(root, '.deploy-lock'));
        assert.notEqual(run('activate', 'second').status, 0);
        assert.equal(await readlink(join(root, 'public_html')), 'releases/first');
    } finally { await rm(root, {recursive: true, force: true}); }
});

test('CI artifact retrieval falls back only when absent and fails on corruption', async () => {
    const root = await mkdtemp(join(tmpdir(), 'static-fetch-'));
    const fetchScript = resolve('scripts/deploy/fetch-ci-artifact.sh');
    const sha = 'a'.repeat(40);
    const runId = '123';
    const env = {...process.env, GITHUB_SHA: sha, GITHUB_REPOSITORY: 'owner/repo', GH_TOKEN: 'test', GITHUB_OUTPUT: join(root, 'output'), PATH: `${join(root, 'bin')}:${process.env.PATH}`};
    const run = mode => spawnSync('bash', [fetchScript], {cwd: root, encoding: 'utf8', env: {...env, TEST_MODE: mode}});
    try {
        await mkdir(join(root, 'bin'), {recursive: true});
        await mkdir(join(root, 'scripts/deploy'), {recursive: true});
        await copyFile(resolve('scripts/deploy/artifact.mjs'), join(root, 'scripts/deploy/artifact.mjs'));
        await writeFile(join(root, 'bin/git'), `#!/bin/sh\nprintf '%s\\n' '${sha}'\n`);
        await writeFile(join(root, 'bin/gh'), `#!/bin/bash\ncase "$*" in\n  *workflows/ci.yml/runs*) if [[ "$TEST_MODE" == absent ]]; then echo '{"workflow_runs":[]}'; else echo '{"workflow_runs":[{"id":123,"head_sha":"${sha}","head_branch":"main","event":"push","status":"completed","conclusion":"success"}]}'; fi ;;\n  *runs/123/artifacts*) cat artifact-response.json ;;\n  *artifacts/42/zip*) cat fixture.zip ;;\n  *) exit 1 ;;\nesac\n`);
        await chmod(join(root, 'bin/git'), 0o755);
        await chmod(join(root, 'bin/gh'), 0o755);
        assert.equal(run('absent').status, 0);
        assert.match(await readFile(env.GITHUB_OUTPUT, 'utf8'), /available=false/);

        const fixture = join(root, 'fixture');
        await mkdir(join(fixture, 'out'), {recursive: true});
        await writeFile(join(fixture, 'out/release.json'), JSON.stringify({sha, dirty: false}));
        await writeFile(join(fixture, 'out/index.html'), 'verified');
        const expected = {sha, runId, config: configurationDigest(env)};
        await writeFile(join(fixture, 'manifest.json'), JSON.stringify(await createManifest(join(fixture, 'out'), expected)));
        assert.equal(spawnSync('python3', ['-c', 'import pathlib, zipfile, sys\nwith zipfile.ZipFile(sys.argv[1], "w") as archive:\n for path in pathlib.Path(".").rglob("*"):\n  if path.is_file(): archive.write(path)', join(root, 'fixture.zip')], {cwd: fixture}).status, 0);
        const digest = createHash('sha256').update(await readFile(join(root, 'fixture.zip'))).digest('hex');
        await writeFile(join(root, 'artifact-response.json'), JSON.stringify({artifacts: [{id: 42, name: 'verified-static-site', expired: false, digest: `sha256:${'0'.repeat(64)}`}]}));
        assert.notEqual(run('present').status, 0);
        await writeFile(join(root, 'artifact-response.json'), JSON.stringify({artifacts: [{id: 42, name: 'verified-static-site', expired: false, digest: `sha256:${digest}`}]}));
        const success = run('present');
        assert.equal(success.status, 0, success.stderr);
        assert.equal(await readFile(join(root, 'out/index.html'), 'utf8'), 'verified');
        assert.match(await readFile(env.GITHUB_OUTPUT, 'utf8'), /available=true/);
    } finally { await rm(root, {recursive: true, force: true}); }
});

test('CI artifact requires matching provenance, configuration and every exported byte', async () => {
    const out = await mkdtemp(join(tmpdir(), 'static-artifact-'));
    const config = configurationDigest({NEXT_PUBLIC_GA_ID: 'a', NEXT_PUBLIC_CONTACT_ENDPOINT: 'b'}, 'v24', '11');
    const expected = {sha: 'source-sha', runId: '123', config};
    try {
        await writeFile(join(out, 'release.json'), JSON.stringify({sha: expected.sha, dirty: false}));
        await mkdir(join(out, 'nested'));
        await writeFile(join(out, 'nested', 'index.html'), 'verified');
        const manifest = await createManifest(out, expected);
        await verifyManifest(out, manifest, expected);
        for (const altered of [{...expected, sha: 'other'}, {...expected, runId: '124'}, {...expected, config: 'other'}]) {
            await assert.rejects(verifyManifest(out, manifest, altered), /provenance or build configuration/);
        }
        assert.notEqual(config, configurationDigest({NEXT_PUBLIC_GA_ID: 'changed', NEXT_PUBLIC_CONTACT_ENDPOINT: 'b'}, 'v24', '11'));
        await writeFile(join(out, 'nested', 'index.html'), 'modified');
        await assert.rejects(verifyManifest(out, manifest, expected), /contents/);
        await writeFile(join(out, 'nested', 'index.html'), 'verified');
        await writeFile(join(out, 'extra'), 'unexpected');
        await assert.rejects(verifyManifest(out, manifest, expected), /contents/);
        await rm(join(out, 'extra'));
        await symlink('nested/index.html', join(out, 'link'));
        await assert.rejects(verifyManifest(out, manifest, expected), /Unsupported artifact entry/);
        await rm(join(out, 'link'));
        await writeFile(join(out, 'release.json'), JSON.stringify({sha: expected.sha, dirty: true}));
        await assert.rejects(verifyManifest(out, manifest, expected), /clean target SHA/);
    } finally { await rm(out, {recursive: true, force: true}); }
});
