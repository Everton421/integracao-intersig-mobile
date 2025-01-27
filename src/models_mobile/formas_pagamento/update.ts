 
import {conn_mobie} from '../../database/databaseConfig'

import { IFormaPagamentoMobile } from './types/IFormas_pagamento'

export class Update_formaPagamentoMobile{

    async   update(empresa:any, formaPagamento:IFormaPagamentoMobile )   {
        return new Promise  ( async ( resolve , reject ) =>{
        let sql =
         `  
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
            
               `   

             await conn_mobie.query(sql,    (err:any, result:IFormaPagamentoMobile[] )=>{
                if (err) {
                  console.log(' erro ao atualizar forma de pagamento ',err)
                  reject(err);
                }else{ 
                  resolve(result)
                }
               })
         })
    }
  
}

