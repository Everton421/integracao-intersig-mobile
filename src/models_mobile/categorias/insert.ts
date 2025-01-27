import { conn_mobie } from "../../database/databaseConfig"
import { ICategoriaMobile } from "./types/ICategoriaMobile";

export class Insert_Categorias{

    async cadastrar( empresa:string, categoria:ICategoriaMobile ){
        return new Promise( async (resolve, reject )=>{
            
            let sql = `
                    INSERT INTO ${empresa}.categorias ( id, data_cadastro, data_recadastro, descricao ) VALUES
                                                      ( ? , ? , ? , ? ); `;
            const values = [ categoria.id , categoria.data_cadastro, categoria.data_recadastro, categoria.descricao]

            await conn_mobie.query( sql , values,(err:any, result:any )=>{
                if(err){
                    reject(err);
                    console.log(err)
                }else{
                    resolve(result);
                }
            })  
        })
    }
}