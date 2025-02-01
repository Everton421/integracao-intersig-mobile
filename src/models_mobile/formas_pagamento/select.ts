import { conn_mobie } from "../../database/databaseConfig";
import { IFormaPagamentoMobile } from "./types/IFormas_pagamento";

export class SelectFormaPagamentoMobile{


    async   buscaGeral(empresa:any )   {
        return new Promise   <IFormaPagamentoMobile[]>  ( async ( resolve , reject ) =>{
        let sql = ` select *,
         DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
        from ${empresa}.forma_pagamento  `
            await conn_mobie.query(sql,  (err:any, result:any  )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }
    
    async   buscaPorId(empresa:any, id:any )   {
        return new Promise  <IFormaPagamentoMobile[]> ( async ( resolve , reject ) =>{
            let sql = ` select *,
            DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
            from ${empresa}.forma_pagamento 
            where id = ${id}
            `
            await conn_mobie.query(sql,  (err:any, result:any  )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }
    async   buscaPorCodigo(empresa:any, codigo:any )   {
        return new Promise  <IFormaPagamentoMobile[]> ( async ( resolve , reject ) =>{
            let sql = ` select *,
            DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
            from ${empresa}.forma_pagamento 
            where codigo = ${codigo}
            `
            await conn_mobie.query(sql,  (err:any, result:any  )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }
}