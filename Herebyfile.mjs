/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

import { execa } from 'execa';
import { task } from 'hereby';

export const typescript_compile = task({
    name: 'typescript_compile',
    run: async () => {
        await execa('built/local/tsgo', ['tsc', '--project', './configs/tsconfig.esm.json']);
    },
});
