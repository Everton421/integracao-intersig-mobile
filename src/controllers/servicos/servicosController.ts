import { databaseMobile, db_publico } from "../../database/databaseConfig";
import { InsertServicoMobile } from "../../models_mobile/servicos/insert";
import { SelectServicosMobile } from "../../models_mobile/servicos/select";
import { IServicosMobile } from "../../models_mobile/servicos/types/IServicosMobile";
import { UpdateServicosMobile } from "../../models_mobile/servicos/update";
import { SelectServicosSistema } from "../../models_sistema/servicos/select";
import { TiraCaracteres } from "../../services/tiraCaracteres";

export class ServicoController{
    async main(){
            const selectServicoSistema = new SelectServicosSistema();
            const selectServicoMobile = new SelectServicosMobile();
            const updateServicoMobile = new UpdateServicosMobile();
            const insertServicoMobile = new InsertServicoMobile();
            const objTiraAspas        = new TiraCaracteres();


                let servicosSistema = await selectServicoSistema.busca(db_publico);

                    if(servicosSistema.length > 0 ){
                        let validServico = servicosSistema[0];

                        for(let i of servicosSistema){
           
                                    let servicoMobile = await selectServicoMobile.buscaPorId(databaseMobile, i.CODIGO)
                                    let validServicoMobile = servicoMobile[0]

                                               if(!i.DATA_RECAD  || i.DATA_RECAD === null ){
                                                   i.DATA_RECAD  = '0000-00-00 00:00:00';
                                               } 
                                               if(!i.DATA_CADASTRO || i.DATA_CADASTRO === null ){
                                                i.DATA_CADASTRO = '0000-00-00 00:00:00';
                                            } 
                                                 i.APLICACAO = objTiraAspas.normalizeString(i.APLICACAO);
 
                                          let objInsert:IServicosMobile = {
                                            codigo:i.CODIGO,
                                            id:i.CODIGO,
                                            valor:i.VALOR,
                                            aplicacao:i.APLICACAO,
                                            tipo_serv:i.TIPO_SERV,
                                            data_cadastro:i.DATA_CADASTRO,
                                            data_recadastro:i.DATA_RECAD,
                                          }
           
                                           if( servicoMobile.length > 0 ){
           
                                               if( i.DATA_RECAD >  validServicoMobile.data_recadastro){
                                                   //update
                                                  try{
                                                       console.log('atualizando servico: ',i.CODIGO )
                                                      await  updateServicoMobile.updateCodigoSistema(databaseMobile, objInsert)
                                                    }catch(e){ console.log(e)}
                                                }else{
                                                  console.log('o produto codigo: ',i.CODIGO, ' se encontra atualizado',  i.DATA_RECADASTRO ,' > ',  validServicoMobile.data_recadastro )
                                                   continue;
                                               }
                                          }else{
                                                   console.log('cadastrando servico: ',i.CODIGO )
                                          //cadastrar
                                          try{
                                           await insertServicoMobile.insertCodigoSistema(databaseMobile, objInsert)
                                        }catch(e){ console.log(e)}
           
                                          } 
                        }

                    }
    }
}