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

export class InsertProdSetorSistema{
    
    async insert(prod_setor:IProdutoSetorMobile):Promise<OkPacket>{
           return new Promise ( async(resolve, reject ) =>{
        
                const {
                    
                } = prod_setor;

            const sql =` INSERT INTO ${db_estoque}.prod_setor      
                           (  SETOR,
                            PRODUTO,
                            ESTOQUE,
                            LOCAL1_PRODUTO,
                            LOCAL2_PRODUTO,
                            LOCAL3_PRODUTO,
                            DATA_RECAD,
                            LOCAL_PRODUTO,
                            LOCAL4_PRODUTO 
                               )values(
                             ${prod_setor.setor},
                             ${prod_setor.produto},  
                             ${prod_setor.estoque},
                            '${prod_setor.local1_produto}',
                            '${prod_setor.local2_produto}',
                            '${prod_setor.local3_produto}',
                            '${prod_setor.data_recadastro}',
                            '${prod_setor.local_produto}',
                            '${prod_setor.local4_produto}' 
                        )
                         `
        
                    await conn_sistema.query(sql, (err:any, result:any )=>{
                        if(err){
                            console.log(`erro ao inserir produto:${prod_setor.produto} na tabela prod_setor `, err)
                            console.log(sql)
                            reject(err)
                        }else{
                            resolve(result)
                        }
                    })  
                })
    }
}