import { conn_mobie } from "../../database/databaseConfig"
import { ICategoriaMobile } from "./types/ICategoriaMobile";

export class Insert_Categorias{


// cadastra categorai utilizando o autoincrement do banco mobile 

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
// cadastra categorai utilizando o codigo do sitema 
    async cadastrarCodigoSistema( empresa:string, categoria:ICategoriaMobile ){
        return new Promise( async (resolve, reject )=>{
            
            let sql = `
                    INSERT INTO ${empresa}.categorias ( codigo ,id , data_cadastro, data_recadastro, descricao ) VALUES
                                                      (?,  ? , ? , ? , ? ); `;
            const values = [  categoria.codigo, categoria.codigo , categoria.data_cadastro, categoria.data_recadastro, categoria.descricao]

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