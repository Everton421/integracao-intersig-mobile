
import { conn_sistema,  db_estoque,  db_integracao_mobile, db_publico } from "../../database/databaseConfig"   
import { IPedidoMobile } from "../../models_mobile/pedido/types/IPedidoMobile"

export class SelectServicoIntegracao{


    async findAll() {
                  return new Promise ( async (resolve, reject)=>{
          
                       let sql = ` 
                        SELECT  
                        *,
                        DATE_FORMAT(cs.DATA_CADASTRO, '%Y-%m-%d') AS data_cadastro 
                            FROM   ${db_publico}.cad_serv cs 
                                    join ${db_integracao_mobile}.servicos sm  on sm.codigo_sistema = cs.codigo
                       `
           
                      await conn_sistema.query( sql  ,(err:any, result:any )=>{
                          if(err){
                            console.log(` erro ao buscar servicos do banco da api  `,err)
        
                              reject(err);
                          }else{
                              resolve(result);
                          }
                      })
                  })
    }

        async findByCodeMobile(codigo:number) {
                  return new Promise ( async (resolve, reject)=>{
          
                       let sql = ` SELECT * 
                       FROM ${db_integracao_mobile}.servicos sm 
                       join ${db_publico}.cad_serv cs 
                       on cs.CODIGO = sm.codigo_sistema
                       where codigo_mobile=${codigo}  `
           
                      await conn_sistema.query( sql  ,(err:any, result:any )=>{
                          if(err){
                            console.log(` erro ao buscar servico  do banco da api `,err)
        
                              reject(err);
                          }else{
                              resolve(result);
                          }
                      })
                  })
    }

  
}