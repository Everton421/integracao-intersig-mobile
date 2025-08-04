"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectConfig = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectConfig {
    async selectConfig() {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT * from ${databaseConfig_1.db_integracao_mobile}.configuracoes where codigo = 1;`;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
}
exports.SelectConfig = SelectConfig;
