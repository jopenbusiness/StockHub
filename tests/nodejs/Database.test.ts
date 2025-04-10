/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

import { describe, expect, it } from 'vitest'

import { getDatabase } from '../../src/Database.js';

//--- https://vitest.dev/guide/
describe('Test Exchange', () => {
    it('Test findExchange', async () => {
        const prisma = await getDatabase();

        expect(prisma).not.toBeUndefined();
    });
});
