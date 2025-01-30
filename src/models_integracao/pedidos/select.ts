
import { conn_sistema,  db_integracao_mobile } from "../../database/databaseConfig"   
import { IPedidoMobile } from "../../models_mobile/pedido/types/IPedidoMobile"
import { paramPedido } from "./types/paramPedido"

export class SelectIntegracao{
    async validaPedido(codigoPedidoMobile:number):Promise<paramPedido>{
                  return new Promise ( async (resolve, reject)=>{
          
                       let sql = ` SELECT * 
                       FROM ${db_integracao_mobile}.pedidos where codigo_mobile=${codigoPedidoMobile} `
           
                      await conn_sistema.query( sql  ,(err:any, result:any )=>{
                          if(err){
                            console.log(` erro ao buscar marcas  do sistema  `,err)
        
                              reject(err);
                          }else{
                              resolve(result);
                          }
                      })
                  })
    }
}