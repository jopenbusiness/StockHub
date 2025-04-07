/**
 * @author gye hyun james kim <pnuskgh@gmail.com>
 * @copyright 2017~2025, OBCon Inc.
 * @license GNU GENERAL PUBLIC LICENSE v3.0 (https://github.com/jopenbusiness/StockHub?tab=GPL-3.0-1-ov-file)
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const conf: Record<string, any> = {
    database: {
        type: 'sqlite3',                                    //--- DB 종류 (sqlite3, mysql, mariadb, postgresql)
        filename: './files/sqlite3/database.db',            //--- DB 파일명
    }
};

export const setConfig = (config) => {
    Object.keys(config).forEach((key) => {
        conf[key] = config[key];
    });
}

export const getConfig = () => conf;
