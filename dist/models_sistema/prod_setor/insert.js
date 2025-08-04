"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertProdSetorSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class InsertProdSetorSistema {
    async insert(prod_setor) {
        return new Promise(async (resolve, reject) => {
            const sql = ` INSERT INTO ${databaseConfig_1.db_estoque}.prod_setor      
                           (  SETOR,
                            PRODUTO,
                            ESTOQUE,
                            LOCAL1_PRODUTO,
                            LOCAL2_PRODUTO,
                            LOCAL3_PRODUTO,
                            DATA_RECAD,
                            LOCAL_PRODUTO,
                            LOCAL4_PRODUTO 
                               )values(
                             ${prod_setor.setor},
                             ${prod_setor.produto},  
                             ${prod_setor.estoque},
                            '${prod_setor.local1_produto}',
                            '${prod_setor.local2_produto}',
                            '${prod_setor.local3_produto}',
                            '${prod_setor.data_recadastro}',
                            '${prod_setor.local_produto}',
                            '${prod_setor.local4_produto}' 
                        )
                         `;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(`erro ao inserir produto:${prod_setor.produto} na tabela prod_setor `, err);
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
exports.InsertProdSetorSistema = InsertProdSetorSistema;
