/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

import { describe, expect, it } from 'vitest'

import { findExchangeByGuid } from '../../src/Exchange.js';

//--- https://vitest.dev/guide/
describe('Test Exchange', () => {
    it('Test findExchange', async () => {
        const exchange = await findExchangeByGuid('5977df30-138d-11f0-a66e-4bd46a0b0d2d');

        expect(exchange).not.toBeUndefined();
        expect(exchange?.name).not.toBeUndefined();
        expect(exchange?.name).toBe('한국투자증권');
    });
});
