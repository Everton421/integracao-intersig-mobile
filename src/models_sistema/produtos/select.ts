import { conn_mobie, conn_sistema, db_estoque, db_publico, db_vendas } from "../../database/databaseConfig"
import { IProdutoSistema } from "./types/produtoSistema";

export class SelectProdutosSistema{



async   buscaGeral(estoque:any, publico:any)   {
    return new Promise <IProdutoSistema[]> ( async ( resolve , reject ) =>{
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
         COALESCE( p.MARCA, 0) as marca,
        p.ATIVO ativo,
        p.TIPO tipo,
        cf.NCM class_fiscal,
        p.ORIGEM origem,
        p.CST cst,
        DATE_FORMAT(p.DATA_CADASTRO, '%Y-%m-%d') AS data_cadastro,
          DATE_FORMAT(pp.DATA_RECAD, '%Y-%m-%d %H:%i:%s') data_recadastro_preco,
          DATE_FORMAT(p.DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS data_recadastro,
          DATE_FORMAT(ps.DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS data_recadastro_estoque,      
        CONVERT( p.OBSERVACOES1 USING utf8) as observacoes1,
        CONVERT( p.OBSERVACOES2 USING utf8) as observacoes2,
        CONVERT( p.OBSERVACOES3 USING utf8) as observacoes3
        
            FROM   ${publico}.cad_prod p 
                left join  ${estoque}.prod_setor ps on ps.produto = p.codigo
                left join  ${estoque}.setores s on ps.setor = s.codigo
                left join  ${publico}.prod_tabprecos pp on pp.produto = p.codigo
                left join  ${publico}.tab_precos tp on tp.codigo = pp.tabela
                left join  ${publico}.class_fiscal cf on cf.codigo = p.class_fiscal

            WHERE 
            -- s.padrao_venda = 'X' 
            -- and

            tp.padrao = 'S'
            and p.ativo = 'S'
            and p.no_site = 'S'
            group by  p.CODIGO
            order by p.CODIGO
        `
        await conn_sistema.query(sql,  (err:any, result:IProdutoSistema[] )=>{
            if (err){
                console.log('erro ao inserir produto ', err)
                console.log(sql)
                reject(err);
            } else{ 
                resolve(result)
            } 
        })
     })
}
     async buscaEstoqueRealPorSetor(codigo:number, setor:number ):Promise<[{CODIGO:number, ESTOQUE:number, DATA_RECAD:string }]>{
      return new Promise( async (resolve, reject)=>{
                            
      const sql = `
                  SELECT  
                        est.CODIGO,
                        IF(est.estoque < 0, 0, est.estoque) AS ESTOQUE,
                        est.DATA_RECAD
                      FROM 
                        (SELECT
                          P.CODIGO,
                          PS.DATA_RECAD,
                          (SUM(PS.ESTOQUE) - 
                            (SELECT COALESCE(SUM((IF(PO.QTDE_SEPARADA > (PO.QUANTIDADE - PO.QTDE_MOV), PO.QTDE_SEPARADA, (PO.QUANTIDADE - PO.QTDE_MOV)) * PO.FATOR_QTDE) * IF(CO.TIPO = '5', -1, 1)), 0)
                              FROM ${db_vendas}.cad_orca AS CO
                              LEFT OUTER JOIN ${db_vendas}.pro_orca AS PO ON PO.ORCAMENTO = CO.CODIGO
                              WHERE CO.SITUACAO IN ('AI', 'AP', 'FP')
                              AND PO.PRODUTO = P.CODIGO)) AS estoque
                        FROM ${db_estoque}.prod_setor AS PS
                        LEFT JOIN ${db_publico}.cad_prod AS P ON P.CODIGO = PS.PRODUTO
                        INNER JOIN ${db_publico}.cad_pgru AS G ON P.GRUPO = G.CODIGO
                        LEFT JOIN ${db_estoque}.setores AS S ON PS.SETOR = S.CODIGO
                        WHERE P.CODIGO = ${codigo}
                        AND PS.SETOR = ${setor}
                        GROUP BY P.CODIGO) AS est;
                  `

    await conn_sistema.query( sql ,(err:any , result:any)=>{
        if(err){
          reject(err)
          console.log('erro ao obter o saldo de estoque')
        }else{
            resolve(result);
        }
      })
      })
    }
}