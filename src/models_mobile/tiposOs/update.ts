import { conn_mobie } from "../../database/databaseConfig"
import { ITiposOsMobile } from "./types/ITiposOsMobile"
 

export class UpdateTipoOsMobile{

     async update(empresa:string, tipo_os:ITiposOsMobile){
         return new Promise ( async(resolve, reject ) =>{
 
             const sql =` update ${empresa}.tipos_os  
                      set
                            id='${tipo_os.id}',
                            descricao='${tipo_os.descricao}',
                            data_cadastro='${tipo_os.data_cadastro}',
                            data_recadastro='${tipo_os.data_recadastro}' 
                         where id = '${tipo_os.id}'
                   `
 
             await conn_mobie.query(sql, (err:any, result:any )=>{
                 if(err){
                     console.log(`erro ao atualizar tipo de os  ${tipo_os.codigo}`)
                     console.log(sql)
                     reject(err)
                 }else{
                     reject(result)
                 }
             })  
         })
     }


     async updateCodigoSistema(empresa:string, tipo_os:ITiposOsMobile){
        return new Promise ( async(resolve, reject ) =>{

            const sql =` update ${empresa}.tipos_os  
                     set
                           id='${tipo_os.codigo}',
                           id='${tipo_os.id}',
                           descricao='${tipo_os.descricao}',
                           data_cadastro='${tipo_os.data_cadastro}',
                           data_recadastro='${tipo_os.data_recadastro}' 
                        where codigo = '${tipo_os.codigo}'
                  `

            await conn_mobie.query(sql, (err:any, result:any )=>{
                if(err){
                    console.log(`erro ao atualizar tipo de os  ${tipo_os.codigo}`)
                    console.log(sql)
                    reject(err)
                }else{
                    reject(result)
                }
            })  
        })
    }
 }