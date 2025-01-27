import { conn_sistema } from "../../database/databaseConfig";
import { ICategoriasSistema } from "./types/ICategoriasSistema";

export class SelectCategoriasSistema{


      async busca_por_descricao(db_publico:string, descricao:string ){
  
          return new Promise<ICategoriasSistema[]>( async (resolve, reject)=>{
  
               let sql = ` SELECT *,
                  DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
                  DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD
               FROM ${db_publico}.cad_pgru 
                 WHERE NOME = '${descricao}' `
   
              await conn_sistema.query( sql  ,(err:any, result:ICategoriasSistema[] )=>{
                  if(err){
                    console.log(` erro ao buscar categorias  do sistema  `,err)

                      reject(err);
                  }else{
                      resolve(result);
                  }
              })
          })
      }
  
      async busca_geral(db_publico:any ){
  
          return new Promise<ICategoriasSistema[]>( async (resolve, reject)=>{
  
               let sql = ` SELECT *,
                  DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
                  DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD
               FROM ${db_publico}.cad_pgru `
   
              await conn_sistema.query( sql  ,(err:any, result:ICategoriasSistema[] )=>{
                  if(err){
                    console.log(` erro ao buscar categorias  do sistema  `,err)
                      reject(err);
                  }else{
                      resolve(result);
                  }
              })
          })
      }
  

      async buscaPorCodigo(db_publico:string, codigo:number ){
  
        return new Promise<ICategoriasSistema[]>( async (resolve, reject)=>{

             let sql = ` SELECT *,
                DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
                DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD
             FROM ${db_publico}.cad_pgru WHERE CODIGO = ${codigo}`
 
            await conn_sistema.query( sql  ,(err:any, result:ICategoriasSistema[] )=>{
                if(err){
                    console.log(` erro ao buscar categorias  do sistema  `,err)

                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }



  }