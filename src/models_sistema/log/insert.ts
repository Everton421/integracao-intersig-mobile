import { conn_sistema, db_vendas } from "../../database/databaseConfig";
import { ILogSistema } from "./types/IlogSistema";

type log = Omit<ILogSistema, 'CODIGO'> 

export class InsertLogSistema{
    
    async insert(log:log){

       return new Promise( async ( resolve, reject)=>{

            const sql = ` INSERT INTO ${db_vendas}.log 
                    (
                    APELIDO,
                    COMPUTADOR,
                    DATA,
                    HORA,
                    ACAO,
                    HISTORICO,
                    IP_CPU
                    ) VALUES(
                    '${log.APELIDO}',
                    '${log.COMPUTADOR}',
                    '${log.DATA}',
                    '${log.HORA}',
                    '${log.ACAO}',
                    '${log.HISTORICO}',
                    '${log.IP_CPU}' 
                     )
            `
                            await conn_sistema.query(sql,   (err:any, result:any )=>{
                                if(err){
                                     console.log(err)
                                     reject(err);
                                }else{
                                    console.log(`log registrado com sucesso`)
                                     resolve(result);
                                }
                            })
                        })
    }
}