/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

type EXCHANGE_NAME = '한국투자증권' | 'LS증권' | 'DB증권' | '키움증권';
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
    name: EXCHANGE_NAME,                                    //--- 이름
    url: EXCHANGE_URL,                                      //--- Specification URL
    domainProduct: EXCHANGE_DOMAIN_PRODUCT,
    domainDevelop: EXCHANGE_DOMAIN_DEVELOP,
    wsProduct: EXCHANGE_WS_PRODUCT,
    wsDevelop: EXCHANGE_WS_DEVELOP
};

type SECRET_TYPE = '개인' | '법인';
type GRANT_TYPE = 'client_credentials';

export interface SECRET_INFO {                              //--- 사용자 Open API 접속 정보
    id?: number,
    name: string
    exchange: number,                                       //--- 거래소 ID
    userId: string,                                         //--- 사용자 ID
    userType: SECRET_TYPE,                                  //--- 사용자 구분
    account: string,                                        //--- 종합계좌번호
    accountSub: string,                                     //--- 계좌상품번호

    grantType: GRANT_TYPE,                                  //--- 인증방식
    appKey: string,                                         //--- App Key
    appSecret: string,                                      //--- App Secret       
    periodFrom: string,                                     //--- 유효기간 시작일 (YYYY-MM-DD)
    periodTo: string                                        //--- 유효기간 종료일 (YYYY-MM-DD)
};

type TOKEN_SCOPE = '' | 'oob';
type TOKEN_TYPE = 'Bearer';
type TOKEN_TYPE_HINT = '' | 'access_token' | 'refresh_token';

export interface TOKEN_INFO {
    id?: number,
    secret: number,

    accessToken: string,                                    //--- 접근 토큰
    scope: TOKEN_SCOPE,                                     //--- 적용 범위
    tokenType: TOKEN_TYPE,                                  //--- 토큰 타입
    tokenTypeHint: TOKEN_TYPE_HINT,                         //--- 토큰 타입 힌트
    expiresIn: number,                                      //--- 유효 기간 (초)
    periedFrom: string,                                     //--- 유효기간 시작일시 (YYYY-MM-DD HH:mm:ss)
    periedTo: string,                                       //--- 유효기간 종료일시 (YYYY-MM-DD HH:mm:ss)
    isRevoked: boolean                                      //--- 토큰 해지 여부
};

export interface APPROVAL_INFO {
    id?: number,
    secret: number,
    approvalKey: string,                                    //--- Web Socket 접속키
};

type SPEC_METHOD = 'get' | 'post';
type SPEC_FORMAT = 'json';
type SPEC_CONTENT_TYPE = 'application/json; charset=UTF-8' | 'application/x-www-form-urlencoded';

interface SPEC_INFO {
    method: SPEC_METHOD,
    domain: EXCHANGE_DOMAIN_PRODUCT | EXCHANGE_DOMAIN_DEVELOP | EXCHANGE_WS_PRODUCT | EXCHANGE_WS_DEVELOP,
    url: string,
    format: SPEC_FORMAT,
    contentType: SPEC_CONTENT_TYPE,

    category: string,
    subCategory: string,
    name: string,
    trid: string,

    version: string,
    memo: string,
    description: Array<string>,

    isProduct: boolean,
    downloadDate: string,                                   //--- YYYY-MM-DD
    verifyDate: string                                      //--- YYYY-MM-DD
};

type SPEC_FIELD_TYPE = 'string' | 'number' | 'object' | 'array';
interface SPEC_FIELD_ENUM {
    code: string,
    name: string
}

interface SPEC_FIELD {
    code: string,
    name: string,
    type: SPEC_FIELD_TYPE,
    required: boolean,
    length: number,
    description: Array<string>,

    default?: string,
    enums?: Array<SPEC_FIELD_ENUM>
    fields?: Array<SPEC_FIELD>
};

export interface SPECIFICATION_INFO {
    id?: number,
    exchange: number,                                       //--- 거래소 ID

