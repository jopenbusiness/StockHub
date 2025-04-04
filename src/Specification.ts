/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

import { EXCHANGE_INFO } from './Specification.type';

export const exchangeInfos: Array<EXCHANGE_INFO> = [        //--- 거래소 정보
    {
        id: 1,
        name: '한국투자증권',
        url: 'https://apiportal.koreainvestment.com/apiservice',
        domainProduct: 'https://openapi.koreainvestment.com:9443',
        domainDevelop: 'https://openapivts.koreainvestment.com:29443',
        wsProduct: 'ws://ops.koreainvestment.com:21000',
        wsDevelop: 'ws://ops.koreainvestment.com:31000'
    },
    {
        id: 2,
        name: 'LS증권',
        url: 'https://openapi.ls-sec.co.kr/apiservice',
        domainProduct: 'https://openapi.ls-sec.co.kr:8080',
        domainDevelop: '',
        wsProduct: 'wss://openapi.ls-sec.co.kr:9443',
        wsDevelop: 'wss://openapi.ls-sec.co.kr:29443'
    },
    {
        id: 3,
        name: 'DB증권',
        url: 'https://openapi.dbsec.co.kr/apiservice',
        domainProduct: 'https://openapi.dbsec.co.kr:8443',
        domainDevelop: '',
        wsProduct: 'wss://openapi.dbsec.co.kr:7070',
        wsDevelop: 'wss://openapi.dbsec.co.kr:17070'
    },
    {
        id: 4,
        name: '키움증권',
        url: 'https://openapi.kiwoom.com/guide/apiguide',
        domainProduct: 'https://api.kiwoom.com',
        domainDevelop: 'https://mockapi.kiwoom.com',
        wsProduct: 'wss://api.kiwoom.com:10000',
        wsDevelop: 'wss://mockapi.kiwoom.com:10000'        
    }
];
