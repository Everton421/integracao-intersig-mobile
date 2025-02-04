import { conn_sistema, db_publico } from "../../database/databaseConfig";
import { IUsuario } from "./types/IUsuario";

export class SelectUsuariosSistema{

    async select(){

                 return new Promise<IUsuario[]>( async (resolve, reject ) =>{
                        const sql = `SELECT
                                        CODIGO codigo,
                                         NOME nome,
                                         EMAIL email,
                                         SENHA_WEB senha_web
                             FROM ${db_publico}.cad_vend WHERE ATIVO = 'S';`
        
                        await conn_sistema.query( sql ,(err:any ,result:IUsuario[])=>{
                            if( err ){
                                console.log(' erro ao consultar usuarios do sistema',err);
                                reject(err);
                            }else{
                                resolve(  result )
                            }
                        });
            
                     })
    }
}