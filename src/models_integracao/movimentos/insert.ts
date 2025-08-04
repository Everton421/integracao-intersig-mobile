import { conn_sistema, databaseMobile, db_integracao_mobile } from "../../database/databaseConfig";

type movimento = {
            id_mobile:number | string ,
            codigo_sistema: number | string
        }

export class InsertMovimentosIntegracao{

        
    async insert(movimento:movimento){

            return new Promise( async ( resolve, reject)=>{
                
                const sql =
                 `
                    INSERT INTO ${db_integracao_mobile}.movimentos 
                    (   
                     id_mobile,
                     codigo_sistema
                    ) VALUES(
                       '${movimento.id_mobile}',
                       '${movimento.codigo_sistema}'
                    ); ` 

        await conn_sistema.query(sql,   (err:any, result:any )=>{
                                        if(err){
                                            console.log(err)
                                            reject(err);
                                        }else{
                                            console.log(` movimento registrado com sucesso no banco de dados Da integracao `)
                                            resolve(result);
                                        }
                                    })
                                })
        }

}