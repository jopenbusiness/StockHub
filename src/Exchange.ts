/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

import { getDatabase } from './Database.js';
import { EXCHANGE_INFO } from './Exchange.type.js';

const exchangeInfos: Array<EXCHANGE_INFO> = [               //--- 거래소 정보
    {
        guid: '5977df30-138d-11f0-a66e-4bd46a0b0d2d',
        name: '한국투자증권',
        homepage: 'https://securities.koreainvestment.com/',
        url: 'https://apiportal.koreainvestment.com/apiservice',
        domainProduct: 'https://openapi.koreainvestment.com:9443',
        domainDevelop: 'https://openapivts.koreainvestment.com:29443',
        wsProduct: 'ws://ops.koreainvestment.com:21000',
        wsDevelop: 'ws://ops.koreainvestment.com:31000'
    },
    {
        guid: '8ca73450-138d-11f0-a66e-4bd46a0b0d2d',
        name: 'LS증권',
        homepage: 'https://www.ls-sec.co.kr/',
        url: 'https://openapi.ls-sec.co.kr/apiservice',
        domainProduct: 'https://openapi.ls-sec.co.kr:8080',
        domainDevelop: '',
        wsProduct: 'wss://openapi.ls-sec.co.kr:9443',
        wsDevelop: 'wss://openapi.ls-sec.co.kr:29443'
    },
    {
        guid: '8d066b50-138d-11f0-a66e-4bd46a0b0d2d',
        name: 'DB증권',
        homepage: 'https://www.dbsec.co.kr/',
        url: 'https://openapi.dbsec.co.kr/apiservice',
        domainProduct: 'https://openapi.dbsec.co.kr:8443',
        domainDevelop: '',
        wsProduct: 'wss://openapi.dbsec.co.kr:7070',
        wsDevelop: 'wss://openapi.dbsec.co.kr:17070'
    },
    {
        guid: '8d5e7660-138d-11f0-a66e-4bd46a0b0d2d',
        name: '키움증권',
        homepage: 'https://kiwoom.com/',
        url: 'https://openapi.kiwoom.com/guide/apiguide',
        domainProduct: 'https://api.kiwoom.com',
        domainDevelop: 'https://mockapi.kiwoom.com',
        wsProduct: 'wss://api.kiwoom.com:10000',
        wsDevelop: 'wss://mockapi.kiwoom.com:10000'        
    }
];

let isInitialized: boolean = false;
const initializeExchange = async (): Promise<void> => {
    if (isInitialized == false) {
        isInitialized = true;

        try {
            const prisma = getDatabase();
            const exchanges = await prisma.exchanges.findMany();
            if (exchanges.length < exchangeInfos.length) {
                await prisma.exchanges.createMany({
                    data: exchangeInfos
                });
            }
        } catch (error) {
            console.error('Error initializing exchanges:', error);
        }
    }
};

await initializeExchange();

export const findExchanges = async (): Promise<Array<EXCHANGE_INFO>> => {
    let exchanges: Array<EXCHANGE_INFO> = [];

    try {
        const prisma = getDatabase();
        exchanges = await prisma.exchanges.findMany() as Array<EXCHANGE_INFO>;
    } catch (error) {
        console.error('Error getting exchange:', error);
    }
    return exchanges;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _findExchange = async (where: Record<string, any>): Promise<EXCHANGE_INFO | undefined> => {
    let exchange: EXCHANGE_INFO | undefined = undefined;

    try {
        const prisma = getDatabase();
        const result = await prisma.exchanges.findFirst({
            where: where
        });
        exchange = (result) ? result as EXCHANGE_INFO : undefined;
    } catch (error) {
        console.error('Error getting exchange:', error);
    }
    return exchange;
}

export const findExchange = async (id: number): Promise<EXCHANGE_INFO | undefined> => {
    return await _findExchange({ id: id });
}

export const findExchangeByGuid = async (guid: string): Promise<EXCHANGE_INFO | undefined> => {
    return await _findExchange({ guid: guid });
}
