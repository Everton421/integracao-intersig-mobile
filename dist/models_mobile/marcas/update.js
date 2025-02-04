"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Update_marcas_Mobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class Update_marcas_Mobile {
    async update(empresa, marca) {
        return new Promise(async (resolve, reject) => {
            let sql = `  
       UPDATE
         ${empresa}.marcas
           set id = '${marca.id}',
            data_cadastro = '${marca.data_cadastro}',
            data_recadastro = '${marca.data_recadastro}',
            descricao = '${marca.descricao}' 
               where id = '${marca.id}'
            `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(' erro ao atualizar marca', err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async updateCodigoSistema(empresa, marca) {
        return new Promise(async (resolve, reject) => {
            let sql = `  
     UPDATE
       ${empresa}.marcas
         set
          id = '${marca.codigo}', 
         id = '${marca.id}',
          data_cadastro = '${marca.data_cadastro}',
          data_recadastro = '${marca.data_recadastro}',
          descricao = '${marca.descricao}' 
             where codigo = '${marca.codigo}'
          `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(' erro ao atualizar marca', err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.Update_marcas_Mobile = Update_marcas_Mobile;
