/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

import fs from 'fs';
import path from 'path';
import { Database } from 'sqlite3';                         //--- https://www.npmjs.com/package/sqlite3

import { getConfig } from './Config.js';

const _openDatabase = async (): Promise<Database> => {
    return new Promise((resolve, reject) => {
        try {
            const config = getConfig();
            const filename = path.join(config.root, config.database.filename);
            const foldername = path.dirname(filename);
            if (!fs.existsSync(foldername)) {
                fs.mkdirSync(foldername, { recursive: true });
            }
            const db: Database = new Database(filename, (err) => {
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

export const openDatabase = async (): Promise<Database> => {
    const db = await _openDatabase();
    await initializeDatabase(db);
    return db;
}

//--- pppqqq
let database: Database  = await openDatabase();

export const run = async (db: Database, query: string, params: Array<string | number | boolean> = []): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        try {
            db.run(query, params, (err) => {
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

const sqlStockSpec: string = [
    "CREATE TABLE IF NOT EXISTS Specifications (",
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
