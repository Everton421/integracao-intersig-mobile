


import {    conn_mobie, conn_sistema, db_estoque } from "../../database/databaseConfig"

type OkPacket = {
  fieldCount: number,
  affectedRows: number,
  insertId: number,
  serverStatus: number,
  warningCount: number,
  message: string,
  protocol41: boolean,
  changedRows: number
}
export class UpdateSetorSistema{


    async update (  setor:{CODIGO:number, NOME:string}):Promise<OkPacket>{

       return new Promise( async ( resolve, reject)=>{
       
                const sql =` UPDATE  ${db_estoque}.setores SET  
                                        NOME = '${setor.NOME}'
                                   where CODIGO = ${setor.CODIGO}
                            `;


                            await conn_sistema.query(sql,   (err:any, result:any )=>{
                                if(err){
                                     console.log(err)
                                     reject(err);
                                }else{
                                    console.log(`setor Cód(${setor.CODIGO}) atualizado com sucesso no sistema `)
                                     resolve(result);
                                }
                            })
                        })
        }

}
 