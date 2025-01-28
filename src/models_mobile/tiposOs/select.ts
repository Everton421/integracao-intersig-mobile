import { conn_mobie } from "../../database/databaseConfig";
import { ITiposOsMobile } from "./types/ITiposOsMobile";

export class SelectTiposOsMobile{


    async   buscaPorCodigo(empresa:any, codigo:number)   {
        return new Promise <ITiposOsMobile[]> ( async ( resolve , reject ) =>{
 
        let sql = ` select *,
          DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
        from ${empresa}.tipos_os where codigo = ? `
            await conn_mobie.query(sql, [ codigo], (err:any, result:ITiposOsMobile[]  )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }

    async   buscaPorId(empresa:any, id:number)   {
        return new Promise  <ITiposOsMobile[]>( async ( resolve , reject ) =>{
 
        let sql = ` select *,
          DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
        from ${empresa}.tipos_os where id = ? `
            await conn_mobie.query(sql, [ id], (err:any, result:ITiposOsMobile[]  )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }
}