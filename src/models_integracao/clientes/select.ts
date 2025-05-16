
import { conn_sistema,  db_integracao_mobile, db_publico } from "../../database/databaseConfig"   
import { IPedidoMobile } from "../../models_mobile/pedido/types/IPedidoMobile"

export class SelectClienteIntegracao{


    async findAll() {
                  return new Promise ( async (resolve, reject)=>{
          
                       let sql = ` SELECT * 
                       FROM ${db_integracao_mobile}.clientes cm 
                       join ${db_publico}.cad_clie cl 
                       on cl.CODIGO = cm.codigo_sistema`
           
                      await conn_sistema.query( sql  ,(err:any, result:any )=>{
                          if(err){
                            console.log(` erro ao buscar cliente do banco da api  `,err)
        
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
                       FROM ${db_integracao_mobile}.clientes  cm 
                       join ${db_publico}.cad_clie cl 
                       on cl.CODIGO = cm.codigo_sistema
                       where codigo_mobile=${codigo}  `
           
                      await conn_sistema.query( sql  ,(err:any, result:any )=>{
                          if(err){
                            console.log(` erro ao buscar cliente do banco da api `,err)
        
                              reject(err);
                          }else{
                              resolve(result);
                          }
                      })
                  })
    }

  
}