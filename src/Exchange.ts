/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

import { EXCHANGE_INFO } from './Exchange.type.js';
import { get, run } from './Database.js'; 

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

export const getExchange = (guid: string): EXCHANGE_INFO => {
    //--- pppqqq, Table에서 읽어서 반환

    const exchange = exchangeInfos.find((item) => item.guid == guid);
    if (exchange) {
        return exchange;
    } else {
        throw new Error('Exchange not found');
    }
}

const TABLE_NAME: string = 'Exchanges';
const sqlStockExchange: string = [
    `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (`,
    "    id INTEGER PRIMARY KEY AUTOINCREMENT,",
    "    guid VARCHAR(74) NOT NULL,",
    "    name VARCHAR(64) NOT NULL DEFAULT ''",
    "    homepage VARCHAR(128) NOT NULL DEFAULT ''",
    "    url VARCHAR(128) NOT NULL DEFAULT ''",

    "    domainProduct VARCHAR(128) NOT NULL DEFAULT ''",
    "    domainDevelop VARCHAR(128) NOT NULL DEFAULT ''",
    "    wsProduct VARCHAR(128) NOT NULL DEFAULT ''",
    "    wsDevelop VARCHAR(128) NOT NULL DEFAULT ''",

    "    createdAt DATETIME NOT NULL",
    "    updatedAt DATETIME NOT NULL",
    ')'
].join(' ');

export const initializeDatabase = async (db): Promise<void> => {
    await run(db, sqlStockExchange);

    exchangeInfos.forEach(async (exchange) => {
        const query = `INSERT INTO ${TABLE_NAME} (
            guid, name, homepage, url, 
            domainProduct, domainDevelop, wsProduct, wsDevelop, 
            createAt, updatedAt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const now = new Date().toISOString();
        const params: Array<string | number | boolean> = [
            exchange.guid,
            exchange.name,
            exchange.homepage,
            exchange.url,
            exchange.domainProduct,
            exchange.domainDevelop,
            exchange.wsProduct,
            exchange.wsDevelop,
            now,
            now
        ]
        run(db, query, params);
    }); 
}
