import { conn_sistema, db_integracao_mobile } from "../../database/databaseConfig"


type param = {
codigo_sistema:number
codigo_mobile:number
ativo:string
}

export class InsertClienteIntegracao{


  async   cadastrar(  paramPedido:param )   {
        return new Promise  ( async ( resolve , reject ) =>{
        let sql =
         `  
            insert into ${db_integracao_mobile}.clientes
            (
            codigo_sistema,
            codigo_mobile,
            ativo
            )values(
            '${paramPedido.codigo_sistema}',
            '${paramPedido.codigo_mobile}',
            '${paramPedido.ativo}'
            )
            `   
             
             await conn_sistema.query(sql,  (err:any, result:any[] )=>{
                if (err) {
                  console.log(`erro ao tentar inserir cliente sincronizado no banco da api `,err)
                  reject(err);
                }else{ 
                  resolve(result)
                }
               })
         })
    }
  

}