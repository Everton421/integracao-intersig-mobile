"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteItensPedidoMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class DeleteItensPedidoMobile {
    async deleteProdutosPedido(empresa, codigo) {
        return new Promise(async (resolve, reject) => {
            let sql2 = ` delete from ${empresa}.produtos_pedido
                                        where pedido = ${codigo}
                                    `;
            await databaseConfig_1.conn_mobie.query(sql2, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async deleteServicosPedido(empresa, codigo) {
        return new Promise(async (resolve, reject) => {
            let sql2 = ` delete from ${empresa}.servicos_pedido
                                        where pedido = ${codigo}
                                    `;
            await databaseConfig_1.conn_mobie.query(sql2, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async deleteParcelasPedido(empresa, codigo) {
        return new Promise(async (resolve, reject) => {
            let sql2 = ` delete from ${empresa}.parcelas
                                        where pedido = ${codigo}
                                    `;
            await databaseConfig_1.conn_mobie.query(sql2, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.DeleteItensPedidoMobile = DeleteItensPedidoMobile;
