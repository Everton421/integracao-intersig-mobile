import { conn_sistema, db_estoque } from "../../database/databaseConfig";
import { IProd_setor } from "./types/IProd_setor";

export class SelectProdSetorSistema{
     
    async  busca(publico:any ){
            return new Promise<IProd_setor[]>( async (resolve, reject ) =>{
 
                 const sql = `SELECT
                               *,
                 DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD 
                  FROM ${db_estoque}.prod_setor
                 `

                await conn_sistema.query( sql ,(err:any ,result:IProd_setor[])=>{
                    if( err ){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(  result )
                    }
                });
    
             })
        }



        async findByProductAndSector(produto:number, setor:number){

        return new Promise<IProd_setor[]>( async (resolve, reject ) =>{
        
                        const sql = `SELECT
                                    *,
                        DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD 
                        FROM ${db_estoque}.prod_setor
                        where produto = ? and setor = ?
                        `

                        await conn_sistema.query( sql ,[ produto, setor] , (err:any ,result:IProd_setor[])=>{
                            if( err ){
                                console.log(err);
                                reject(err);
                            }else{
                                resolve(  result )
                            }
                        });
            
                    })
        }
 
           async findLastUpdated(data:string ):Promise<IProd_setor[]>{

            return new Promise<IProd_setor[]>( async (resolve, reject ) =>{
            
                            const sql = `SELECT
                                        *,
                            DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD 
                            FROM ${db_estoque}.prod_setor
                            where DATA_RECAD > ?
                            `

                            await conn_sistema.query( sql ,data, (err:any ,result:IProd_setor[])=>{
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