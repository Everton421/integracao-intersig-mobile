import { conn_sistema } from "../../database/databaseConfig";
import { IVeiculoSistema } from "./types/IVeiculoSistema";

export class SelectVeiculosSistema{
     
    async  busca(publico:any ){
            return new Promise<IVeiculoSistema[]>( async (resolve, reject ) =>{
                const sql = `SELECT
                                *,
                                     DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO 
                 -- DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD
                     FROM ${publico}.cad_veic;`

                await conn_sistema.query( sql ,(err:any ,result:IVeiculoSistema[])=>{
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