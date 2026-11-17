import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {test} from 'node:test';
import {globSync as nextGlob} from 'fast-glob';
import {globSync as typescriptGlob, isDynamicPattern} from 'tinyglobby';

test('Lint glob resolves Next roots and TypeScript projects without scanning excluded directories', async () => {
    const cwd = await mkdtemp(join(tmpdir(), 'atomic-lint-glob-'));
    try {
        for (const directory of ['apps/site', 'apps/.preview', 'apps/node_modules/package']) {
            await mkdir(join(cwd, directory), {recursive: true});
            await writeFile(join(cwd, directory, 'tsconfig.json'), '{}');
        }
        await writeFile(join(cwd, 'apps', 'readme.txt'), '');
        assert.deepEqual(nextGlob('apps/*', {cwd, onlyDirectories: true}).sort(), ['apps/node_modules', 'apps/site']);
        assert.deepEqual(typescriptGlob('apps/{site,.preview}/tsconfig.json', {
            cwd, absolute: true, dot: true, expandDirectories: false,
        }).sort(), ['apps/.preview', 'apps/site'].map(directory => join(cwd, directory, 'tsconfig.json').replaceAll('\\', '/')));
        assert.deepEqual(typescriptGlob('apps', {cwd, ignore: ['apps/node_modules', '**/*.txt']}), ['apps/site/tsconfig.json']);
        assert.deepEqual(typescriptGlob('apps', {cwd, expandDirectories: false}), []);
        assert.equal(isDynamicPattern('apps/{site,.preview}/tsconfig.json'), true);
        assert.equal(isDynamicPattern('apps/site/tsconfig.json'), false);
    } finally {
        await rm(cwd, {recursive: true, force: true});
    }
});
