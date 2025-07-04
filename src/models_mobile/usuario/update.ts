import { conn_mobie  } from "../../database/databaseConfig"
import { IUsuario } from "../../models_sistema/usuarios/types/IUsuario"
 

export class UpdateUsuarioMobile{

     async update(empresa:string, usuario:IUsuario){
         return new Promise ( async(resolve, reject ) =>{
 
             const sql =` update ${empresa}.usuarios  
                      set
                            codigo='${usuario.codigo}',
                            nome='${usuario.nome}',
                            email='${usuario.email}',
                            senha='${usuario.senha}',
                            cnpj='${empresa}' 
                         where codigo = '${usuario.codigo}'
                   `
 
             await conn_mobie.query(sql, (err:any, result:any )=>{
                 if(err){
                     console.log(`erro ao atualizar usuario ${usuario.codigo}`)
                     console.log(sql)
                     reject(err)
                 }else{
                     reject(result)
                 }
             })  
         })
     }
    }