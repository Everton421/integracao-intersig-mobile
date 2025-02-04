"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Update_formaPagamentoMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class Update_formaPagamentoMobile {
    async update(empresa, formaPagamento) {
        return new Promise(async (resolve, reject) => {
            let sql = `  
       UPDATE
         ${empresa}.forma_pagamento
           set id               = '${formaPagamento.id}',
            descricao           = '${formaPagamento.descricao}',
            desc_maximo          ='${formaPagamento.desc_maximo}',
            parcelas             ='${formaPagamento.parcelas}',
            intervalo            ='${formaPagamento.intervalo}',
            recebimento           ='${formaPagamento.recebimento}',
            data_cadastro        ='${formaPagamento.data_cadastro}',
            data_recadastro      ='${formaPagamento.data_recadastro}'
            
            where id = '${formaPagamento.id}'
            
               `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(' erro ao atualizar forma de pagamento ', err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async updateCodigoSistema(empresa, formaPagamento) {
        return new Promise(async (resolve, reject) => {
            let sql = `  
     UPDATE
       ${empresa}.forma_pagamento

         set 
          codigo             = '${formaPagamento.codigo}',
          id                  = '${formaPagamento.id}',
          descricao           = '${formaPagamento.descricao}',
          desc_maximo          ='${formaPagamento.desc_maximo}',
          parcelas             ='${formaPagamento.parcelas}',
          intervalo            ='${formaPagamento.intervalo}',
          recebimento           ='${formaPagamento.recebimento}',
          data_cadastro        ='${formaPagamento.data_cadastro}',
          data_recadastro      ='${formaPagamento.data_recadastro}'
          
          where codigo = '${formaPagamento.codigo}'
          
             `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(' erro ao atualizar forma de pagamento ', err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.Update_formaPagamentoMobile = Update_formaPagamentoMobile;
