"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUsuarioMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class UpdateUsuarioMobile {
    async update(empresa, usuario) {
        return new Promise(async (resolve, reject) => {
            const sql = ` update ${empresa}.usuarios  
                      set
                            codigo='${usuario.codigo}',
                            nome='${usuario.nome}',
                            email='${usuario.email}',
                            senha='${usuario.senha}',
                            cnpj='${empresa}' 
                         where codigo = '${usuario.codigo}'
                   `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(`erro ao atualizar usuario ${usuario.codigo}`);
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
exports.UpdateUsuarioMobile = UpdateUsuarioMobile;
