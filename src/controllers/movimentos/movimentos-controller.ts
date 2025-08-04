import { databaseMobile } from "../../database/databaseConfig";
import { SelectConfig } from "../../models_integracao/configuracoes/select";
import { IConfig } from "../../models_integracao/configuracoes/types/IConfig";
import { InsertMovimentosIntegracao } from "../../models_integracao/movimentos/insert";
import { SelectMovimentosIntegracao } from "../../models_integracao/movimentos/select";
import { SelectMovimentosProdutosMobile } from "../../models_mobile/movimentos-produtos/select"
import { InsertAceHist } from "../../models_sistema/ace_hist/insert";
import { SelectAceHist } from "../../models_sistema/ace_hist/select";
import { InsertLogSistema } from "../../models_sistema/log/insert";
import { InsertMvtoProdutosSistema } from "../../models_sistema/mvto-produtos/insert";
import { DateService } from "../../services/date";

export class MovimentosController{
    
    async main( config:{ dataEstoque:string, importar_estoque:'S'| 'N'} ){
        const dateService = new DateService();

        const selectMovMobile = new SelectMovimentosProdutosMobile();

        const selectMovIntegracao = new SelectMovimentosIntegracao();
        const insertMvtoSistema = new InsertMvtoProdutosSistema();
        
        const insertAcehist = new InsertAceHist();
        const selectCodeAceHist = new SelectAceHist();
        const insertLog = new InsertLogSistema();

          
        const insertMovIntegracao = new InsertMovimentosIntegracao()

        try{
                if( config.importar_estoque === 'S'){
                        let resultMovMobile = await selectMovMobile.findLastUpdate(databaseMobile, config.dataEstoque)
                      if(resultMovMobile.length > 0 ){

                            for(let i of resultMovMobile ){
                                if( Number(i.quantidade) === 0 ){
                                    console.log('movimento com a quantidade vazia, nao será enviado para o sistema')
                                    continue;
                                }
                                let verifyMovIntegration = await selectMovIntegracao.findByIdMobile(String(i.id));
                                  
                                if(verifyMovIntegration.length > 0 ){
                                            console.log(` o movimento ${i.id} ja foi registrado no sistema ! `)
                                        }else{
                                            let lastCodeAceHist = await selectCodeAceHist.fynLastCode();
                                                let itemAceHist =  lastCodeAceHist[0].ITEM  + 1
                                            let resultInserAceHist 
                                               try{
                                                 resultInserAceHist = await insertAcehist.insert(
                                                        { USUARIO:i.usuario,
                                                            HISTORICO:i.historico,
                                                            TIPO:'A',
                                                            ITEM:  itemAceHist, /// codigo 
                                                            SETOR:i.setor
                                                        }
                                                    )
                                               }catch(e){
                                                return console.log("ocorreu um erro ao tentar registrar o acerto na tabela ace_hist", e )
                                               } 
                                               try{
                                                    await insertLog.insert({ APELIDO:"MOBILE", ACAO:1, HISTORICO:` ACERTO DE ESTOQUE -  Produto: ${i.produto}; Quantidade: ${i.quantidade}`, COMPUTADOR:"SERVIDOR", 
                                                        DATA:dateService.obterDataAtual(), HORA: dateService.obterHoraAtual(),IP_CPU:''})
                                               }catch(e){ console.log(`Erro ao tentar inserir o log no sistema `, e ) }

                                             
                                           if( resultInserAceHist && resultInserAceHist.affectedRows > 0 ){
                                                   console.log(` registrando movimento ${i.id} no sistema ...   `)
                                                            try{
                                                                let resultInsertMvtoSistema =  await  insertMvtoSistema.insert(
                                                                                {
                                                                                    chave_mvto:0,
                                                                                    item: itemAceHist,
                                                                                    tipo:'A',
                                                                                    ent_sai: i.ent_sai,
                                                                                    setor:i.setor,
                                                                                    mov_saldo:'S',
                                                                                    produto: i.produto,
                                                                                    grade:0,
                                                                                    padronizado:0,
                                                                                    unidade:i.unidade_medida,
                                                                                    item_unid:0,
                                                                                    fator_qtde:0,
                                                                                    quantidade: Number(i.quantidade),
                                                                                    data_mvto: i.data_recadastro,
                                                                                    hora_mvto: dateService.obterHora(i.data_recadastro),
                                                                                    just_ipi:'',
                                                                                    just_icms:'',
                                                                                    just_subst:''
                                                                                }
                                                                            )
                                                                            if( resultInsertMvtoSistema.affectedRows > 0  ){
                                                                                await insertMovIntegracao.insert( { codigo_sistema:itemAceHist, id_mobile:i.id})
                                                                                console.log(`   movimento ${i.codigo} registrado com sucesso no sistema ...   `)  
                                                                            }
                                                            }catch( e ){
                                                                console.log("Ocorreu um erro ao tentar registrar o movimento no sistema ", e)
                                                            } 
                                            }    
                                     }
                                   
                              }
                           }
                }else{
                    if( config.importar_estoque === 'N'){
                          console.log('a integracao nao esta configurada para enviar os movimentos')
                    }else{
                     console.log('Não foi encontrado configurações de envio da integracao')
                    }
                }
            }catch(e){
                console.log('Erro ao tentar processar os movimentos')
            }
    }
}