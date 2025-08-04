"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMovimentosIntegracao = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectMovimentosIntegracao {
    async findByIdMobile(id_mobile) {
        return new Promise(async (resolve, reject) => {
            const sql = ` SELECT * from ${databaseConfig_1.db_integracao_mobile}.movimentos
                            WHERE id_mobile = ?;`;
            await databaseConfig_1.conn_sistema.query(sql, id_mobile, (err, result) => {
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
exports.SelectMovimentosIntegracao = SelectMovimentosIntegracao;
