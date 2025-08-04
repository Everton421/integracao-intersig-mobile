"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConfigIntegracao = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class UpdateConfigIntegracao {
    async update(config) {
        return new Promise(async (resolve, reject) => {
            const sql = ` update ${databaseConfig_1.db_integracao_mobile}.configuracoes  set  `;
            let conditions = [];
            let values = [];
            if (config.ultima_verificacao_estoque) {
                conditions.push(' ultima_verificacao_estoque = ? ');
                values.push(`${config.ultima_verificacao_estoque}`);
            }
            if (config.importar_pedidos) {
                conditions.push(' importar_pedidos = ? ');
                values.push(`${config.importar_pedidos}`);
            }
            if (config.importar_estoque) {
                conditions.push(' importar_estoque = ? ');
                values.push(`${config.importar_estoque}`);
            }
            if (config.ultima_verificacao_preco) {
                conditions.push(' ultima_verificacao_preco = ? ');
                values.push(`${config.ultima_verificacao_preco}`);
            }
            if (config.ultima_verificacao_pedidos) {
                conditions.push(' ultima_verificacao_pedidos = ? ');
                values.push(`${config.ultima_verificacao_pedidos}`);
            }
            let whereClause = ' WHERE codigo = 1;';
            let finalSql = sql;
            if (conditions.length > 0) {
                finalSql = sql + conditions.join(' , ') + whereClause;
            }
            await databaseConfig_1.conn_sistema.query(finalSql, values, (err, result) => {
                if (err) {
                    console.log(`erro ao atualizar as configuracoes da integracao  `, err);
                    console.log("SQL: ", finalSql, "  VALORES: ", values);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.UpdateConfigIntegracao = UpdateConfigIntegracao;
