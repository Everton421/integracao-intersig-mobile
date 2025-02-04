"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteItensPedidoSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class DeleteItensPedidoSistema {
    async deletePro_orca(codigo) {
        return new Promise(async (resolve, reject) => {
            let sql2 = ` delete from ${databaseConfig_1.db_vendas}.pro_orca
                                            where orcamento = ${codigo}
                                        `;
            await databaseConfig_1.conn_sistema.query(sql2, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                    resolve(result);
                    // statusAtualizacao = result.serverStatus ;
                }
            });
        });
    }
    async deleteSer_orca(codigo) {
        return new Promise(async (resolve, reject) => {
            let sql2 = ` delete from ${databaseConfig_1.db_vendas}.ser_orca
                                            where orcamento = ${codigo}
                                        `;
            await databaseConfig_1.conn_sistema.query(sql2, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(" servico deletado com sucesso ", result);
                    resolve(result);
                    // statusAtualizacao = result.serverStatus ;
                }
            });
        });
    }
    async deletePar_orca(codigo) {
        return new Promise(async (resolve, reject) => {
            let sql2 = ` delete from ${databaseConfig_1.db_vendas}.par_orca
                                            where orcamento = ${codigo}
                                        `;
            await databaseConfig_1.conn_sistema.query(sql2, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(" parcela deletada com sucesso ", result);
                    resolve(result);
                    // statusAtualizacao = result.serverStatus ;
                }
            });
        });
    }
}
exports.DeleteItensPedidoSistema = DeleteItensPedidoSistema;
