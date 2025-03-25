/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

//--- https://vitest.dev/guide/
import { defineConfig } from 'vitest/config';

const unitTest = {
    name: 'StockHub',
    environment: 'node',
    globals: true,
    root: '.',
    include: [ 'tests/**/*.{test,spec}.?(c|m)[jt]s?(x)' ],
    // exclude: [
    //     'coverage', 'dist', 'install', 'logs', 'manual',
    //     'node_modules', 'prisma', 'sessions', 'zzstudy', 'zztest',
    //     'packages/efriend/efriends/efriend.test.js' 
    // ],

    // watchExclude: [ '**/dist/**', '**/logs/**', '**/node_modules/**' ],
    watch: false,
    setupFiles: [ './tests/vitest/vitest.setup.js' ],

    // reporters: [ 'json' ]
    // reporters: [ 'verbose' ]
    // coverage: {
    //     provider: 'v8',
    //     reporter: [ 'text', 'json', 'html' ]
    // }
};

const workspace = [
    {
        test: unitTest
    }
];

export default defineConfig({
    test: {
        workspace
    }
});
