/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

import { PrismaClient } from './prismaClient/client.js';

const prisma: PrismaClient = new PrismaClient();

export const getDatabase = (): PrismaClient => {
    prisma.$connect();
    return prisma;
}

export const disconnectDatabase = async (): Promise<void> => {
    await prisma.$disconnect();
}
