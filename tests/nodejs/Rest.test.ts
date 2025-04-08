/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

// import moment from 'moment';                                //--- 'YYYY-MM-DD HH:mm:ss.SSS ZZ'

// import { inspect } from 'util';
import { beforeAll, describe, it } from 'vitest'

// import { EXCHANGE_INFO, SPECIFICATION_INFO } from '../../src/Specification.type.js';
// import { exchangeInfos } from '../../src/Specification.js';
// import { getSpecification } from '../../src/Rest.js';

// // export const deepCopy = source => JSON.parse(JSON.stringify(source));
// const showAll = json => inspect(json, { colors: false, depth: 10 });


const funcInit = async (suite) => {
    console.log('funcInit', suite.name);
    

}

beforeAll(funcInit, 60 * 1000);                             //--- 모든 파일마다 한번씩 실행 한다.

//--- https://vitest.dev/guide/
describe('Test Rest', () => {
    it('Test Restful API', async (ctx) => {
        // console.log('Test Restful API', ctx);

        // const exchange: EXCHANGE_INFO | undefined = exchangeInfos.find((item) => item.id == 3);     //--- DB증권
        // // console.log('exchange', exchange);

        // if (exchange != undefined) {
        //     //--- 3. DB증권, CDPCQ00100. 국내주식주문/계좌예수금조회/계좌예수금조회
        //     const specification: SPECIFICATION_INFO | null = await getSpecification(exchange, 'CDPCQ00100', true); 
        //     console.log('specification', showAll(specification.info));
        // }
        // expect(exchange).not.toBeUndefined();



        // const stockCode = '015760';                                             //--- 한국전력

        // const secretOrderEFriend1 = await systemTrading.getSecretById(1);        //--- 개인/한국투자증권/실전
        // // const secretQuery = await systemTrading.getSecretById(5);               //--- BlueStone/한국투자증권/실전

        // const secretOrderEBest7 = await systemTrading.getSecretById(7);         //--- 개인/LS증권/실전
        // const secretOrderEBest8 = await systemTrading.getSecretById(8);         //--- OBCon/LS증권/실전
        // const secretOrderEBest9 = await systemTrading.getSecretById(9);         //--- BlueStone/LS증권/실전

        //------------------------------------------------------------------------------------------
        //--- 한국투자증권 API 테스트
        //------------------------------------------------------------------------------------------
        // await systemTrading._refreshSecret_efriend(secretOrderEFriend1, true, true);

        //--- To-Do: WebSocket 테스트

        // console.log('getStockInfo', await systemTrading.getStockInfo(stockCode));

        // const groups = await systemTrading.getGroups(secretOrderEFriend1);
        // if (groups != null) {
        //     // console.log('getGroups', groups);
        //     for (let idx = 0; idx < groups.length; idx++) {
        //         const group = groups[idx];

        //         const groupStocks = await systemTrading.getGroupStocks(secretOrderEFriend1, group);
        //         if (groupStocks != null) {
        //             // console.log('getGroupStocks', group, groupStocks);
        //             const getGroupStocksInfo = await systemTrading.getGroupStocksInfo(secretOrderEFriend1, groupStocks);
        //             if (getGroupStocksInfo != null) {
        //                 console.log('getGroupStocksInfo', getGroupStocksInfo);
        //             }
        //         }
        //     }
        // }

        // const conditions = await systemTrading.getConditions(secretOrderEFriend1);
        // for (let idx = 0; idx < conditions.length; idx++) {
        //     const condition = conditions[idx];
        //     console.log('getConditionStocks', condition, await systemTrading.getConditionStocks(secretOrderEFriend1, condition));
        // }

        // console.log('price', await systemTrading.getPrice(stockCode));

        // const requestBody = {
        //     FID_COND_MRKT_DIV_CODE: 'J',                    //--- FID 조건 시장 분류 코드: J. 주식, ETF, ETN
        //     FID_INPUT_ISCD: stockCode,                      //--- FID 입력 종목코드 : 종목번호 6자리
        //     FID_INPUT_DATE_1: '20250101',                   //--- 조회시작일자 (YYYYMMDD)
        //     FID_INPUT_DATE_2: '20250115',                   //--- 조회종료일자 (YYYYMMDD)
        //     FID_PERIOD_DIV_CODE: 'D',                       //--- FID 기간 분류 코드 (D. 일봉, W. 주봉, M. 월봉, Y. 년봉)
        //     FID_ORG_ADJ_PRC: '1'                            //--- FID 수정주가 원주가 가격 (0. 수정 주가, 1. 원주가)
        // };
        // console.log('FHKST03010100', await systemTrading.getInstance(secretOrderEFriend1.exchange).rest.FHKST03010100(secretOrderEFriend1, {}, requestBody));

        // const stockCode1 = '066570';                                            //--- LG전자
        // const order = await systemTrading.order(secretOrderEFriend1, stockCode1, 1, 70000);
        // const orderChange = await systemTrading.orderChange(secretOrderEFriend1, 14288100, stockCode1, 1, 72000);
        // const orderCancel = await systemTrading.orderCancel(secretOrderEFriend1, 14545700, stockCode1, 1);

        // console.log('_orderHistory_efriend', await systemTrading._orderHistory_efriend(secretOrderEFriend1, stockCode, '20250101', '20250115'));

        // console.log('_getBalance_efriend', await systemTrading._getBalance_efriend(secretOrderEFriend1));

        // expect(await systemTrading.isHoliday('20240519')).toBe(true); 
        // expect(await systemTrading.isHoliday('20240524')).toBe(false);

        //--- 임시 테스트

        //------------------------------------------------------------------------------------------
        //--- LS증권 API 테스트
        //------------------------------------------------------------------------------------------
        // await systemTrading._refreshSecret_ebest(secretOrderEBest7, true);
        // // console.log('_refreshSecret_ebest', await systemTrading.getInstance(secretOrderEBest7.exchange).fetchToken(secretOrderEBest7));

        // console.log('createStocks', await systemTrading.createStocks());

        // const order = await systemTrading.order(secretOrderEBest7, stockCode, 1, 17000);
        // const orderChange = await systemTrading.orderChange(secretOrderEBest7, 9488, stockCode, 1, 16500);
        // const orderCancel = await systemTrading.orderCancel(secretOrderEBest7, 10929, stockCode, 1);

        // const stockCode2 = '066570';                                            //--- LG전자
        // const order = await systemTrading.order(secretOrderEBest7, stockCode2, 1, 70000);
        // const orderChange = await systemTrading.orderChange(secretOrderEBest7, 70029, stockCode2, 1, 72000);
        // const orderCancel = await systemTrading.orderCancel(secretOrderEBest7, 70038, stockCode2, 1);

        // console.log('_orderHistory_ebest', await systemTrading._orderHistory_ebest(secretOrderEBest7, stockCode, '20250101', '20250115'));

        // console.log('_getBalance_ebest', await systemTrading._getBalance_ebest(secretOrderEBest7));

        //------------------------------------------------------------------------------------------
        //--- 임시 테스트
        // const result_t0150 = await systemTrading._t0150_ebest(secretOrderEBest7);
        // const result_t0151 = await systemTrading._t0151_ebest(secretOrderEBest7, '20240627');
        // const result_t0151 = await systemTrading._t0151_ebest(secretOrderEBest9, '20240429');
        // console.log(result_t0151);
    });
});
