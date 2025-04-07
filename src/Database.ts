/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

import { Database } from 'sqlite3';                         //--- https://www.npmjs.com/package/sqlite3
import { getConfig } from './Config.js';

//--- pppqqq, Database file 초기화

export const openDatabase = async (): Promise<Database> => {
    return new Promise((resolve, reject) => {
        try {
            const databaseInfo = getConfig().database;
            const db: Database = new Database(databaseInfo.filename, (err) => {
                if (err) {
                    throw new Error(`Error opening database: ${err.message}`);
                } else {
                    resolve(db);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

export const run = async (db: Database, query: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        try {
            db.run(query, (err) => {
                if (err) {
                    console.error('Error creating table:', err.message);
                } else {
                    resolve(true);
                }
            });
            } catch (error) {
            reject(error);
        }
    });
}

export const get = async (db: Database, query: string, params: Array<string | number | boolean>): Promise<any> => {
    return new Promise((resolve, reject) => {
        try {
            db.get(query, params, (err, row) => {
                if (err) {
                    throw new Error(`Error executing get: ${err.message}`);
                } else {
                    resolve(row);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

export const closeDatabase = async (db: Database): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        try {
            db.close((err) => {
                if (err) {
                    throw new Error(`Error closing database: ${err.message}`);
                } else {
                    resolve(true);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

const sqlStockExchange: string = [
    "CREATE TABLE IF NOT EXISTS StockExchange (",
    "    id INTEGER PRIMARY KEY AUTOINCREMENT,",
    "    guid VARCHAR(74) NOT NULL,",
    "    name VARCHAR(64) NOT NULL DEFAULT ''",
    "    homepage VARCHAR(128) NOT NULL DEFAULT ''",
    "    url VARCHAR(128) NOT NULL DEFAULT ''",

    "    domainProduct VARCHAR(128) NOT NULL DEFAULT ''",
    "    domainDevelop VARCHAR(128) NOT NULL DEFAULT ''",
    "    wsProduct VARCHAR(128) NOT NULL DEFAULT ''",
    "    wsDevelop VARCHAR(128) NOT NULL DEFAULT ''",

    "    createdAt DATETIME NOT NULL",
    "    updatedAt DATETIME NOT NULL",
    ')'
].join(' ');

const sqlStockSpec: string = [
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
].join(' ');

let isInitialized: boolean = false;
export const initializeDatabase = async (db: Database): Promise<boolean> => {
    if (isInitialized == false) {
        isInitialized = true;
        await run(db, sqlStockExchange);
        await run(db, sqlStockSpec);
    }
    return true;
}
