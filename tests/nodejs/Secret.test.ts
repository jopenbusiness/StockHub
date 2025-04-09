/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

import dotenv from 'dotenv';
import { describe, expect, it } from 'vitest'

import { findExchangeByGuid } from '../../src/Exchange.js';
import { SECRET_INFO, USER_TYPE } from '../../src/Secret.type.js';
import { createSecret, findSecrets } from '../../src/Secret.js';

//--- https://vitest.dev/guide/
describe('Test Secret', () => {
    dotenv.config();

    it('Create secret from env', async () => {
        const exchangeGuid: string = process.env.EXCHANGE_GUID ?? '';
        const exchange = await findExchangeByGuid(exchangeGuid);
        expect(exchange).toBeDefined();
        expect(exchange?.guid).toBe(exchangeGuid);

        if ((exchange != undefined) && (process.env.USER_ID)) {
            const itemSecret: SECRET_INFO = {
                exchangeId: exchange.id ?? -1,
            
                name: `${exchange.name}: ${process.env.USER_TYPE}`,
                userId: process.env.USER_ID ?? '',
                userType: process.env.USER_TYPE as USER_TYPE ?? '개인' as USER_TYPE,
                account: process.env.ACCOUNT ?? '',
                accountSub: process.env.ACCOUNT_SUB ?? '',
                feeType: '',
            
                grantType: 'client_credentials',
                appKey: process.env.APP_KEY ?? '',
                appSecret: process.env.APP_SECRET ?? '',
                periodFrom: process.env.PERIOD_FROM ?? '',
                periodTo: process.env.PERIOD_TO ?? '',

                isProduct: true,                                     //--- 실전 투자 여부 (true: 실전투자, false: 모의투자)
                isActive: true,                                      //--- 활성 여부
                json: '{}'
            };

            if (process.env.ACCESS_TOKEN) {
                itemSecret.accessToken = process.env.ACCESS_TOKEN ?? '';
                itemSecret.scope = 'oob';
                itemSecret.tokenType = 'Bearer';
                itemSecret.tokenTypeHint = 'access_token';
                itemSecret.expiresIn = parseInt(process.env.EXPIRES_IN ?? '0');
                itemSecret.tokenPeriodFrom = process.env.PERIOD_FROM ?? '';
                itemSecret.tokenPeriodTo = process.env.PERIOD_TO ?? '';    
                itemSecret.isRevoked = false;
            }

            if (process.env.APPROVAL_KEY) {
                itemSecret.approvalKey = process.env.APPROVAL_KEY ?? '';
                itemSecret.approvalKeyExpired = process.env.APPROVAL_KEY_EXPIRED ?? '';
            }
                    
            const secrets = await findSecrets();
            const secretFind = secrets.find((item) => item.userId == itemSecret.userId && item.account == itemSecret.account && item.accountSub == itemSecret.accountSub);
            if (secretFind == undefined) {
                const secret: SECRET_INFO | undefined = await createSecret(itemSecret);
                expect(secret).toBeDefined();
                expect(secret?.id).toBeDefined();
            }
        }
    });
});
