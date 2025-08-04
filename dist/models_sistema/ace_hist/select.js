"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectAceHist = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectAceHist {
    async fynLastCode() {
        return new Promise(async (resolve, reject) => {
            const sql = ` select max(ITEM) as ITEM from ${databaseConfig_1.db_vendas}.ace_hist;`;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(` erro ao buscar  o ultimo historico do sistema  `, err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.SelectAceHist = SelectAceHist;
