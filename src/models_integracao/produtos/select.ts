
import { conn_sistema,  db_estoque,  db_integracao_mobile, db_publico } from "../../database/databaseConfig"   
import { IPedidoMobile } from "../../models_mobile/pedido/types/IPedidoMobile"

export class SelectProdutoIntegracao{


    async findAll() {
                  return new Promise ( async (resolve, reject)=>{
          
                       let sql = ` 
                        SELECT  
                        p.CODIGO codigo,  
                        COALESCE(  ps.ESTOQUE,0 ) AS  estoque,
                        COALESCE(   ROUND(pp.preco,2 ),  0.00 ) as preco,
                        COALESCE( p.GRUPO, 0) as grupo, 
                        p.DESCRICAO descricao, 
                        p.NUM_FABRICANTE num_fabricante,
                        p.NUM_ORIGINAL num_original,
                        p.OUTRO_COD sku,
                        p.MARCA marca,
                        p.ATIVO ativo,
                        p.TIPO tipo,
                        cf.NCM class_fiscal,
                        p.ORIGEM origem,
                        p.CST cst,
                        DATE_FORMAT(pp.DATA_RECAD, '%Y-%m-%d %H:%i:%s') data_recadastro_preco,
                        DATE_FORMAT(p.DATA_CADASTRO, '%Y-%m-%d') AS data_cadastro,
                        DATE_FORMAT(p.DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS data_recadastro,     
                        CONVERT( p.OBSERVACOES1 USING utf8) as observacoes1,
                        CONVERT( p.OBSERVACOES2 USING utf8) as observacoes2,
                        CONVERT( p.OBSERVACOES3 USING utf8) as observacoes3
                        
                            FROM   ${db_publico}.cad_prod p 
                                    join ${db_integracao_mobile}.produtos pm  on pm.codigo_sistema = p.codigo
                                left join  ${db_estoque}.prod_setor ps on ps.produto = p.codigo
                                left join  ${db_estoque}.setores s on ps.setor = s.codigo
                                left join  ${db_publico}.prod_tabprecos pp on pp.produto = p.codigo
                                left join  ${db_publico}.tab_precos tp on tp.codigo = pp.tabela
                                left join  ${db_publico}.class_fiscal cf on cf.codigo = p.class_fiscal

                       `
           
                      await conn_sistema.query( sql  ,(err:any, result:any )=>{
                          if(err){
                            console.log(` erro ao buscar produto do banco da api  `,err)
        
                              reject(err);
                          }else{
                              resolve(result);
                          }
                      })
                  })
    }

        async findByCodeMobile(codigo:number) {
                  return new Promise ( async (resolve, reject)=>{
          
                       let sql = ` SELECT * 
                       FROM ${db_integracao_mobile}.produtos pm 
                       join ${db_publico}.cad_prod cp 
                       on cp.CODIGO = pm.codigo_sistema
                       where codigo_mobile=${codigo}  `
           
                      await conn_sistema.query( sql  ,(err:any, result:any )=>{
                          if(err){
                            console.log(` erro ao buscar produto do banco da api `,err)
        
                              reject(err);
                          }else{
                              resolve(result);
                          }
                      })
                  })
    }

  
}