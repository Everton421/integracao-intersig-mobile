import {   Request, Response    } from "express";
import { Select_clientes_sistema } from "../../models_sistema/cliente/select";
  import { Select_clientes_mobile } from "../../models_mobile/cliente/select";
import { databaseMobile, db_publico, db_vendas } from "../../database/databaseConfig";
import { IClienteSistema } from "../../models_sistema/cliente/types/clienteSistema";
import { IClienteMobile } from "../../models_mobile/cliente/types/IClienteMobile";
 
import { Insert_clientes_Mobile } from "../../models_mobile/cliente/insert";
import { Updata_clientes_Mobile } from "../../models_mobile/cliente/update";
    export class ClienteController{

        async main(){   
            let select_clientes_mobile =  new Select_clientes_mobile();
            let select_clientes_sistema = new Select_clientes_sistema();
            let  insert_clientes_mobile = new Insert_clientes_Mobile();
            let update_clientes_mobile = new Updata_clientes_Mobile();

               

                let clientesSistema:IClienteSistema[];

                 clientesSistema = await select_clientes_sistema.buscaTodos(db_publico );
                 
                 if(clientesSistema.length > 0 ){
                         for(let i of clientesSistema ){
                             let validClienteMobile:IClienteMobile[];

                             validClienteMobile = await select_clientes_mobile.buscaPorcodigo(databaseMobile, i.CODIGO);
                            if( i.DATA_RECAD === null ) i.DATA_RECAD = '0000-00-00 00:00:00'
                             let objInsertMobile:any =
                             {
                                 codigo:i.CODIGO, 
                                 id: i.CODIGO,
                                 celular : i.CELULAR, 
                                 nome: i.NOME ,
                                 cep :i.CEP,
                                 endereco:i.ENDERECO ,
                                 ie: i.RG,
                                 numero: i.NUMERO,
                                 cnpj: i.CPF,
                                 cidade:i.CIDADE ,
                                 data_cadastro:i.DATA_CADASTRO ,
                                 data_recadastro: i.DATA_RECAD,
                                 vendedor:i.VENDEDOR,
                                 bairro:i.BAIRRO,
                                 estado:i.ESTADO
                             }
                             let clienteV:any = validClienteMobile[0]

                                        if( validClienteMobile.length > 0 ){
                                            if( clienteV.data_recadastro !== null &&  i.DATA_RECAD !== null &&  i.DATA_RECAD > clienteV.data_recadastro ){
                                             try{ 
                                                console.log(` atualizando cliente : ${i.CODIGO} `,i.DATA_RECAD ,'>', clienteV.data_recadastro )
                                             
                                                   await update_clientes_mobile.updateCodigoSistema(databaseMobile, objInsertMobile)
                                              }catch(e){ console.log(e)}
                                                
                                            }else{
                                                console.log(`O cliente codigo: ${i.CODIGO} se encontra atualizado `, i.DATA_RECAD > clienteV.data_recadastro)
                                                continue
                                            }
                                        }else{
                                            try{ 
                                                console.log(` Cadastrando cliente : ${i.CODIGO} `  )
                                              let aux =  await insert_clientes_mobile.cadastrarCodigoSistema(databaseMobile, objInsertMobile)
                                               console.log(aux)
                                        }catch(e){ console.log(e)}

                                        }
                         }
                 }
       
       
        }



    } 