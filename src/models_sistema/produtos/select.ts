import { conn_mobie, db_estoque, db_publico } from "../../database/databaseConfig"
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
            and p.no_site = 'S'
            group by  p.CODIGO
            order by p.CODIGO
        `
        await conn_mobie.query(sql,  (err:any, result:IProdutoSistema[] )=>{
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
/*  
async   buscaUltimoCodigoInserido(empresa:any )   {
    return new Promise <any> ( async ( resolve , reject ) =>{

    let sql = ` select MAX(codigo) as codigo  from ${empresa}.produtos `
        await conn_mobie.query(sql,   (err:any, result:any[] )=>{
            if (err)  reject(err); 
              resolve(result[0])
        })
     })
}
async   buscaPorCodigo(empresa:any, codigo:number)   {
    return new Promise <Produto[]> ( async ( resolve , reject ) =>{

    let sql = `
     select 
        *,
             DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
    DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro,
         CONVERT(observacoes1 USING utf8) as observacoes1,
         CONVERT(observacoes2 USING utf8) as observacoes2,
         CONVERT(observacoes3 USING utf8) as observacoes3
    from ${empresa}.produtos where codigo = ? `
        await conn_mobie.query(sql, [    codigo], (err:any, result:Produto[] )=>{
            if (err)  reject(err); 
              resolve(result)
        })
     })
}

async buscaPorCodigoDescricao(empresa:any, codigo:number, descricao:string){

if(!codigo) codigo = 0; 
if(!descricao) descricao = '';
 

const sql = `SELECT *, 
      DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
    DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro,
              CONVERT(observacoes1 USING utf8) as observacoes1,
              CONVERT(observacoes2 USING utf8) as observacoes2,
              CONVERT(observacoes3 USING utf8) as observacoes3

        FROM ${empresa}.produtos 
        WHERE  codigo like ? OR descricao = ?    `;
return new Promise<Produto[]>( async (resolve,reject)=>{
    await conn_mobie.query( sql,[ codigo, descricao ], (err:any, result:any)=>{
        if(err){ 
              reject(err)
        }else{
             resolve(result)
             }
    } )
})
}

async buscaPorCodigoOuDescricao(empresa:any, parametro:string){

const sql = `SELECT *, 
      DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
    DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro,
              CONVERT(observacoes1 USING utf8) as observacoes1,
              CONVERT(observacoes2 USING utf8) as observacoes2,
              CONVERT(observacoes3 USING utf8) as observacoes3

        FROM ${empresa}.produtos 
        WHERE  codigo like ? OR descricao = ?    `;
return new Promise<Produto[]>( async (resolve,reject)=>{
    await conn_mobie.query( sql,[  parametro , parametro], (err:any, result:any)=>{
        if(err){ 
              reject(err)
        }else{
             resolve(result)
             }
    } )
})
}

*/
}