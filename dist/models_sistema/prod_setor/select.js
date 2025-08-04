"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectProdSetorSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectProdSetorSistema {
    async busca(publico) {
        return new Promise(async (resolve, reject) => {
            const sql = `SELECT
                               *,
                 DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD 
                  FROM ${databaseConfig_1.db_estoque}.prod_setor
                 `;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async findByProductAndSector(produto, setor) {
        return new Promise(async (resolve, reject) => {
            const sql = `SELECT
                                    *,
                        DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD 
                        FROM ${databaseConfig_1.db_estoque}.prod_setor
                        where produto = ? and setor = ?
                        `;
            await databaseConfig_1.conn_sistema.query(sql, [produto, setor], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async findLastUpdated(data) {
        return new Promise(async (resolve, reject) => {
            const sql = `SELECT
                                        *,
                            DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD 
                            FROM ${databaseConfig_1.db_estoque}.prod_setor
                            where DATA_RECAD > ?
                            `;
            await databaseConfig_1.conn_sistema.query(sql, data, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.SelectProdSetorSistema = SelectProdSetorSistema;
