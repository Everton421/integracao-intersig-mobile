import { conn_mobie   } from "../../database/databaseConfig";
import { IUsuario } from "../../models_sistema/usuarios/types/IUsuario";

    
    
    export class InsertUsuarioMobile{

    async cadastrarCodigoSistema( empresa:string, usuario:IUsuario  ){
        return new Promise( async (resolve, reject )=>{
            
            let sql = `
                    INSERT INTO ${empresa}.usuarios 
                    (
                    codigo, 
                    nome,
                    senha,
                    email,
                    cnpj,
                    responsavel
                    ) VALUES
                    ( ?, ?, ?, ?, ?, ?); `;

            const values = [usuario.codigo, usuario.nome,usuario.senha, usuario.email, empresa , 'S']

            await conn_mobie.query( sql , values,(err:any, result:any )=>{
                if(err){
                    console.log(' erro ao cadastrar usuario no banco mobile ',err)
                    reject(err);
                }else{
                    resolve(result);
                }
            })  
        })
    }

} 
