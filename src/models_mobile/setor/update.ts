import {    conn_mobie } from "../../database/databaseConfig"
import { ISetorMobile } from "./types/setor";

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
export class UpdateSetorMobile{


    async update ( empresa:any, setor:ISetorMobile):Promise<OkPacket>{

       return new Promise( async ( resolve, reject)=>{
            let {
                codigo,
                data_cadastro,
                data_recadastro,
                descricao,
            } = setor

                const sql =` UPDATE  ${empresa}.setores SET  
                                    data_cadastro = '${data_cadastro}',
                                    data_recadastro = '${data_recadastro}',
                                    descricao = '${descricao}' 
                                   where codigo = ${codigo}
                            `;
                            await conn_mobie.query(sql,   (err:any, result:any )=>{
                                if(err){
                                     console.log(err)
                                     reject(err);
                                }else{
                                    console.log(`setor atualizadao com sucesso `)
                                     resolve(result);
                                }
                            })
                        })
        }

}
 