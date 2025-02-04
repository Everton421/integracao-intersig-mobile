"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectProdutosSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectProdutosSistema {
    async buscaGeral(estoque, publico) {
        return new Promise(async (resolve, reject) => {
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
        `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log('erro ao inserir produto ', err);
                    console.log(sql);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.SelectProdutosSistema = SelectProdutosSistema;
