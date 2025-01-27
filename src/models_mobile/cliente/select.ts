import { conn_mobie } from "../../database/databaseConfig";
import { IClienteMobile } from "./types/IClienteMobile";

export class Select_clientes_mobile{

    async   buscaGeral(empresa:any, vendedor:any )   {
        return new Promise <IClienteMobile[]> ( async ( resolve , reject ) =>{
  

       let sql = ` select *,
             DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
            from ${empresa}.clientes c
            WHERE c.ativo = 'S' and 
                       ( c.vendedor = ${vendedor} OR c.vendedor = 0 or c.vendedor = null)
                       order by c.vendedor    `
            await conn_mobie.query(sql,  (err:any, result:IClienteMobile[] )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }
   
    async   buscaTodos(empresa:any  )   {
      return new Promise <IClienteMobile[]> ( async ( resolve , reject ) =>{

 
     let sql = ` select *,
           DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
          DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
          from ${empresa}.clientes c
          WHERE c.ativo = 'S'`
 
 
 
          await conn_mobie.query(sql,  (err:any, result:IClienteMobile[] )=>{
              if (err)  reject(err); 
                resolve(result)
          })
       })
  }


    async   buscaPorVendedor(empresa:any, vendedor:number )   {
        return new Promise <IClienteMobile[]> ( async ( resolve , reject ) =>{
        let sql = ` SELECT *,
             DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
           FROM ${empresa}.clientes WHERE vendedor = ?  `
            await conn_mobie.query(sql, [ vendedor], (err:any, result:IClienteMobile[] )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }

    async   buscaPorcodigo(empresa:any, codigo:number )   {
        return new Promise <IClienteMobile[]> ( async ( resolve , reject ) =>{
        let sql = ` SELECT  codigo, nome, cnpj, celular ,
          DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
        FROM ${empresa}.clientes WHERE codigo = ?  `
            await conn_mobie.query(sql, [ codigo], (err:any, result:IClienteMobile[] )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }
    
    async   buscaPorId(empresa:any, id:any )   {
      return new Promise <IClienteMobile[]> ( async ( resolve , reject ) =>{
      let sql = ` SELECT  codigo, nome, cnpj, celular ,
        DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
          DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
      FROM ${empresa}.clientes WHERE id = ?  `
          await conn_mobie.query(sql, [ id], (err:any, result:IClienteMobile[] )=>{
              if (err)  reject(err); 
                resolve(result)
          })
       })
  }

    async   buscaPorCnpj(empresa:any, cnpj:any )   {
      return new Promise <IClienteMobile[]> ( async ( resolve , reject ) =>{
      let sql = ` SELECT  *,
        DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
          DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
      FROM ${empresa}.clientes WHERE cnpj = ?  `
          await conn_mobie.query(sql, [ cnpj], (err:any, result:IClienteMobile[] )=>{
              if (err)  reject(err); 
                resolve(result)
          })
       })
  }
  
  async   buscaUltimoIdInserido(empresa:any,   )   {
    return new Promise <any> ( async ( resolve , reject ) =>{
    let sql = ` SELECT MAX(codigo) as codigo FROM ${empresa}.clientes `
        await conn_mobie.query(sql,   (err:any, result:any )=>{
            if (err)  reject(err); 
              resolve(result)
        })
     })
}

}
