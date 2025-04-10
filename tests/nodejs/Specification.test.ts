/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

import { describe, expect, it } from 'vitest';

import { findSpecification } from '../../src/Specification.js';

import dotenv from 'dotenv';
dotenv.config();

// import { getConfig } from '../../src/Config.js';

//--- https://vitest.dev/guide/
describe('Test Specification', () => {
    it('Text Specification', async () => {
        const specification = await findSpecification(1, 'tokenP', true);
        expect(specification).toBeDefined();



    });
});
