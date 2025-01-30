 
import { conn_sistema, db_integracao_mobile } from "../../database/databaseConfig"   
import { paramPedido } from "./types/paramPedido"


 
export class InsertParamPedidosMobile{

    async   cadastrar(  paramPedido:paramPedido )   {
        return new Promise  ( async ( resolve , reject ) =>{
        let sql =
         `  
            insert into ${db_integracao_mobile}.pedidos
            (
            codigo_sistema,
            codigo_mobile,
            excluido
            )values(
            '${paramPedido.codigo_sistema}',
            '${paramPedido.codigo_mobile}',
            '${paramPedido.excluido}'
            )
            `   
             
             await conn_sistema.query(sql,  (err:any, result:any[] )=>{
                if (err) {
                  console.log(err)
                  reject(err);
                }else{ 
                  resolve(result)
                }
               })
         })
    }
  
    async   cadastrarPorCodigoSistema(  paramPedido:paramPedido )   {
      return new Promise  ( async ( resolve , reject ) =>{
      let sql =
       `  
          insert into ${db_integracao_mobile}.pedidos
          (
          codigo_sistema,
          codigo_mobile,
          excluido
          )values(
          ${paramPedido.codigo_sistema},
          ${paramPedido.codigo_mobile},
          ${paramPedido.excluido}
          where codigo_sistema = ${paramPedido.codigo_sistema}
          )
          `   
           
           await conn_sistema.query(sql,  (err:any, result:any[] )=>{
              if (err) {
                console.log(err)
                reject(err);
              }else{ 
                resolve(result)
              }
             })
       })
  }

}

