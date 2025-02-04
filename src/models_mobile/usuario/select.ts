import { conn_mobie } from "../../database/databaseConfig";
import { IUsuario } from "../../models_sistema/usuarios/types/IUsuario";

export class SelectUsuariosMobile{


    async   buscaPorCodigo(empresa:any, codigo:number)   {
        return new Promise <IUsuario[]> ( async ( resolve , reject ) =>{
 
        let sql = ` select * 
        from ${empresa}.usuarios where codigo = ? `
            await conn_mobie.query(sql, [ codigo], (err:any, result:IUsuario[]  )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }

 
}