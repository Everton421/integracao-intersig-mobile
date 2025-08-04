import { conn_sistema, db_estoque } from "../../database/databaseConfig"
import { IProdutoSetorMobile } from "../../models_mobile/produto_setor/types/IProduto-setor-mobile";
import { IProdutoMobile } from "../../models_mobile/produtos/types/IProdutoMobile";
import { IProd_setor } from "./types/IProd_setor"

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

export class UpdateProdSetorSistema{
    
    async update(prod_setor:IProdutoSetorMobile):Promise<OkPacket>{
           return new Promise ( async(resolve, reject ) =>{

                    const sql =` update ${db_estoque}.prod_setor  
                             set
                            ESTOQUE = ${prod_setor.estoque},
                            LOCAL1_PRODUTO = '${prod_setor.local1_produto}',
                            LOCAL2_PRODUTO = '${prod_setor.local2_produto}',
                            LOCAL3_PRODUTO = '${prod_setor.local3_produto}',
                            DATA_RECAD = '${prod_setor.data_recadastro}',
                            LOCAL_PRODUTO = '${prod_setor.local_produto}',
                            LOCAL4_PRODUTO = '${prod_setor.local4_produto}' 
                            where produto = ${prod_setor.produto} and setor = ${prod_setor.setor}
                         `
        
                    await conn_sistema.query(sql, (err:any, result:any )=>{
                        if(err){
                            console.log(`erro ao atualizar prod_setor produto:${prod_setor.produto}`, err)
                            console.log(sql)
                            reject(err)
                        }else{
                            resolve(result)
                        }
                    })  
                })
    }
}