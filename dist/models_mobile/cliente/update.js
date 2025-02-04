"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Updata_clientes_Mobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class Updata_clientes_Mobile {
    async update(empresa, cliente) {
        return new Promise(async (resolve, reject) => {
            let sql = `  
       UPDATE
         ${empresa}.clientes
              set   id = '${cliente.id}',
                celular = '${cliente.celular}', 
                nome = '${cliente.nome}',
                cep   = '${cliente.cep}',
                endereco  = '${cliente.endereco}',
                ie  = '${cliente.ie}',
                numero  = '${cliente.numero}',
                cnpj  = '${cliente.cnpj}',
                cidade  = '${cliente.cidade}',
                data_cadastro  = '${cliente.data_cadastro}',
                data_recadastro  = '${cliente.data_recadastro}',
                vendedor =  ${cliente.vendedor},
                bairro = '${cliente.bairro}',
                estado = '${cliente.estado}' 
               where id = ${cliente.id}
                  
            `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(' erro ao atualizar cliente', err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async updateCodigoSistema(empresa, cliente) {
        return new Promise(async (resolve, reject) => {
            let sql = `  
     UPDATE
       ${empresa}.clientes
            set  
              codigo = '${cliente.codigo}',
            id = '${cliente.id}',
              celular = '${cliente.celular}', 
              nome = '${cliente.nome}',
              cep   = '${cliente.cep}',
              endereco  = '${cliente.endereco}',
              ie  = '${cliente.ie}',
              numero  = '${cliente.numero}',
              cnpj  = '${cliente.cnpj}',
              cidade  = '${cliente.cidade}',
              data_cadastro  = '${cliente.data_cadastro}',
              data_recadastro  = '${cliente.data_recadastro}',
              vendedor =  ${cliente.vendedor},
              bairro = '${cliente.bairro}',
              estado = '${cliente.estado}' 
             where codigo = ${cliente.codigo}
                
          `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(' erro ao atualizar cliente', err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.Updata_clientes_Mobile = Updata_clientes_Mobile;
