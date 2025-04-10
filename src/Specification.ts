/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

import https from 'https';                                  //--- https://nodejs.org/api/https.html
import axios from 'axios';                                  //--- https://www.npmjs.com/package/axios

import { getDatabase } from './Database.js';
import { findExchange } from './Exchange.js';
import { SPECIFICATION_INFO } from './Specification.type.js';

const apiServerUrl: string = 'https://invest.bluestones.biz/cms/ajax/services';
const apiServerParam: Record<string, string> = {
    action: 'specification',
    guid: '',
    trid: '',
    isProduct: 'true',
    // verifyDate: moment().format('YYYY-MM-DD'),
    // processCount: '-1',
    // version: '1'
};

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
            const options: { httpsAgent?: https.Agent } = {};
            if (0 < apiServerUrl.indexOf('localhost')) {
            //--- self-signed certificate 오류 처리
            const agent: https.Agent = new https.Agent({ rejectUnauthorized: false });
                options.httpsAgent = agent;
            }
            
            apiServerParam.guid = exchange.guid;
            apiServerParam.trid = trid;
            apiServerParam.isProduct = isProduct.toString();
            const response = await axios.post(apiServerUrl, apiServerParam, options);
            if (response.status !== 200)  {
                console.error('Error fetching specification:', response.statusText);
                return undefined;
            }
            const result = response.data;
            if (result.code != 0) {
                console.error('Error fetching specification:', result.code, result.message);
            }
            result.data.json = JSON.parse(result.data.json);

            const data = {
                exchangeId: exchange.id ?? -1,

                category: result.data.category,
                subCategory: result.data.subCategory,
                name: result.data.name,

                trid: result.data.trid,
                isProduct: result.data.isProduct,

                downloadDate: result.data.downloadDate,
                verifyDate: result.data.verifyDate,
                processCount: result.data.processCount,

                info: result.data.json.info,
                request: result.data.json.request,
                response: result.data.json.response,
                json: {
                    createdAt: result.data.createdAt,
                    updatedAt: result.data.updatedAt,
                }
            };
            specification = (await prisma.specifications.create({ data })) as unknown as SPECIFICATION_INFO;
        }
    } catch (error) {
        console.error('Error getting specification:', error);
    }
    return specification;
}
