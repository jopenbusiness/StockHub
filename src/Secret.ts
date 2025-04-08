/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

//--- pppqqq, .env 파일 정보를 사용하여 Secret 생성

// import { PrismaClient } from '@prisma/client'

// import { SECRET_INFO } from './Secret.type.js';

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const getSecret = async (id: number): Promise<SECRET_INFO | undefined> => {
//     let secret: SECRET_INFO | undefined = undefined;
//     const prisma = new PrismaClient();

//     try {
//         secret = (await prisma.secrets.findFirst({
//             where: {
//                 id: id
//             }
//         })) as SECRET_INFO;
//     } catch (error) {
//         console.error('Error getting secret:', error);
//     } finally {
//         await prisma.$disconnect();
//     }
//     return secret;
// }

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const getSecrets = async (): Promise<Array<SECRET_INFO>> => {
//     let secrets: Array<SECRET_INFO> = [];
//     const prisma = new PrismaClient();

//     try {
//         secrets = (await prisma.secrets.findMany()) as Array<SECRET_INFO>;
//     } catch (error) {
//         console.error('Error getting secrets:', error);
//     } finally {
//         await prisma.$disconnect();
//     }
//     return secrets;
// }

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const getSecretByUserId = async (userId: string): Promise<SECRET_INFO | undefined> => {
//     let secret: SECRET_INFO | undefined = undefined;
//     const prisma = new PrismaClient();

//     try {
//         secret = (await prisma.secrets.findFirst({
//             where: {
//                 userId: userId
//             }
//         })) as SECRET_INFO;
//     } catch (error) {
//         console.error('Error getting secret:', error);
//     } finally {
//         await prisma.$disconnect();
//     }
//     return secret;
// }
