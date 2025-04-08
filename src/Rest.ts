/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Database } from 'sqlite3';                         //--- https://www.npmjs.com/package/sqlite3

import { EXCHANGE_INFO } from './Exchange.type.js';
import { SECRET_INFO } from './Secret.type.js';
import { SPECIFICATION_INFO } from './Specification.type.js';
// import { exchangeInfos } from './Specification.js';
import { RETURN_INFO } from './Rest.type.js';


// import fetch, { RequestInit } from 'node-fetch';
// import { v1 as uuid } from 'uuid';

// import { Error, ERROR_CODE } from '../common/error/index.js';
// import { METADATA, METHOD, TRID_FIELD } from './efriend.constant.js';
// import { Secret, EFriendRestConfig } from './efriend.type.js';
// import { limit } from './efriend.js';
// import { EFriendLimit2 } from './efriend.limit2.js';
// import { getSpecification } from '../Specfications.js';

// const hasNextCodes: Array<string> = [ 'F', 'M'];
// const getFieldValue = (data, code: string): any => {
//     return data[code] ?? data[code.toLowerCase()] ?? null;
// };



export const getSpecification = (exchange: EXCHANGE_INFO, trid: string, isProduct: boolean = true): Promise<SPECIFICATION_INFO> => {
    return new Promise((resolve, reject) => {
        try {
            
            //--- TODO: 라이브러리로 배포 후, 폴더 위치가 정상 동작하는지 확인
            const databaseFilename = './files/sqlite3/database.db';
            const db: Database = new Database(databaseFilename, (err) => {
                if (err) {
                    throw new Error(`Error opening specifications database: ${err.message}`);
                }
            });

            const query = [
                "CREATE TABLE IF NOT EXISTS StockSpec (",
                "    id INTEGER PRIMARY KEY AUTOINCREMENT,",
                "    company VARCHAR(16) NOT NULL,",
                "    category  VARCHAR(64) NOT NULL DEFAULT '',",
                "    subCategory VARCHAR(128) NOT NULL DEFAULT ''",
                "    name VARCHAR(128) NOT NULL DEFAULT ''",

                "    trid VARCHAR(16) NOT NULL DEFAULT ''",
                "    isProduct TINYINT(1) NOT NULL DEFAULT 0",

                "    downloadDate VARCHAR(10) NOT NULL DEFAULT ''",
                "    verifyDate VARCHAR(10) NOT NULL DEFAULT ''",
                "    processCount INTEGER(16) NOT NULL DEFAULT 0",

                "    json VARCHAR(50000) NOT NULL DEFAULT '{}'",

                "    createdAt DATETIME NOT NULL",
                "    updatedAt DATETIME NOT NULL",
                ')'
            ];
            db.run(query.join(' '), (err) => {
                if (err) {
                    console.error('Error creating table:', err.message);
                }
            });

            const sql: string = `SELECT * FROM StockSpec WHERE company = ? AND trid = ? AND isProduct = ?`;
            const params: Array<any> = [ exchange.name, trid, isProduct ];

            db.serialize(() => {
                db.get(sql, params, (err, row) => {
                    if (err) {
                        throw new Error(`Error executing SQL query: ${err.message}`);
                    } else {
                        console.log('row', row);
                        const specification: SPECIFICATION_INFO = {
                            exchange: exchange.id ?? -1,
                            ...JSON.parse((row as { json: string }).json)
                        };
                        resolve(specification);
                    }
                });
            });
            db.close((err) => {
                if (err) {
                    throw new Error(`Error closing database: ${err.message}`);
                }
            });
        } catch (err) {
            reject(err);
        }
    });
};

