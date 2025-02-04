import { conn_mobie } from "../../database/databaseConfig"
import { Produto } from "./interface_produto"
import { IProdutoMobile } from "./types/IProdutoMobile"

export class SelectProdutosMobile{

    async   buscaPorCodigo(empresa:any, codigo:number)   {
        return new Promise <IProdutoMobile[]> ( async ( resolve , reject ) =>{
 
        let sql = `
         select 
            *,
                 DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
        DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro,
             CONVERT(observacoes1 USING utf8) as observacoes1,
             CONVERT(observacoes2 USING utf8) as observacoes2,
             CONVERT(observacoes3 USING utf8) as observacoes3
        from ${empresa}.produtos where codigo = ? `
            await conn_mobie.query(sql, [    codigo], (err:any, result:IProdutoMobile[] )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }
    async   buscaPorId(empresa:any, id:any)   {
        return new Promise <IProdutoMobile[]> ( async ( resolve , reject ) =>{
 
        let sql = `
         select 
            *,
                 DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
        DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro,
             CONVERT(observacoes1 USING utf8) as observacoes1,
             CONVERT(observacoes2 USING utf8) as observacoes2,
             CONVERT(observacoes3 USING utf8) as observacoes3
        from ${empresa}.produtos where id = ? `
            await conn_mobie.query(sql, [ id ], (err:any, result:IProdutoMobile[] )=>{
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
    return new Promise<IProdutoMobile[]>( async (resolve,reject)=>{
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
    return new Promise<IProdutoMobile[]>( async (resolve,reject)=>{
        await conn_mobie.query( sql,[  parametro , parametro], (err:any, result:any)=>{
            if(err){ 
                  reject(err)
            }else{
                 resolve(result)
                 }
        } )
    })
}

async   buscaGeral(empresa:any )   {
    return new Promise <IProdutoMobile[]> ( async ( resolve , reject ) =>{
        let sql = ` select 
        *,
        DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
        DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro, 
             CONVERT(observacoes1 USING utf8) as observacoes1,
             CONVERT(observacoes2 USING utf8) as observacoes2,
             CONVERT(observacoes3 USING utf8) as observacoes3
        from ${empresa}.produtos  `
        await conn_mobie.query(sql,  (err:any, result:IProdutoMobile[] )=>{
            if (err)  reject(err); 
              resolve(result)
        })
     })
}

async   buscaUltimoCodigoInserido(empresa:any )   {
    return new Promise <any> ( async ( resolve , reject ) =>{

    let sql = ` select MAX(codigo) as codigo  from ${empresa}.produtos `
        await conn_mobie.query(sql,   (err:any, result:any[] )=>{
            if (err)  reject(err); 
              resolve(result[0])
        })
     })
}

}