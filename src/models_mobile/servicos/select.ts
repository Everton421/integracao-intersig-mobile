import { conn_mobie } from "../../database/databaseConfig";
import { IServicosMobile } from "./types/IServicosMobile";


export class SelectServicosMobile{

    async   buscaPorCodigo(empresa:any, codigo:number)   {
        return new Promise  ( async ( resolve , reject ) =>{
 
        let sql = ` select *,
          DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
        from ${empresa}.servicos where codigo = ? `
            await conn_mobie.query(sql, [ codigo], (err:any, result:any  )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }

    async   buscaPorId(empresa:any, id:number)   {
        return new Promise  <IServicosMobile[]>( async ( resolve , reject ) =>{
 
        let sql = ` select *,
          DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
        from ${empresa}.servicos where id = ? `
            await conn_mobie.query(sql, [ id], (err:any, result:IServicosMobile[]  )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }


async buscaPorCodigoDescricao(empresa:any, codigo:number, descricao:string){

    if(!codigo) codigo = 0; 
    if(!descricao) descricao = '';
     

    const sql = `SELECT *,
       DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
      DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
    FROM ${empresa}.servicos
    WHERE  codigo like ? OR aplicacao = ?    `;
    return new Promise ( async (resolve,reject)=>{
        await conn_mobie.query( sql,[ codigo, descricao ], (err:any, result:any)=>{
            if(err){ 
                  reject(err)
            }else{
                 resolve(result)
                 }
        } )
    })
}


async   buscaGeral(empresa:any )   {
    return new Promise   ( async ( resolve , reject ) =>{
    let sql = ` select *,
      DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
    from ${empresa}.servicos  `
        await conn_mobie.query(sql,  (err:any, result:any )=>{
            if (err)  reject(err); 
              resolve(result)
        })
     })
}


}