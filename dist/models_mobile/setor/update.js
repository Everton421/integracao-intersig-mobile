"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSetorMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class UpdateSetorMobile {
    async update(empresa, setor) {
        return new Promise(async (resolve, reject) => {
            let { codigo, data_cadastro, data_recadastro, descricao, } = setor;
            const sql = ` UPDATE  ${empresa}.setores SET  
                                    data_cadastro = '${data_cadastro}',
                                    data_recadastro = '${data_recadastro}',
                                    descricao = '${descricao}' 
                                   where codigo = ${codigo}
                            `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log(`setor atualizadao com sucesso `);
                    resolve(result);
                }
            });
        });
    }
}
exports.UpdateSetorMobile = UpdateSetorMobile;
