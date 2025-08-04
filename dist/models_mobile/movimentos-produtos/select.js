"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMovimentosProdutosMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectMovimentosProdutosMobile {
    async findLastUpdate(empresa, data_recadastro) {
        return new Promise(async (resolve, reject) => {
            let sql = ` select 
             *,
                coalesce( DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s'), '0000-00-00 00:00:00') AS data_recadastro
             from ${empresa}.movimentos_produtos  `;
            let paramQuery = [];
            let valueQuery = [];
            if (data_recadastro) {
                paramQuery.push(' WHERE data_recadastro >  ? ');
                valueQuery.push(data_recadastro);
            }
            let finalSql = sql;
            if (paramQuery.length > 0) {
                finalSql = sql + paramQuery;
            }
            await databaseConfig_1.conn_mobie.query(finalSql, valueQuery, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
}
exports.SelectMovimentosProdutosMobile = SelectMovimentosProdutosMobile;
