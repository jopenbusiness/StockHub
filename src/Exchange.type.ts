/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

type EXCHANGE_GUID = 
    '5977df30-138d-11f0-a66e-4bd46a0b0d2d' | 
    '8ca73450-138d-11f0-a66e-4bd46a0b0d2d' | 
    '8d066b50-138d-11f0-a66e-4bd46a0b0d2d' | 
    '8d5e7660-138d-11f0-a66e-4bd46a0b0d2d';
type EXCHANGE_NAME = '한국투자증권' | 'LS증권' | 'DB증권' | '키움증권';

type EXCHANGE_HOMEPAGE = 
    'https://securities.koreainvestment.com/' | 
    'https://www.ls-sec.co.kr/' | 
    'https://www.dbsec.co.kr/' | 
    'https://kiwoom.com/';
type EXCHANGE_URL = 
    'https://apiportal.koreainvestment.com/apiservice' | 
    'https://openapi.ls-sec.co.kr/apiservice' | 
    'https://openapi.dbsec.co.kr/apiservice' | 
    'https://openapi.kiwoom.com/guide/apiguide';

type EXCHANGE_DOMAIN_PRODUCT = 
    'https://openapi.koreainvestment.com:9443' |
    'https://openapi.ls-sec.co.kr:8080' |
    'https://openapi.dbsec.co.kr:8443' |
    'https://api.kiwoom.com';
type EXCHANGE_DOMAIN_DEVELOP = 
    'https://openapivts.koreainvestment.com:29443' |
    '' |
    '' |
    'https://mockapi.kiwoom.com';
type EXCHANGE_WS_PRODUCT = 
    'ws://ops.koreainvestment.com:21000' |
    'wss://openapi.ls-sec.co.kr:9443' |
    'wss://openapi.dbsec.co.kr:7070' |
    'wss://api.kiwoom.com:10000';
type EXCHANGE_WS_DEVELOP = 
    'ws://ops.koreainvestment.com:31000' |
    'wss://openapi.ls-sec.co.kr:29443' |
    'wss://openapi.dbsec.co.kr:17070' |
    'wss://mockapi.kiwoom.com:10000';

export interface EXCHANGE_INFO {                            //--- 거래소 정보
    id?: number,
    guid: EXCHANGE_GUID,                                    //--- 거래소 GUID
    name: EXCHANGE_NAME,                                    //--- 이름
    homepage: EXCHANGE_HOMEPAGE,                            //--- 홈페이지
    url: EXCHANGE_URL,                                      //--- Specification URL

    domainProduct: EXCHANGE_DOMAIN_PRODUCT,
    domainDevelop: EXCHANGE_DOMAIN_DEVELOP,
    wsProduct: EXCHANGE_WS_PRODUCT,
    wsDevelop: EXCHANGE_WS_DEVELOP
};