    info: SPEC_INFO,
    request: {
        header: Array<SPEC_FIELD>,
        body: Array<SPEC_FIELD>
    },
    response: {
        header: Array<SPEC_FIELD>,
        body: Array<SPEC_FIELD>
    }
};

// interface REQUEST_HEADER {
//     'content-type': SPEC_CONTENT_TYPE,
//     authorization: string,                                  //--- Token
//     appkey: string,                                         //--- App Key
//     appsecret: string,                                      //--- App Secret
//     personalseckey?: string,                                //--- 고객 식별키
//     tr_id: string,                                          //--- 거래 ID
//     'api-id': string,                                       //--- 거래 ID for 키움증권
//     tr_cd?: string,                                         //--- 거래 ID for LS증권
//     tr_cont?: '' | ' ' | 'N'                                //--- 연속 거래 여부
//     tr_cont?: 'N' | 'Y'                                     //--- 연속 거래 여부 for LS증권
//     cont_yn?: 'Y' | 'N',                                    //--- 연속 거래 여부 for DB증권
//     'cont-yn'?: 'Y' | 'N',                                  //--- 연속 거래 여부 for 키움증권
//     tr_cont_key?: string,                                   //--- 연속일 경우 그전에 내려온 연속키 값 올림 for LS증권
//     cont_key?: string,                                      //--- 연속일 경우 그전에 내려온 연속키 값 올림 for DB증권
//     'next-key'?: string,                                    //--- 연속일 경우 그전에 내려온 연속키 값 올림 for 키움증권
//     custtype: 'B' | 'P',                                    //--- 고객 구분 (B: 법인, P: 개인)
//     seq_no?: string,
//     mac_address?: string,                                   //--- MAC Address
//     phone_number?: string,                                  //--- 핸드폰 번호
//     ip_addr?: string,                                       //--- IP Address   
//     hashkey?: string,                                       //--- Request Body의 해시키
//     gt_uid?: string,                                        //--- Global UID

//     grant_type: GRANT_TYPE,                                 //--- 인증방식
// };

// interface REQUEST_HEADER_WS {
//     approval_key: string,                                   //--- Web Socket 접속키
//     custtype: 'B' | 'P',                                    //--- 고객 구분 (B: 법인, P: 개인)
//     tr_type: '1' | '2',                                     //--- 거래 타입 (1: 등록, 2: 해제)
//     'content-type': 'utf-8',

//     token?: string,
//     tr_type?: '1' | '2' | '3' | '4',                        //--- 거래 타입 (1: 계좌 등록, 2: 계좌 해제, 3: 실시간 시세 등록, 4. 실시간 시세 해제) for LS증권
//     tr_type?: '1' | '2' | '3',                              //--- 거래 타입 (1: 실시간 시세 등록, 2: 실시간 시세 해제, 3: 계좌등록) for DB증권
// };

// interface REQUEST_HEADER_APPROVAL {
//     'content-type': SPEC_CONTENT_TYPE,
// };

// interface REQUEST_HEADER_HASHKEY {
//     'content-type': SPEC_CONTENT_TYPE,
//     appkey: string,                                         //--- App Key
//     appsecret: string,                                      //--- App Secret
// };

// interface REQUEST_HEADER_TOKEN {
//     'content-type'?: SPEC_CONTENT_TYPE,

//     grant_type?: GRANT_TYPE,                                 //--- 인증방식
//     appkey?: string,                                         //--- App Key
//     appsecret?: string,                                      //--- App Secret
//     secretkey?: string,                                      //--- App Secret for 키움증권
// };

// interface REQUEST_HEADER_REVOKE {
//     'content-type'?: SPEC_CONTENT_TYPE,

//     appkey?: string,                                         //--- App Key
//     appsecret?: string,                                      //--- App Secret
//     secretkey?: string,                                      //--- App Secret for 키움증권
//     token?: string,                                          //--- Token
// };
