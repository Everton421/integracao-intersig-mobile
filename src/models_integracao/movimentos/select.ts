import { conn_sistema, db_integracao_mobile } from "../../database/databaseConfig"
import { IMovimentosIntegracao } from "./types/IMovimentosIntegracao";

export class SelectMovimentosIntegracao{

    async findByIdMobile(id_mobile:string ){
  return new Promise<IMovimentosIntegracao[]>( async (resolve, reject ) =>{

            const sql = ` SELECT * from ${db_integracao_mobile}.movimentos
                            WHERE id_mobile = ?;`
                            
     await conn_sistema.query( sql , id_mobile , (err:any ,result:IMovimentosIntegracao[])=>{
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