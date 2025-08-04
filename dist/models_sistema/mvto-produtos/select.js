"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMvtoProdutosSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectMvtoProdutosSistema {
    async findByMvtoKey(chave) {
        return new Promise(async (resolve, reject) => {
            const sql = `SELECT
                                    *,
                        DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD 
                        FROM ${databaseConfig_1.db_vendas}.mvto_produtos
                        where chave_mvto = ? 
                        `;
            await databaseConfig_1.conn_sistema.query(sql, [chave], (err, result) => {
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
exports.SelectMvtoProdutosSistema = SelectMvtoProdutosSistema;
