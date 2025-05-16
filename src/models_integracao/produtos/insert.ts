import { conn_sistema, db_integracao_mobile } from "../../database/databaseConfig"


type param = {
codigo_sistema:number
codigo_mobile:number
excluido:string
}

export class InsertProdutoIntegracao{


  async   cadastrar(  paramPedido:param )   {
        return new Promise  ( async ( resolve , reject ) =>{
        let sql =
         `  
            insert into ${db_integracao_mobile}.produtos
            (
            codigo_sistema,
            codigo_mobile,
            ativo
            )values(
            '${paramPedido.codigo_sistema}',
            '${paramPedido.codigo_mobile}',
            '${paramPedido.excluido}'
            )
            `   
             
             await conn_sistema.query(sql,  (err:any, result:any[] )=>{
                if (err) {
                  console.log(`erro ao tentar inserir produto sincronizado no banco da api `,err)
                  reject(err);
                }else{ 
                  resolve(result)
                }
               })
         })
    }
  

}