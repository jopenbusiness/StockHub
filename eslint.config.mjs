/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// https://eslint.org/docs/latest/use/configure/language-options#predefined-global-variables
import pluginJs from '@eslint/js';
import globals from 'globals';                              //--- https://www.npmjs.com/package/globals
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ignorePath = path.resolve(__dirname, ".prettierignore");

const ignores = fs.readFileSync(ignorePath, 'utf8').split('\n')
                  .filter(line => ((line.startsWith('#') == false) && (line.trim() != '')))
                  .map(ignore => ignore.replace('\r', ''));

/**
 * @see https://www.npmjs.com/package/eslint
 * @see https://eslint.org/docs/latest/use/configure/rules
 */
const config = [
    {
        ignores: ignores
        // env: { browser: true, es2020: true },
        // plugins: [],
        // extends: [],
        // rules: {},
        // settings: {}
    },
    {
        files: [ 
            'src/**/*.{ts,tsx}',
            'tests/**/*.{ts,tsx}',
            'bin/**/*.{ts,tsx}',
            'scripts/**/*.{ts,tsx}',

            'src/python/**/*.{py}',
            'tests/python/**/*.{py}',
            'bin/python/**/*.{py}',
            'scripts/python/**/*.{py}'
        ]
    },
    {
        languageOptions: {
            globals: globals.browser
        },
    },
    pluginJs.configs.recommended,                           //--- ESLint의 권장 설정
    ...tseslint.configs.recommended                         //--- TypeScript의 권장 설정
];
// console.log('globals.browser', globals.browser);
// console.log('pluginJs.configs.recommended', pluginJs.configs.recommended);
// console.log('tseslint.configs.recommended', tseslint.configs.recommended);

export default config;
