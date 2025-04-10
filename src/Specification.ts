/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

import { getDatabase } from './Database.js';
import { findExchange } from './Exchange.js';
import { SPECIFICATION_INFO } from './Specification.type.js';

export const findSpecification = async (exchangeId: number, trid: string, isProduct: boolean = true): Promise<SPECIFICATION_INFO | undefined> => {
    const exchange = await findExchange(exchangeId);
    if (exchange == undefined) {
        console.error('Exchange not found');
        return undefined;
    }

    let specification: SPECIFICATION_INFO | undefined = undefined;

    try {
        const prisma = getDatabase();
        const result = await prisma.specifications.findFirst({
            where: {
                exchangeId: exchange.id,
                trid: trid,
                isProduct: isProduct
            }
        });
        specification = (result) ? result as unknown as SPECIFICATION_INFO : undefined;

        if (specification == undefined) {
            //--- pppqqq
        }
    } catch (error) {
        console.error('Error getting specification:', error);
    }
    return specification;
}
