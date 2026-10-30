import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readlink, access, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

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
