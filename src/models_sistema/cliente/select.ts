import {   conn_sistema } from "../../database/databaseConfig";
import { IClienteSistema } from "./types/clienteSistema";

export class Select_clientes_sistema{

    async   buscaGeral(db_publico:any, vendedor:any )   {
        return new Promise <IClienteSistema[]> ( async ( resolve , reject ) =>{
  

       let sql = ` select *,
             DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
            DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD 
            from ${db_publico}.cad_clie c
            WHERE c.ativo = 'S' and 
                       ( c.vendedor = ${vendedor} OR c.vendedor = 0 or c.vendedor = null)
                       order by c.vendedor    `
            await conn_sistema.query(sql,  (err:any, result:IClienteSistema[] )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }
    

    async   buscaTodos(db_publico:any  )   {
      return new Promise <IClienteSistema[]> ( async ( resolve , reject ) =>{


     let sql = ` select *,
           DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
          DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD 
          from ${db_publico}.cad_clie c
          WHERE c.ativo = 'S'  and c.no_site ='S' `
          await conn_sistema.query(sql,  (err:any, result:IClienteSistema[] )=>{
              if (err)  reject(err); 
                resolve(result)
          })
       })
  }


    async   buscaPorVendedor(db_publico:any, vendedor:number )   {
        return new Promise <IClienteSistema[]> ( async ( resolve , reject ) =>{
        let sql = ` SELECT *,
             DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
            DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD 
           FROM ${db_publico}.cad_clie WHERE vendedor = ?  `
            await conn_sistema.query(sql, [ vendedor], (err:any, result:IClienteSistema[] )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }

    async   buscaPorcodigo(db_publico:any, codigo:number )   {
        return new Promise <IClienteSistema[]> ( async ( resolve , reject ) =>{
        let sql = ` SELECT  codigo, nome, cnpj, celular ,
          DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
            DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD 
        FROM ${db_publico}.cad_clie WHERE codigo = ?  `
            await conn_sistema.query(sql, [ codigo], (err:any, result:IClienteSistema[] )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }

    async   buscaPorCnpj(db_publico:any, cnpj:any )   {
      return new Promise <IClienteSistema[]> ( async ( resolve , reject ) =>{
      let sql = ` SELECT  *,
        DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
          DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD 
      FROM ${db_publico}.cad_clie WHERE cpf = ?  `
          await conn_sistema.query(sql, [ cnpj], (err:any, result:IClienteSistema[] )=>{
              if (err)  reject(err); 
                resolve(result)
          })
       })
  }
  
  async   buscaUltimoIdInserido(db_publico:any,   )   {
    return new Promise <any> ( async ( resolve , reject ) =>{
    let sql = ` SELECT MAX(codigo) as codigo FROM ${db_publico}.cad_clie `
        await conn_sistema.query(sql,   (err:any, result:any )=>{
            if (err)  reject(err); 
              resolve(result)
        })
     })
}

}
