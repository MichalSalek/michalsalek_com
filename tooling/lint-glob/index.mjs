import {globSync as find, hasMagic} from 'glob';
import {statSync} from 'node:fs';
import {parse, resolve} from 'node:path';

export function isDynamicPattern(pattern) {
    return hasMagic(pattern, {magicalBraces: true});
}

// These options cover Next's root-directory search and TypeScript's project and source-file searches.
export function globSync(patterns, {
    cwd = process.cwd(), absolute, dot, ignore = [], onlyDirectories = false, expandDirectories = true,
} = {}) {
    const directoryPattern = path => `${path.replace(/\/$/, '')}/**/*`;
    const include = [patterns].flat().map(pattern => {
        if (onlyDirectories || !expandDirectories || isDynamicPattern(pattern)) return pattern;
        return statSync(resolve(cwd, pattern), {throwIfNoEntry: false})?.isDirectory() ? directoryPattern(pattern) : pattern;
    });
    const exclude = ignore.flatMap(pattern => isDynamicPattern(pattern) ? [pattern] : [pattern, directoryPattern(pattern)]);
    const matches = find(include, {cwd, absolute, dot, ignore: exclude, nodir: !onlyDirectories, mark: onlyDirectories});
    return onlyDirectories
        ? matches.filter(entry => entry.endsWith('/')).map(entry => entry === parse(entry).root ? entry : entry.slice(0, -1))
        : matches;
}
