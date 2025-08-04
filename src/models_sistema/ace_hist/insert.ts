import { conn_sistema, db_vendas } from "../../database/databaseConfig";
import { IAceHist } from "./types/IAceHist";

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

export class InsertAceHist{

    async insert(acerto: IAceHist):Promise<OkPacket> {

            return new Promise( async ( resolve, reject)=>{
                const sql = 
                ` INSERT INTO ${db_vendas}.ace_hist 
                (
                ITEM,
                TIPO,
                HISTORICO,
                USUARIO,
                SETOR
                )   VALUES
                  (
                     ${acerto.ITEM},
                    '${acerto.TIPO}',
                    '${acerto.HISTORICO}',
                     ${acerto.USUARIO},
                     ${acerto.SETOR} 
                   )
                `


              await conn_sistema.query(sql,   (err:any, result:any )=>{
                                     if(err){
                                          console.log(err)
                                          reject(err);
                                     }else{
                                         console.log(` acerto registrado com sucesso `)
                                          resolve(result);
                                     }
                                 })
                             })
    }
}