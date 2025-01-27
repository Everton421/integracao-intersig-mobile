import { conn_sistema } from "../../database/databaseConfig";
import { IFormaPagamentoSistema } from "./types/IFormaPagamentoSistema";    

export class SelectFormaPagamentoSistema{


      async busca_por_descricao(db_publico:string, descricao:string ){
  
          return new Promise<IFormaPagamentoSistema[]>( async (resolve, reject)=>{
  
               let sql = ` SELECT *,
                  DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
                  DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD
               FROM ${db_publico}.cad_fpgt 
                 WHERE NOME = '${descricao}' `
   
              await conn_sistema.query( sql  ,(err:any, result:IFormaPagamentoSistema[] )=>{
                  if(err){
                    console.log(` erro ao buscar forma de pagamento  do sistema  `,err)

                      reject(err);
                  }else{
                      resolve(result);
                  }
              })
          })
      }
  
      async busca_geral(db_publico:any ){
  
          return new Promise<IFormaPagamentoSistema[]>( async (resolve, reject)=>{
  
               let sql = ` SELECT *,
                  DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
                  DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD
               FROM ${db_publico}.cad_fpgt `
   
              await conn_sistema.query( sql  ,(err:any, result:IFormaPagamentoSistema[] )=>{
                  if(err){
                    console.log(` erro ao buscar forma de pagamento  do sistema  `,err)
                      reject(err);
                  }else{
                      resolve(result);
                  }
              })
          })
      }
  

      async buscaPorCodigo(db_publico:string, codigo:number ){
  
        return new Promise<IFormaPagamentoSistema[]>( async (resolve, reject)=>{

             let sql = ` SELECT *,
                DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
                DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD
             FROM ${db_publico}.cad_fpgt WHERE CODIGO = ${codigo}`
 
            await conn_sistema.query( sql  ,(err:any, result:IFormaPagamentoSistema[] )=>{
                if(err){
                    console.log(` erro ao buscar forma de pagamento  do sistema  `,err)

                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }



  }