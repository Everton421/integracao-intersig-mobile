"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProdSetorSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class UpdateProdSetorSistema {
    async update(prod_setor) {
        return new Promise(async (resolve, reject) => {
            const sql = ` update ${databaseConfig_1.db_estoque}.prod_setor  
                             set
                            ESTOQUE = ${prod_setor.estoque},
                            LOCAL1_PRODUTO = '${prod_setor.local1_produto}',
                            LOCAL2_PRODUTO = '${prod_setor.local2_produto}',
                            LOCAL3_PRODUTO = '${prod_setor.local3_produto}',
                            DATA_RECAD = '${prod_setor.data_recadastro}',
                            LOCAL_PRODUTO = '${prod_setor.local_produto}',
                            LOCAL4_PRODUTO = '${prod_setor.local4_produto}' 
                            where produto = ${prod_setor.produto} and setor = ${prod_setor.setor}
                         `;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(`erro ao atualizar prod_setor produto:${prod_setor.produto}`, err);
                    console.log(sql);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.UpdateProdSetorSistema = UpdateProdSetorSistema;
