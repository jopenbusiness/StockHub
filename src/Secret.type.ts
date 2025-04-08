/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

type USER_TYPE = 'P' | 'B';                                 //--- 사용자 구분 (P: 개인, B: 법인)
type GRANT_TYPE = 'client_credentials';

type TOKEN_SCOPE = '' | 'oob';
type TOKEN_TYPE = 'Bearer';
type TOKEN_TYPE_HINT = '' | 'access_token' | 'refresh_token';

export interface SECRET_INFO {                              //--- 사용자 Open API 접속 정보
    id?: number,
    exchangeId: number,                                     //--- 거래소 ID

    name: string
    userId: string,                                         //--- 사용자 ID
    userType: USER_TYPE,                                    //--- 사용자 구분
    account: string,                                        //--- 종합계좌번호
    accountSub: string,                                     //--- 계좌상품번호
    feeType?: string,                                       //--- 수수료 타입 (뱅키스, 영업점, 패밀리, ISA)

    grantType: GRANT_TYPE,                                  //--- 인증방식
    appKey: string,                                         //--- App Key
    appSecret: string,                                      //--- App Secret       
    periodFrom: string,                                     //--- 유효기간 시작일 (YYYY-MM-DD)
    periodTo: string,                                       //--- 유효기간 종료일 (YYYY-MM-DD)

    accessToken?: string,                                   //--- 접근 토큰
    scope?: TOKEN_SCOPE,                                    //--- 적용 범위
    tokenType?: TOKEN_TYPE,                                 //--- 토큰 타입
    tokenTypeHint?: TOKEN_TYPE_HINT,                        //--- 토큰 타입 힌트
    expiresIn?: number,                                     //--- 유효 기간 (초)
    periedFrom?: string,                                    //--- 유효기간 시작일시 (YYYY-MM-DD HH:mm:ss)
    periedTo?: string,                                      //--- 유효기간 종료일시 (YYYY-MM-DD HH:mm:ss)
    isRevoked?: boolean                                     //--- 토큰 해지 여부

    approvalKey?: string,                                   //--- Web Socket 접속키
    approvalKeyExpired?: string,                            //--- Web Socket 접속키의 마감일시 (YYYY-MM-DD HH:mm:ss)

    isProduct: boolean,                                     //--- 실전 투자 여부 (true: 실전투자, false: 모의투자)
    isActive: boolean,                                      //--- 활성 여부
    
    json?: string
};
