/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

//--- ToDo: 현재 사용하지 않는 코

import { CONFIG_INFO } from './Config.type.js';

const conf: CONFIG_INFO = {
    // root: './',
    // database: {
    //     type: 'sqlite3',                                    //--- DB 종류 (sqlite3, mysql, mariadb, postgresql)
    //     filename: 'files/sqlite3/StockHub.db',              //--- DB 파일명
    // }
};

export const setConfig = (config: CONFIG_INFO, isReset: boolean = false): void => {
    if (isReset) {
        Object.keys(conf).forEach((key) => {
            conf[key] = undefined;
        });
    }

    Object.keys(config).forEach((key) => {
        conf[key] = config[key];
    });
}

export const getConfig = (): CONFIG_INFO => conf;
