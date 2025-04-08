/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

import { describe, expect, it } from 'vitest'

import { getConfig } from '../../src/Config.js';

//--- https://vitest.dev/guide/
describe('Test Config', () => {
    it('Test getConfig', async () => {
        const conf = getConfig();

        expect(conf).not.toBeUndefined();
        expect(conf.root).not.toBeUndefined();
        expect(conf.root).toBe('./');

        expect(conf.database).not.toBeUndefined();
        expect(conf.database.type).not.toBeUndefined();
        expect(conf.database.type).toBe('sqlite3');
        expect(conf.database.filename).not.toBeUndefined();
        expect(conf.database.filename).toBe('files/sqlite3/StockHub.db');
    });
});