export const request = async (secret: SECRET_INFO, trid: string, requestHeader: any, requestBody: any, responsePrev: any | null): Promise<RETURN_INFO> => {
    const ret: RETURN_INFO = { code: 0, message: 'ok', data: null, error: null };
    try {
        //--- pppqqq, 여기서 부터 작업할 것
        //--- Secret가 db에 없으면 등록
        //--- Secret에 인증 정보가 없으면 생성

        //--- Specification 정보가 있는지 확인
        //---     없는 경우, Specification 정보를 가져오기




        //--- 인증 정보가 있는지 확인
        //---     없는 경우, 인증 정보를 가져오기

        const exchange: EXCHANGE_INFO | undefined = exchangeInfos.find((item) => item.id == secret.exchange);
        if (exchange == undefined) {
            throw new Error(`${secret.exchange} exchange is not exist.`);
        }

        const specification: SPECIFICATION_INFO | null = await getSpecification(exchange, trid, secret.isProduct);
        if (specification == undefined) {
            throw new Error(`${secret.exchange} exchange is not exist.`);
        }


        //--- Request Header에서 default 값 설정
        //--- Request Body에서 default 값 설정
        //--- Request Header 검사
        //--- Request Body 검사
        //--- 데이터 요청
        //--- 응답 데이터 검사
        //--- 응답 데이터 반환

        let zz: any = requestHeader;
        zz = requestBody;
        zz = responsePrev;
        zz = 'aa';
        console.log(zz);



        // const actualName: string = (secret.isActual) ? '실전':'모의';
        // const metadata: METADATA = (await getSpecification('한국투자증권', trid, secret.isActual) as METADATA);
        // if (metadata == null) {
        //     throw new Error({ code: ERROR_CODE.REQUIRED, data: `${trid} (${actualName}) metadata is not exist.` });
        // }

        // if (metadata.info.trid != trid) {
        //     throw new Error({ code: ERROR_CODE.REQUIRED, data: `${trid} is not mismatch : ${metadata.info.trid}.` });
        // }

        // if (metadata.info.domain.startsWith('http') == false) {
        //     throw new Error({ code: ERROR_CODE.REQUIRED, data: `${trid} trid is not supported.` });
        // }

        // requestBody = this.resetRequestBody(metadata, requestBody, responsePrev);
        // requestHeader = await this.resetRequestHeader(secret, metadata, requestHeader, requestBody, responsePrev);

        // const method: METHOD = metadata.info.method;
        // const requestInfo: string = metadata.info.domain + ((method == 'post') ? metadata.info.url:`${metadata.info.url}?${(new URLSearchParams(requestBody)).toString()}`);
        // const requestInit: RequestInit = { 
        //     method: method, 
        //     // mode: 'cors', 
        //     // cache: 'no-cache', 
        //     headers: requestHeader
        // };
        // if (method == 'post') {
        //     requestInit.body = JSON.stringify(requestBody);
        // }
        // const res: any = await fetch(requestInfo, requestInit);

        // const contentType: string | null = res.headers.get('content-type');
        // if (contentType == null) {
        //     throw new Error({ code: ERROR_CODE.REQUIRED, data: 'Content type is not exist.' });
        // } else if (contentType.startsWith('text/html')) {
        //     // <html><meta http-equiv="refresh" content="0; url=https://securities.koreainvestment.com/error/error.jsp"></meta><body></body></html>
        //     const text = await res.text();
        //     console.error('Error: text', text);
        //     throw new Error({ code: ERROR_CODE.SERVICEERROR, data: `시스템사정으로 잠시 조회가 불가능합니다. 잠시후에 다시 이용하여 주시기 바랍니다 : ${text}` });
        // } else if (contentType.startsWith('application/json') == false) {
        //     throw new Error({ code: ERROR_CODE.NOTALLOWED, data: 'Content type is not application/json.' });
        // }

        // if (res.ok) {                                   //--- res.status : 200, res.statusText : 'OK'
        //     ret.body = await res.json();
        //     if ((typeof ret.body.rt_cd != 'undefined') && (ret.body.rt_cd != '0')) {
        //         ret.code = 500;
        //         ret.message = `Error: ${ret.body.rt_cd}, ${ret.body.msg_cd ?? ''} : ${ret.body.msg1 ?? ''}`;
        //         this.logger.error(JSON.stringify(ret));
        //     } else {
        //         this.checkData(trid, metadata.response.header, res.headers.raw());
        //         this.compareWithMeta(metadata.response.header, res.headers.raw(), trid);
        //         ret.header = metadata.response.header.reduce((prev, field) => {
        //             const value: any = res.headers.get(field.code);
        //             if (value != null) {
        //                 prev[field.code] = value;
        //             }
        //             return prev;
        //         }, {});

        //         this.checkResponsebody(trid, metadata.response.body, ret.body);

        //         if (trid == 'tokenP') {
        //             limit.setTokenP(secret);
        //         }
        //     }
        // } else {
        //     ret.code = 500;
        //     ret.message = `Error: ${res.status} : ${res.statusText}`;
        //     this.logger.error(JSON.stringify(ret));
        // }
    } catch(error) {
        ret.code = error.code ?? '500';
        ret.message = error.message ?? error.errno ?? 'Unknown Error';
        console.error(error);
    }
    return ret;
}

