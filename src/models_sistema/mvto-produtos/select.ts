import { conn_sistema, db_vendas } from "../../database/databaseConfig";


export class SelectMvtoProdutosSistema{

    async findByMvtoKey( chave:number ){
  return new Promise<any[]>( async (resolve, reject ) =>{
        
                        const sql = `SELECT
                                    *,
                        DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD 
                        FROM ${db_vendas}.mvto_produtos
                        where chave_mvto = ? 
                        `

                        await conn_sistema.query( sql ,[ chave] , (err:any ,result:any[])=>{
                            if( err ){
                                console.log(err);
                                reject(err);
                            }else{
                                resolve(  result )
                            }
                        });
            
                    })
    }
}