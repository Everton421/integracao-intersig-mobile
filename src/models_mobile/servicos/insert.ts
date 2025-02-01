import { conn_mobie } from "../../database/databaseConfig"

export class InsertServicoMobile{

    async insert ( empresa:any, servico:any){

       return new Promise( async ( resolve, reject)=>{
            let {
                codigo,
                id,
                valor,
                aplicacao,
                tipo_serv,
                data_cadastro,
                data_recadastro,
                    } = servico
                    if( !data_cadastro || data_cadastro === null ){
                        data_cadastro = '0000-00-00'
                    }
                    if(!data_recadastro || data_recadastro === null ){
                        data_recadastro = '0000-00-00 00:00:00'
                    }

                const sql =` INSERT INTO  ${empresa}.servicos  
                             (
                            id,
                            valor ,
                            aplicacao,
                            tipo_serv,
                            data_cadastro,
                            data_recadastro 
                                ) VALUES (
                                     ${id},
                                     ${valor},
                                    '${aplicacao}',
                                    ${tipo_serv},
                                   '${data_cadastro}',
                                   '${data_recadastro}' 
                                  )
                            `;

                let dados = [  id ,valor, aplicacao, tipo_serv, data_cadastro, data_recadastro]
                            await conn_mobie.query(sql,   (err:any, result:any )=>{
                                if(err){
                                     console.log(err)
                                     reject(err);
                                }else{
                                    console.log(`servico cadastrado com sucesso `)
                                     resolve(result);
                                }
                            })
                        })
        }
        async insertCodigoSistema ( empresa:any, servico:any){

            return new Promise( async ( resolve, reject)=>{
                 let {
                     codigo,
                     id,
                     valor,
                     aplicacao,
                     tipo_serv,
                     data_cadastro,
                     data_recadastro,
                         } = servico
                         if( !data_cadastro || data_cadastro === null ){
                             data_cadastro = '0000-00-00'
                         }
                         if(!data_recadastro || data_recadastro === null ){
                             data_recadastro = '0000-00-00 00:00:00'
                         }
     
                     const sql =` INSERT INTO  ${empresa}.servicos  
                                  (
                                codigo,
                                 id,
                                 valor ,
                                 aplicacao,
                                 tipo_serv,
                                 data_cadastro,
                                 data_recadastro 
                                     ) VALUES (
                                       ${codigo},
                                          ${id},
                                          ${valor},
                                         '${aplicacao}',
                                         ${tipo_serv},
                                        '${data_cadastro}',
                                        '${data_recadastro}' 
                                       )
                                 `;
     
                     let dados = [  codigo, id ,valor, aplicacao, tipo_serv, data_cadastro, data_recadastro]
                                 await conn_mobie.query(sql,   (err:any, result:any )=>{
                                     if(err){
                                          console.log(err)
                                          reject(err);
                                     }else{
                                         console.log(`servico ${codigo} cadastrado com sucesso `)
                                          resolve(result);
                                     }
                                 })
                             })
             }
}
 