import { conn_sistema, db_vendas } from "../../database/databaseConfig";
import { IAceHist } from "./types/IAceHist";

export class SelectAceHist{
    async fynLastCode(){


          return new Promise<[{ITEM:number}]>( async (resolve, reject)=>{
            const sql = ` select max(ITEM) as ITEM from ${db_vendas}.ace_hist;`

         await conn_sistema.query( sql  ,(err:any, result: [{ITEM:number}] )=>{
                  if(err){
                    console.log(` erro ao buscar  o ultimo historico do sistema  `,err)
                      reject(err);
                  }else{
                      resolve(result);
                  }
              })
          })
    }
}