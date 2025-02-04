"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertTiposOsMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class InsertTiposOsMobile {
    async insert(empresa, tipo_os) {
        return new Promise(async (resolve, reject) => {
            let { codigo, id, descricao, data_cadastro, data_recadastro, } = tipo_os;
            if (!data_cadastro || data_cadastro === null) {
                data_cadastro = '0000-00-00';
            }
            if (!data_recadastro || data_recadastro === null) {
                data_recadastro = '0000-00-00 00:00:00';
            }
            const sql = ` INSERT INTO  ${empresa}.tipos_os  
                             (
                            id,
                            descricao,
                            data_cadastro,
                            data_recadastro 
                                ) VALUES (
                                       ${id},
                                      '${descricao}',
                                       '${data_cadastro}',
                                       '${data_recadastro}' 
                                  )
                            `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log(`tipo de os  cadastrada com sucesso `);
                    resolve(result);
                }
            });
        });
    }
    async insertCodigoSistema(empresa, tipo_os) {
        return new Promise(async (resolve, reject) => {
            let { codigo, id, descricao, data_cadastro, data_recadastro, } = tipo_os;
            if (!data_cadastro || data_cadastro === null) {
                data_cadastro = '0000-00-00';
            }
            if (!data_recadastro || data_recadastro === null) {
                data_recadastro = '0000-00-00 00:00:00';
            }
            const sql = ` INSERT INTO  ${empresa}.tipos_os  
                                  (
                                codigo,
                                 id,
                                 descricao,
                                 data_cadastro,
                                 data_recadastro 
                                     ) VALUES (
                                            ${codigo},
                                             ${id},
                                           '${descricao}',
                                            '${data_cadastro}',
                                            '${data_recadastro}' 
                                       )
                                 `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log(`tipo de os  cadastrada com sucesso `);
                    resolve(result);
                }
            });
        });
    }
}
exports.InsertTiposOsMobile = InsertTiposOsMobile;
