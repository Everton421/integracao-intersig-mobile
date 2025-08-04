import { conn_sistema, db_integracao_mobile } from "../../database/databaseConfig";
import { IConfig } from "./types/IConfig";

 export class SelectConfig{

    async selectConfig(){
     return new Promise <IConfig[]> ( async ( resolve , reject ) =>{
                let sql = ` SELECT * from ${db_integracao_mobile}.configuracoes where codigo = 1;`;

                   await conn_sistema.query(sql , (err:any, result:IConfig[] )=>{
                                 if (err)  reject(err); 
                                   resolve(result)
                             })
          })
    }
 }