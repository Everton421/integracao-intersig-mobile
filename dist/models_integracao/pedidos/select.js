"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectIntegracao = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectIntegracao {
    async validaPedido(codigoPedidoMobile) {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT * 
                       FROM ${databaseConfig_1.db_integracao_mobile}.pedidos where codigo_mobile=${codigoPedidoMobile} `;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(` erro ao buscar marcas  do sistema  `, err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.SelectIntegracao = SelectIntegracao;
