/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license OBCon License 1.0
 */

import { execa } from 'execa';
import { task } from 'hereby';

export const typescript_compile = task({
    name: 'typescript_compile',
    run: async () => {
        await execa('built/local/tsgo', ['tsc', '--project', './conf/tsconfig.esm.json']);
    },
});
