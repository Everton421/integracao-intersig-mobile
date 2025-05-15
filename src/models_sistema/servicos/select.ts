import { conn_sistema } from "../../database/databaseConfig";
import { IServicosSistema } from "./types/IServicosSistema";

export class SelectServicosSistema{
     
    async  busca(publico:any ){
            return new Promise<IServicosSistema[]>( async (resolve, reject ) =>{
                const sql = `SELECT
                                *,
                                     DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO 
                 -- DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD
                     FROM ${publico}.cad_serv WHERE ATIVO = 'S' AND NO_SITE = 'S';`

                await conn_sistema.query( sql ,(err:any ,result:IServicosSistema[])=>{
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