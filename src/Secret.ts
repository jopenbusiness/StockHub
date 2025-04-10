/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

import moment from 'moment';                                //--- 'YYYY-MM-DD HH:mm:ss.SSS ZZ'
import { Prisma } from '@prisma/client';

import { getDatabase } from './Database.js';
import { findExchange } from './Exchange.js';
import { REQUIRE_RESULT, SECRET_INFO } from './Secret.type.js';

export const findSecrets = async (): Promise<Array<SECRET_INFO>> => {
    let secrets: Array<SECRET_INFO> = [];

    try {
        const prisma = getDatabase();
        secrets = (await prisma.secrets.findMany()) as Array<SECRET_INFO>;
    } catch (error) {
        console.error('Error getting secrets:', error);
    }
    return secrets;
}

const findSecret = async (id: number): Promise<SECRET_INFO | undefined> => {
    let secret: SECRET_INFO | undefined = undefined;

    try {
        const prisma = getDatabase();
        const result = await prisma.secrets.findFirst({
            where: {
                id: id
            }
        });
        secret = (result) ? result as SECRET_INFO : undefined;
    } catch (error) {
        console.error('Error getting secret:', error);
    }
    return secret;
}

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const findSecretByAccount = async (account: string, accountSub: string): Promise<SECRET_INFO | undefined> => {
//     let secret: SECRET_INFO | undefined = undefined;

//     try {
//         const prisma = getDatabase();
//         const result = await prisma.secrets.findFirst({
//             where: {
//                 account: account,
//                 accountSub: accountSub
//             }
//         });
//         secret = (result) ? result as SECRET_INFO : undefined;
//     } catch (error) {
//         console.error('Error getting secret:', error);
//     }
//     return secret;
// }

export const createSecret = async (item: SECRET_INFO): Promise<SECRET_INFO | undefined> => {
    try {
        const prisma = getDatabase();
        const secret: SECRET_INFO = (await prisma.secrets.create({
            data: {
                ...item,
                json: item.json as Prisma.InputJsonValue
            }
        })) as SECRET_INFO;
        return secret;
    } catch (error) {
        console.error('Error getting secret:', error);
    }
    return undefined;
}

export const isRequireReset = async (secret: SECRET_INFO): Promise<REQUIRE_RESULT> => {
    const now: string = moment().format('YYYY-MM-DD HH:mm:ss');
    const result: REQUIRE_RESULT = { token: false, approval: false };

    if (secret.isRevoked == true) {
        result.token = true;
    } else {
        const tokenPeriodTo = secret.tokenPeriodTo ?? '2000-01-01 00:00:00';
        if (now < tokenPeriodTo) {
            result.token = true;
        }
    }

    const exchange = await findExchange(secret.exchangeId ?? -1);
    //--- 5977df30-138d-11f0-a66e-4bd46a0b0d2d. 한국투자증권
    if ((exchange != undefined) && ([ '5977df30-138d-11f0-a66e-4bd46a0b0d2d' ].includes(exchange.guid))) {
        const approvalKeyExpired = secret.approvalKeyExpired ?? '2000-01-01 00:00:00';
        if (now < approvalKeyExpired) {
            result.approval = true;
        }
    }
    return result;
}

export const resetSecret = async (item: SECRET_INFO): Promise<SECRET_INFO | undefined> => {
    let secret: SECRET_INFO | undefined = undefined;
    if (typeof item.id == 'undefined') {
        const secrets = await findSecrets();
        secret = secrets.find((item) => item.userId == item.userId && item.account == item.account && item.accountSub == item.accountSub);
        if (secret == undefined) {
            console.error('Secret not found:', item.userId, item.account, item.accountSub);
            return item;
        }
    } else {
        secret = await findSecret(item.id ?? -1);
        if (secret == undefined) {
            console.error('Secret not found:', item.id);
            return item;
        }
    }

    //--- ToDo: pppqqq, token 재발급과 approval 재발을 진행 한다.
    // const isRequire = await isRequireReset(secret);
    // // if ((isRequire.token == false) && (isRequire.approval == false)) {
    // //     return secret;
    // // }

    // if (isRequire.token == true) {
    // }
    // if (isRequire.approval == true) {
    // }





 
    // // try {
    // // } catch (error) {
    // //     console.error('Error getting secret:', error);
    // // }
    return secret;    
}
