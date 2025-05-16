
import { conn_sistema,  db_estoque,  db_integracao_mobile, db_publico } from "../../database/databaseConfig"   
import { IPedidoMobile } from "../../models_mobile/pedido/types/IPedidoMobile"

export class SelectCategoriaIntegracao{


    async findAll() {
                  return new Promise ( async (resolve, reject)=>{
          
                       let sql = ` 
                        SELECT  
                            *,                      
                        DATE_FORMAT(pg.DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS data_recadastro   
                            FROM   ${db_publico}.cad_pgru pg 
                                    join ${db_integracao_mobile}.categorias cm  on cm.codigo_sistema = pg.codigo
               

                       `
           
                      await conn_sistema.query( sql  ,(err:any, result:any )=>{
                          if(err){
                            console.log(` erro ao buscar categoria do banco da api  `,err)
        
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
                       FROM ${db_integracao_mobile}.categorias cm 
                       join ${db_publico}.cad_pgru gr 
                       on gr.CODIGO = cm.codigo_sistema
                       where codigo_mobile=${codigo}  `
           
                      await conn_sistema.query( sql  ,(err:any, result:any )=>{
                          if(err){
                            console.log(` erro ao buscar categoria do banco da api `,err)
        
                              reject(err);
                          }else{
                              resolve(result);
                          }
                      })
                  })
    }

  
}