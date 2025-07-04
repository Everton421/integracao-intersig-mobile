import { Request, Response } from "express";
import { SelectFormaPagamentoMobile } from "../../models_mobile/formas_pagamento/select";
import { InsertFormaPagamentoMobile } from "../../models_mobile/formas_pagamento/insert";
import { SelectFormaPagamentoSistema } from "../../models_sistema/formaDePagamento/select";
import { databaseMobile,   db_publico } from "../../database/databaseConfig";
import { IFormaPagamentoSistema } from "../../models_sistema/formaDePagamento/types/IFormaPagamentoSistema";
import { IFormaPagamentoMobile } from "../../models_mobile/formas_pagamento/types/IFormas_pagamento";
import { Update_formaPagamentoMobile } from "../../models_mobile/formas_pagamento/update";

    export class formaPagamentoController{

        async main(){
            const selectFormaPagamentoMobile = new SelectFormaPagamentoMobile();
            const insertFormaPagamentoMobile = new InsertFormaPagamentoMobile();
            const selectFormaPagamentoSistema = new SelectFormaPagamentoSistema();
            const updateFormaPagamentoSistema = new Update_formaPagamentoMobile();

                let fpgtSistema:IFormaPagamentoSistema[] = await selectFormaPagamentoSistema.busca_geral( db_publico );

                    if( fpgtSistema.length > 0 ){

                        for( let i of fpgtSistema){

                                let fpgtMobile = await selectFormaPagamentoMobile.buscaPorCodigo(databaseMobile, i.CODIGO) 

                                    let validFpgtMobile = fpgtMobile[0];
                               
                                    if(i.DATA_RECAD === null ){
                                        i.DATA_RECAD = '0000-00-00 00:00:00';
                                    } 
                               let objInsert:IFormaPagamentoMobile = {
                                codigo:i.CODIGO,
                                id:i.CODIGO,
                                descricao:i.DESCRICAO,
                                desc_maximo:i.DESC_MAXIMO,
                                parcelas:i.NUM_PARCELAS,
                                intervalo:i.INTERVALO,
                                recebimento:i.TIPO_RECEBIMENTO,
                               data_cadastro: i.DATA_CADASTRO,
                               data_recadastro:i.DATA_RECAD,
                               }

                                if( fpgtMobile.length > 0 ){

                                  
                                    if( i.DATA_RECAD >  validFpgtMobile.data_recadastro){
                                        try{ 
                                        //update
                                                console.log(`atualizando forma de pagamento codigo :${i.CODIGO} `  )
                                             await  updateFormaPagamentoSistema.updateCodigoSistema(databaseMobile, objInsert)
                                       }catch(e){ console.log(e)}

                                    }else{
                                        console.log(` forma de pagamento codigo: ${i.CODIGO} se encontra atualizada `,i.DATA_RECAD ,' > ',  validFpgtMobile.data_recadastro)
                                        continue;
                                    }
                               }else{
                                try{ 
                                        console.log('cadastrando forma de pagamento codigo: ',i.CODIGO )
                               //cadastrar
                                await insertFormaPagamentoMobile.cadastrarCodigoSistema(databaseMobile, objInsert)
                            }catch(e){ console.log(e)}

                               } 

                        }
                    }
            
        }

    }