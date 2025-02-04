"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Insert_clientes_Mobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class Insert_clientes_Mobile {
    async cadastrar(empresa, cliente) {
        return new Promise(async (resolve, reject) => {
            let sql = `  
         INSERT INTO 
         ${empresa}.clientes
              (   id,
                celular, 
                nome ,
                cep ,
                endereco ,
                ie ,
                numero ,
                cnpj ,
                cidade ,
                data_cadastro ,
                data_recadastro ,
                vendedor,
                bairro,
                estado 
               ) values
                (
                  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );
            `;
            const dados = [cliente.id, cliente.celular, cliente.nome, cliente.cep, cliente.endereco, cliente.ie, cliente.numero,
                cliente.cnpj, cliente.cidade, cliente.data_cadastro, cliente.data_recadastro, cliente.vendedor, cliente.bairro, cliente.estado];
            await databaseConfig_1.conn_mobie.query(sql, dados, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async cadastrarCodigoSistema(empresa, cliente) {
        return new Promise(async (resolve, reject) => {
            let sql = `  
       INSERT INTO 
       ${empresa}.clientes
            ( 
              codigo,  
              id,
              celular, 
              nome ,
              cep ,
              endereco ,
              ie ,
              numero ,
              cnpj ,
              cidade ,
              data_cadastro ,
              data_recadastro ,
              vendedor,
              bairro,
              estado 
             ) values
              (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );
          `;
            const dados = [cliente.codigo, cliente.id, cliente.celular, cliente.nome, cliente.cep, cliente.endereco, cliente.ie, cliente.numero,
                cliente.cnpj, cliente.cidade, cliente.data_cadastro, cliente.data_recadastro, cliente.vendedor, cliente.bairro, cliente.estado];
            await databaseConfig_1.conn_mobie.query(sql, dados, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.Insert_clientes_Mobile = Insert_clientes_Mobile;
