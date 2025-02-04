"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertServicoMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class InsertServicoMobile {
    async insert(empresa, servico) {
        return new Promise(async (resolve, reject) => {
            let { codigo, id, valor, aplicacao, tipo_serv, data_cadastro, data_recadastro, } = servico;
            if (!data_cadastro || data_cadastro === null) {
                data_cadastro = '0000-00-00';
            }
            if (!data_recadastro || data_recadastro === null) {
                data_recadastro = '0000-00-00 00:00:00';
            }
            const sql = ` INSERT INTO  ${empresa}.servicos  
                             (
                            id,
                            valor ,
                            aplicacao,
                            tipo_serv,
                            data_cadastro,
                            data_recadastro 
                                ) VALUES (
                                     ${id},
                                     ${valor},
                                    '${aplicacao}',
                                    ${tipo_serv},
                                   '${data_cadastro}',
                                   '${data_recadastro}' 
                                  )
                            `;
            let dados = [id, valor, aplicacao, tipo_serv, data_cadastro, data_recadastro];
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log(`servico cadastrado com sucesso `);
                    resolve(result);
                }
            });
        });
    }
    async insertCodigoSistema(empresa, servico) {
        return new Promise(async (resolve, reject) => {
            let { codigo, id, valor, aplicacao, tipo_serv, data_cadastro, data_recadastro, } = servico;
            if (!data_cadastro || data_cadastro === null) {
                data_cadastro = '0000-00-00';
            }
            if (!data_recadastro || data_recadastro === null) {
                data_recadastro = '0000-00-00 00:00:00';
            }
            const sql = ` INSERT INTO  ${empresa}.servicos  
                                  (
                                codigo,
                                 id,
                                 valor ,
                                 aplicacao,
                                 tipo_serv,
                                 data_cadastro,
                                 data_recadastro 
                                     ) VALUES (
                                       ${codigo},
                                          ${id},
                                          ${valor},
                                         '${aplicacao}',
                                         ${tipo_serv},
                                        '${data_cadastro}',
                                        '${data_recadastro}' 
                                       )
                                 `;
            let dados = [codigo, id, valor, aplicacao, tipo_serv, data_cadastro, data_recadastro];
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log(`servico ${codigo} cadastrado com sucesso `);
                    resolve(result);
                }
            });
        });
    }
}
exports.InsertServicoMobile = InsertServicoMobile;
