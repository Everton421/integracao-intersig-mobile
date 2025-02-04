"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertParamPedidosMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class InsertParamPedidosMobile {
    async cadastrar(paramPedido) {
        return new Promise(async (resolve, reject) => {
            let sql = `  
            insert into ${databaseConfig_1.db_integracao_mobile}.pedidos
            (
            codigo_sistema,
            codigo_mobile,
            excluido
            )values(
            '${paramPedido.codigo_sistema}',
            '${paramPedido.codigo_mobile}',
            '${paramPedido.excluido}'
            )
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
    async cadastrarPorCodigoSistema(paramPedido) {
        return new Promise(async (resolve, reject) => {
            let sql = `  
          insert into ${databaseConfig_1.db_integracao_mobile}.pedidos
          (
          codigo_sistema,
          codigo_mobile,
          excluido
          )values(
          ${paramPedido.codigo_sistema},
          ${paramPedido.codigo_mobile},
          ${paramPedido.excluido}
          where codigo_sistema = ${paramPedido.codigo_sistema}
          )
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
}
exports.InsertParamPedidosMobile = InsertParamPedidosMobile;
