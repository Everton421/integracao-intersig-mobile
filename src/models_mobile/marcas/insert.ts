import { conn_mobie } from "../../database/databaseConfig"
import { IMarcasMobile } from "./types/IMarcasMobile";

export class Insert_MarcasMobile{

    async cadastrar( empresa:string, marca:IMarcasMobile ){
        return new Promise( async (resolve, reject )=>{
            
            let sql = `
                    INSERT INTO ${empresa}.marcas ( id, data_cadastro, data_recadastro, descricao ) VALUES
                                                      ( ? , ? , ? , ? ); `;
            const values = [ marca.id , marca.data_cadastro, marca.data_recadastro, marca.descricao]

            await conn_mobie.query( sql , values,(err:any, result:any )=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })  
        })
    }
    async cadastrarCodigoSistema( empresa:string, marca:IMarcasMobile ){
        return new Promise( async (resolve, reject )=>{
            
            let sql = `
                    INSERT INTO ${empresa}.marcas (  codigo, id, data_cadastro, data_recadastro, descricao ) VALUES
                                                      (? ,? , ? , ? , ? ); `;
            const values = [marca.codigo, marca.id , marca.data_cadastro, marca.data_recadastro, marca.descricao]

            await conn_mobie.query( sql , values,(err:any, result:any )=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })  
        })
    }
}