export class Rest {
    // private readonly logger: Console;
    // private _limit: EFriendLimit2

    // constructor({ logger, limit }: EFriendRestConfig) {
    //     this.logger = logger ?? console;
    //     this._limit = limit ?? new EFriendLimit2({});
    // }

    // public get limit(): EFriendLimit2 {
    //     return this._limit;
    // }

    // public set limit(limitNew: EFriendLimit2) {
    //     this._limit = limitNew;
    // }



    
    // /**
    //  * requestHeader를 재설정하여 반환 한다.
    //  * 
    //  * @param {any} secret                                  인증 정보
    //  * @param {METADATA} metadata                           Metadata
    //  * @param {any} requestHeader                           요청 header
    //  * @param {any} requestBody                             요청 body
    //  * @param {any} responsePrev                            이전 응답
    //  * @returns {any}                                       재설정된 요청 header
    //  * @throws {any}
    //  */
    // private async resetRequestHeader(secret: any, metadata: METADATA, requestHeader: any, requestBody: any, responsePrev: any | null = null): Promise<any> {
    //     try {
    //         secret.appkey = secret.appKey;
    //         secret.appsecret = secret.appSecret;

    //         const responseHeader = ((responsePrev == null) || (typeof responsePrev.header == 'undefined')) ? null : responsePrev.header;
    //         metadata.request.header.forEach(field => {
    //             const value: any = requestHeader[field.code] ?? requestHeader[field.code.toLowerCase()] ?? secret[field.code] ?? field.default ?? null;
    //             if (value != null) {
    //                 requestHeader[field.code] = value;
    //             }

    //             if (field.code == 'authorization') {
    //                 requestHeader[field.code] = requestHeader[field.code] || `${secret.token_type} ${secret.access_token}`;
    //             }
    //             if (field.code == 'tr_id') {
    //                 requestHeader[field.code] = requestHeader[field.code] || metadata.info.trid;
    //             }
    //             if (field.code == 'tr_cont') {
    //                 requestHeader[field.code] = requestHeader[field.code] || ' ';
    //                 if ((responseHeader != null) &&
    //                     (typeof responseHeader[field.code] != 'undefined') && 
    //                     (hasNextCodes.includes(responseHeader[field.code]))) {
    //                     requestHeader[field.code] = 'N';
    //                 }
    //             }
    //         });
            
    //         if (metadata.info.method == 'post') {
    //             if ((metadata.info.trid != 'hashkey') && (typeof(requestHeader.hashkey) == 'undefined')) {
    //                 const header: any = {
    //                     "content-type": 'application/json; charset=utf-8',
    //                     appkey: secret.appKey ?? secret.appkey,
    //                     appsecret: secret.appSecret ?? secret.appsecret
    //                 };
    //                 const responseHashkey: any = await this.request(secret, 'hashkey', header, requestBody);
    //                 if (responseHashkey.code == 0) {
    //                     requestHeader.hashkey = responseHashkey.body.HASH;
    //                 } else {
    //                     throw new Error({ code: responseHashkey.code, message: responseHashkey.message });
    //                 }
    //             }
    //         }

    //         if (typeof(requestHeader.gt_uid) != 'undefined') {
    //             requestHeader.gt_uid = uuid().replace(/-/g, '');
    //         }

    //         if ((typeof(requestHeader['content-type']) == 'undefined') || (requestHeader['content-type'] == '')) {
    //             requestHeader['content-type'] = 'application/json; charset=utf-8';
    //         }

