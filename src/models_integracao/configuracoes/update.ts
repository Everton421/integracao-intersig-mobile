import { conn_sistema, db_integracao_mobile } from "../../database/databaseConfig";
import { IConfig } from "./types/IConfig";

type OkPacket = {
  fieldCount: number,
  affectedRows: number,
  insertId: number,
  serverStatus: number,
  warningCount: number,
  message: string,
  protocol41: true,
  changedRows: number
} 
export class UpdateConfigIntegracao{

   async update(config:Partial<IConfig>):Promise<OkPacket>{
             return new Promise ( async(resolve, reject ) =>{
          
                      const sql =` update ${db_integracao_mobile}.configuracoes  set  `
                        let conditions:any = [ ] 
                        let values:any = [ ]

                           if( config.ultima_verificacao_estoque){
                            conditions.push(' ultima_verificacao_estoque = ? ');
                            values.push(`${config.ultima_verificacao_estoque}`)
                           }
                           if( config.importar_pedidos){
                            conditions.push(' importar_pedidos = ? ');
                            values.push(`${config.importar_pedidos}`)
                           }
                           if( config.importar_estoque){
                            conditions.push(' importar_estoque = ? ');
                            values.push(`${config.importar_estoque}`)
                           }
                           if( config.ultima_verificacao_preco){
                            conditions.push(' ultima_verificacao_preco = ? ');
                            values.push(`${config.ultima_verificacao_preco}`)
                           }
                           if( config.ultima_verificacao_pedidos){
                            conditions.push(' ultima_verificacao_pedidos = ? ');
                            values.push(`${config.ultima_verificacao_pedidos}`)
                           }

                           let whereClause = ' WHERE codigo = 1;';
                           let finalSql = sql 
                           
                           if( conditions.length > 0 ){
                                finalSql = sql + conditions.join(' , ') + whereClause
                           }

          
                      await conn_sistema.query(finalSql,values, (err:any, result:any )=>{
                          if(err){
                              console.log(`erro ao atualizar as configuracoes da integracao  `, err)
                              console.log("SQL: ",finalSql, "  VALORES: ", values)
                              reject(err)
                          }else{
                              resolve(result)
                          }
                      })  
                  })
      }
}