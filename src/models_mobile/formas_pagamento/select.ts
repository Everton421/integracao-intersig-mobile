import { conn_mobie } from "../../database/databaseConfig";
import { IForma_pagamento } from "./types/IFormas_pagamento";

export class SelectFormaPagamentoMobile{


    async   buscaGeral(empresa:any )   {
        return new Promise   <IForma_pagamento[]>  ( async ( resolve , reject ) =>{
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
        return new Promise  <IForma_pagamento[]> ( async ( resolve , reject ) =>{
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
}