    //         //--- requestHeader 값 검사
    //         // metadata.request.header.forEach(function(field) {
    //         //     this.checkField(field, requestHeader, metadata.info.trid);
    //         // }.bind(this));
    //         this.checkData(metadata.info.trid, metadata.request.header, requestHeader);
    //         return requestHeader;
    //     } catch(ex) {
    //         throw ex;
    //     }
    // }

    // /**
    //  * requestBody를 재설정하여 반환 한다.
    //  * 
    //  * @param {METADATA} metadata                           Metadata
    //  * @param requestBody                                   요청 body
    //  * @param responsePrev                                  이전 응답
    //  * @returns {any}                                       재설정된 요청 body
    //  * @throws {any}
    //  */
    // private resetRequestBody(metadata: METADATA, requestBody: any, responsePrev: any) {
    //     try {
    //         const responseBody = ((responsePrev == null) || (typeof responsePrev.body == 'undefined')) ? null : responsePrev.body;
    //         metadata.request.body.forEach(field => {
    //             const value: any = requestBody[field.code] ?? requestBody[field.code.toLowerCase()] ?? field.default ?? null;
    //             if (value != null) {
    //                 requestBody[field.code] = value;
    //             }

    //             if ([ 'ctx_area_fk100', 'ctx_area_nk100' ].includes(field.code.toLowerCase())) {
    //                 requestBody[field.code] = requestBody[field.code] || ' ';
    //                 if (responseBody != null) {
    //                     requestBody[field.code] = responseBody[field.code] || responseBody[field.code.toLowerCase()] || '';
    //                 }
    //             }
    //         });

    //         if (metadata.info.trid != 'hashkey') {
    //             this.checkData(metadata.info.trid, metadata.request.body, requestBody);
    //         }
    //         return requestBody;
    //     } catch(ex) {
    //         throw ex;
    //     }
    // }

    // /**
    //  * data의 값을 검사 한다.
    //  * 
    //  * @param {string} trid                                 트랜잭션 ID
    //  * @param {Array<TRID_FIELD>} fields                    필드 목록
    //  * @param {any} data                                    검사할 데이터 객체
    //  * @throws {any}
    //  */
    // private checkData(trid: string, fields: Array<TRID_FIELD>, data: any): void {
    //     for (const field of fields) {
    //         this.checkField(field, data, trid);
    //     }
    // }

    // /**
    //  * 필드의 값을 검사 한다.
    //  * 
    //  * @param {TRID_FIELD} field                            필드 정보
    //  * @param {any} data                                    field의 값을 포함하는 object
    //  * @param {string} trid                                 tr_id
    //  * @param {boolean} allowException                      true. Exception 허용
    //  * @throws {any}
    //  */
    // private checkField(field: TRID_FIELD, data: any, trid: string, allowException: boolean = true): void {
    //     try {
    //         const fieldInfo: string = `${trid}: ${field.code}(${field.name})`;
    //         const fieldValue = getFieldValue(data, field.code);
            
    //         if ((fieldValue == null) && (field.required)) {
    //             throw new Error({ code: ERROR_CODE.REQUIRED, data: { fieldInfo: fieldInfo, data: data } });
    //         }

    //         if ((typeof(data.custtype) != 'undefined') && (data.custtype == 'B')) {
    //             const required: boolean = [ 'personalseckey', 'seq_no', 'phone_number', 'ip_addr', 'gt_uid' ].includes(field.code.toLowerCase());
    //             if ((fieldValue == null) && required) {
    //                 throw new Error({ code: ERROR_CODE.REQUIRED, data: { fieldInfo: fieldInfo, data: data } });
    //             }
    //         }

    //         if (fieldValue != null) {
    //             if (typeof(field.enum) != 'undefined') {
    //                 if ([ 'ctx_area_fk100', 'ctx_area_nk100', 'ctx_area_fk', 'ctx_area_nk', 'rt_cd' ].includes(field.code.toLowerCase()) == false) {
    //                     const isExist: boolean = field.enum.reduce((prev, curr) => {
    //                         return prev || (curr.code == fieldValue);
    //                     }, false);

    //                     if (isExist == false) {
    //                         this.logger.error(`${field.code} (${field.name}) : ${JSON.stringify(field.enum)}, [${fieldValue}]`);
    //                         throw new Error({ code: ERROR_CODE.NOTALLOWED, data: `${fieldInfo}, value - [${fieldValue}]` });
    //                     }
    //                 }
    //             }

