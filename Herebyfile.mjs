/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import { execa } from 'execa';
import { task } from 'hereby';

const rootFolder = cwd();
const packageFilename = path.join(rootFolder, 'package.json');
const packageContent = fs.readFileSync(packageFilename, 'utf-8');
const makePackageJson = (moduleType) => {
    const packageContentNew = [];
    packageContent.split('\n').forEach((line) => {
        if (line.match(/"type": "module"/)) {
            packageContentNew.push(`    "type": "${(moduleType == 'esm') ? 'module' : 'commonjs'}",`);
        } else {
            packageContentNew.push(line);
        }
    });
    const packageFilenameNew = path.join(rootFolder, 'lib', moduleType, 'package.json');
    fs.writeFileSync(packageFilenameNew, packageContentNew.join('\n'));
};

export const typescript_esm = task({
    name: 'typescript_esm',
    run: async () => {
        await execa('built/local/tsgo', ['tsc', '--project', './configs/tsconfig.esm.json']);
        makePackageJson('esm');
    },
});

export const typescript_cjs = task({
    name: 'typescript_cjs',
    run: async () => {
        await execa('built/local/tsgo', ['tsc', '--project', './configs/tsconfig.cjs.json']);
        makePackageJson('cjs');
    },
});
