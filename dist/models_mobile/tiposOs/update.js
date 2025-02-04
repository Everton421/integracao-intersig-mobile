"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTipoOsMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class UpdateTipoOsMobile {
    async update(empresa, tipo_os) {
        return new Promise(async (resolve, reject) => {
            const sql = ` update ${empresa}.tipos_os  
                      set
                            id='${tipo_os.id}',
                            descricao='${tipo_os.descricao}',
                            data_cadastro='${tipo_os.data_cadastro}',
                            data_recadastro='${tipo_os.data_recadastro}' 
                         where id = '${tipo_os.id}'
                   `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(`erro ao atualizar tipo de os  ${tipo_os.codigo}`);
                    console.log(sql);
                    reject(err);
                }
                else {
                    reject(result);
                }
            });
        });
    }
    async updateCodigoSistema(empresa, tipo_os) {
        return new Promise(async (resolve, reject) => {
            const sql = ` update ${empresa}.tipos_os  
                     set
                           id='${tipo_os.codigo}',
                           id='${tipo_os.id}',
                           descricao='${tipo_os.descricao}',
                           data_cadastro='${tipo_os.data_cadastro}',
                           data_recadastro='${tipo_os.data_recadastro}' 
                        where codigo = '${tipo_os.codigo}'
                  `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(`erro ao atualizar tipo de os  ${tipo_os.codigo}`);
                    console.log(sql);
                    reject(err);
                }
                else {
                    reject(result);
                }
            });
        });
    }
}
exports.UpdateTipoOsMobile = UpdateTipoOsMobile;
