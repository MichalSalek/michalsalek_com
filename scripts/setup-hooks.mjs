import { spawnSync } from 'node:child_process';
if (!process.env.CI) {
    const current = spawnSync('git', ['config', '--get', 'core.hooksPath'], {encoding: 'utf8'});
    if (!current.stdout.trim() || current.stdout.trim() === '.husky') {
        const result = spawnSync('git', ['config', '--local', 'core.hooksPath', '.husky'], {stdio: 'ignore'});
        if (result.status === 0) console.log('Local verification hook installed.');
    } else console.log('Existing Git hook directory preserved.');
}
