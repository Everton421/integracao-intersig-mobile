import { conn_mobie } from "../../database/databaseConfig";

export class SelectVeiculosMobile{

 
    async   buscaPorId(empresa:any, id:number)   {
        return new Promise  <IVeiculoMobile[]>( async ( resolve , reject ) =>{
 
        let sql = ` select *,
          DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
        from ${empresa}.veiculos where id = ? `
            await conn_mobie.query(sql, [ id], (err:any, result:IVeiculoMobile[]  )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }


    async   buscaPorCodigo(empresa:any, codigo:number)   {
      return new Promise  <IVeiculoMobile[]>( async ( resolve , reject ) =>{

      let sql = ` select *,
        DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
          DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
      from ${empresa}.veiculos where codigo = ? `
          await conn_mobie.query(sql, [ codigo], (err:any, result:IVeiculoMobile[]  )=>{
              if (err)  reject(err); 
                resolve(result)
          })
       })
  }
}