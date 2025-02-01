import { conn_mobie } from "../../database/databaseConfig"
import { IServicosMobile } from "./types/IServicosMobile"

export class UpdateServicosMobile{

     async update(empresa:string, servico:IServicosMobile){
         return new Promise ( async(resolve, reject ) =>{
 
             const sql =` update ${empresa}.servicos  
                      set
                    id =${servico.codigo},
                    valor =${servico.valor},
                    aplicacao =${servico.aplicacao},
                    tipo_serv =${servico.tipo_serv},
                    data_cadastro =${servico.data_cadastro},
                    data_recadastro =${servico.data_recadastro}  
                  where id = '${servico.codigo}'
                  )`
 
             await conn_mobie.query(sql, (err:any, result:any )=>{
                 if(err){
                     console.log(`erro ao atualizar servico ${servico.codigo}`)
                     console.log(sql)
                     reject(err)
                 }else{
                     reject(result)
                 }
             })  
         })
     }


     async updateCodigoSistema(empresa:string, servico:IServicosMobile){
        return new Promise ( async(resolve, reject ) =>{

            const sql =` update ${empresa}.servicos  
                     set
                     codigo= ${servico.codigo},
                   id =${servico.codigo},
                   valor =${servico.valor},
                   aplicacao =${servico.aplicacao},
                   tipo_serv =${servico.tipo_serv},
                   data_cadastro =${servico.data_cadastro},
                   data_recadastro =${servico.data_recadastro}  
                 where codigo = '${servico.codigo}'
                 )`

            await conn_mobie.query(sql, (err:any, result:any )=>{
                if(err){
                    console.log(`erro ao atualizar servico ${servico.codigo}`)
                    console.log(sql)
                    reject(err)
                }else{
                    reject(result)
                }
            })  
        })
    }
 }