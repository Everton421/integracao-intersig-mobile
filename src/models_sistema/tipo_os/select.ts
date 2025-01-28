import { conn_mobie } from "../../database/databaseConfig";
import { ITipoOsSistema } from "./types/ITipoOsSistema";

export class SelectTiposOsSistema{

    async   busca(empresa:any  )   {
        return new Promise <ITipoOsSistema[]> ( async ( resolve , reject ) =>{
 
        let sql = ` select *
        from ${empresa}.tipos_os`
            await conn_mobie.query(sql,  (err:any, result:ITipoOsSistema[]  )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }

  
}