    //             switch (field.type) {
    //             case 'string':
    //                 if ([ 'authorization' ].includes(field.code) == false) {
    //                     if (field.length < fieldValue.length) {
    //                         throw new Error({ code: ERROR_CODE.FIELDERROR, data: `${fieldInfo}, length - ${fieldValue.length}` });
    //                     }
    //                 }
    //                 break;
    //             case 'number':
    //                 // this.logger.info(`${trid}, ${field.code} is number`);
    //                 break;
    //             default:
    //                 this.logger.error(`${trid} ---------- field type : ${field.code}, ${field.type}`);
    //                 break;
    //             }
    //         }
    //     } catch(ex) {
    //         if (allowException) {
    //             throw ex;
    //         } else {
    //             if (ex instanceof Error) {
    //                 this.logger.error(`---------- field manage, ${trid}: ${ex.code} - ${ex.message}, ${JSON.stringify(ex)}`);
    //             } else {
    //                 this.logger.error(`---------- field manage, ${trid}: ${JSON.stringify(ex)}`);
    //             }
    //         }
    //     }        
    // }

    // /**
    //  * Response Header에서 필드 설정과 실제 데이터의 필드 항목을 비교 한다.
    //  * 
    //  * @param {Array<TRID_FIELD>} fields                    Fields의 메타 정보
    //  * @param {any} data                                    Response Header 데이터
    //  * @param {string} trid                                 tr_id
    //  */
    // private compareWithMeta(fields: Array<TRID_FIELD>, data: any, trid: string): void {
    //     const keysSkip: Array<string> = [ 
    //         'date', 'content-length', 'connection', 'content-type',
    //         'x-content-type-options', 'x-oracle-dms-ecid', 'x-oracle-dms-rid', 'x-xss-protection' ,
    //         'keep-alive'
    //     ];

    //     const keysFields: Array<string> = [];
    //     const keysData: any = Object.keys(data);
    //     fields.forEach(field => {
    //         keysFields.push(field.code);
    //         if ((field.required) && (keysData.includes(field.code) == false)) {
    //             this.logger.error(`${trid} ---------- field required, ${field.code}`);
    //         }
    //     });

    //     keysData.forEach(key => {
    //         if (keysFields.includes(key) == false) {
    //             if (keysSkip.includes(key) == false) {
    //                 this.logger.error(`${trid} ---------- another field is founded, ${key}`);
    //             }
    //         }
    //     });        
    // }
    
    // /**
    //  * Response data의 값을 검사 한다.
    //  * 
    //  * @param {string} trid                                 트랜잭션 ID
    //  * @param {Array<TRID_FIELD>} fields                    필드 목록
    //  * @param {any} data                                    검사할 데이터 객체
    //  * @throws {any}
    //  */
    // private checkResponsebody(trid: string, fields: Array<TRID_FIELD> | undefined, data: any): void {
    //     if (typeof(fields) != 'undefined') {
    //         fields.forEach(function(field) {
    //             const fieldValue = getFieldValue(data, field.code);
    //             if ([ 'array', 'object' ].includes(field.type)) {
    //                 if (Array.isArray(fieldValue)) {
    //                     fieldValue.forEach(function(dataItem) {
    //                         this.checkResponsebody(trid, field.fields, dataItem);
    //                     }.bind(this));
    //                 } else {
    //                     this.checkResponsebody(trid, field.fields, fieldValue);
    //                 }
    //             } else {
    //                 try {
    //                     this.checkField(field, data, trid, false);
    //                 } catch(ex) {
    //                     this.logger.error('checkResponsebody');
    //                     this.logger.error(JSON.stringify(ex));
    //                 }
    //             }
    //         }.bind(this));   
    //     }     
    // }

    // public hasNext(response) {
    //     try {
    //         return ((response.code == 0) && (response.body.rt_cd == '0') && (hasNextCodes.includes(response.header.tr_cont)));
    //     } catch (ex) {
    //         console.error(ex);
    //         return false;
    //     }
    // }
}

export default Rest;
