"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Update_categorias_Mobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class Update_categorias_Mobile {
    async update(empresa, categoria) {
        return new Promise(async (resolve, reject) => {
            let sql = `  
       UPDATE
         ${empresa}.categorias
           set 
           id = '${categoria.id}',
            data_cadastro = '${categoria.data_cadastro}',
            data_recadastro = '${categoria.data_recadastro}',
            descricao = '${categoria.descricao}' 
               where id = '${categoria.id}'
            `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(' erro ao atualizar categoria', err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async updateCodigoSistema(empresa, categoria) {
        return new Promise(async (resolve, reject) => {
            let sql = `  
     UPDATE
       ${empresa}.categorias
         set 
         codigo = '${categoria.codigo}',
         id = '${categoria.id}',
          data_cadastro = '${categoria.data_cadastro}',
          data_recadastro = '${categoria.data_recadastro}',
          descricao = '${categoria.descricao}' 
             where codigo = '${categoria.codigo}'
          `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(' erro ao atualizar categoria', err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.Update_categorias_Mobile = Update_categorias_Mobile;
