"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSetorSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class UpdateSetorSistema {
    async update(setor) {
        return new Promise(async (resolve, reject) => {
            const sql = ` UPDATE  ${databaseConfig_1.db_estoque}.setores SET  
                                        NOME = '${setor.NOME}'
                                   where CODIGO = ${setor.CODIGO}
                            `;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log(`setor Cód(${setor.CODIGO}) atualizado com sucesso no sistema `);
                    resolve(result);
                }
            });
        });
    }
}
exports.UpdateSetorSistema = UpdateSetorSistema;
