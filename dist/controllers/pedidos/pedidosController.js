"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pedidosController = void 0;
const selectPedidoMobile_1 = require("../../models_mobile/pedido/selectPedidoMobile");
const updatePedidoMobile_1 = require("../../models_mobile/pedido/updatePedidoMobile");
const date_1 = require("../../services/date");
const selectOrcamento_1 = require("../../models_sistema/pedido/selectOrcamento");
const insert_1 = require("../../models_integracao/pedidos/insert");
const insertPedidoSistema_1 = require("../../models_sistema/pedido/insertPedidoSistema");
const updatePedidoSistema_1 = require("../../models_sistema/pedido/updatePedidoSistema");
const databaseConfig_1 = require("../../database/databaseConfig");
class pedidosController {
    async main() {
        let objDate = new date_1.DateService();
        let selectPedidoMobile = new selectPedidoMobile_1.SelectPedidoMobile();
        let updatePedidoMobile = new updatePedidoMobile_1.UpdatePedidoMobile();
        let insertParamPedido = new insert_1.InsertParamPedidosMobile();
        let selectPedidoSistema = new selectOrcamento_1.SelectOrcamentoSistema();
        let createPedidoSistema = new insertPedidoSistema_1.InsertPedidoSistema();
        let updatePedidoSistema = new updatePedidoSistema_1.UpdatePedidoSistema();
        let orcamentos_registrados = [];
        let dataAtual = objDate.obterDataAtual() + ' 00:00:00';
        try {
            console.log(dataAtual);
            if (dataAtual === undefined || dataAtual === '')
                return;
            orcamentos_registrados = await selectPedidoMobile.buscaCompleta(databaseConfig_1.databaseMobile, dataAtual);
            console.log(orcamentos_registrados);
        }
        catch (e) {
            console.log('erro ao Consultar os orcamentos Mobile');
        }
        if (orcamentos_registrados?.length > 0) {
            for (let i of orcamentos_registrados) {
                let validPedidoSistema = await selectPedidoSistema.buscaOrcamentosCompleto(i.codigo);
                if (validPedidoSistema.length) {
                    let pedidoSistema = validPedidoSistema[0];
                    // se data de recadastro do pedido mobile for maior atualiza o pedido no sistema 
                    if (i.data_recadastro > pedidoSistema.data_recadastro) {
                        console.log(`atualizando pedido ${pedidoSistema.codigo} no sistema ${i.data_recadastro}  > ${pedidoSistema.data_recadastro} `);
                        await updatePedidoSistema.update(i, pedidoSistema.codigo);
                    }
                    else {
                        if (pedidoSistema.data_recadastro > i.data_recadastro) {
                            console.log(`atualizando pedido ${pedidoSistema.codigo} no mobile ${i.data_recadastro}  > ${pedidoSistema.data_recadastro} `);
                            ///
                            await updatePedidoMobile.update(databaseConfig_1.databaseMobile, pedidoSistema, i.codigo);
                        }
                        else {
                            ///     console.log(`o pedido ${i.codigo} se encontra atualizado`)
                            if (i.situacao !== pedidoSistema.situacao || i.tipo !== pedidoSistema.tipo) {
                                console.log(`atualizando pedido ${pedidoSistema.codigo} no mobile ${i.data_recadastro}  > ${pedidoSistema.data_recadastro} `);
                                pedidoSistema.data_recadastro = objDate.obterDataHoraAtual();
                                await updatePedidoMobile.update(databaseConfig_1.databaseMobile, pedidoSistema, i.codigo);
                            }
                        }
                    }
                }
                else {
                    try {
                        console.log(`inserindo pedido ${i.codigo} no sistema `);
                        let aux = await createPedidoSistema.create(i);
                        if (aux > 0) {
                            let data = { codigo_sistema: aux, codigo_mobile: i.codigo, excluido: 'N' };
                            await insertParamPedido.cadastrar(data);
                        }
                    }
                    catch (e) {
                        console.log('erro ao tentar cadastrar orcamento', e);
                    }
                }
            }
        }
    }
}
exports.pedidosController = pedidosController;
/*import { Request, Response } from "express";
import { databaseMobile,db_integracao_mobile } from "../../database/databaseConfig";
import { SelectOrcamentosMobile } from "../../models_mobile/pedido/select";
import { UpdateOrcamentoMobile } from "../../models_mobile/pedido/update";
import { Select_clientes_sistema } from "../../models_sistema/cliente/select";
import { DateService } from "../../services/date";
import { CreateOrcamentoSistema } from "../../models_sistema/pedido/createOrcamento";
import { Select_clientes_mobile } from "../../models_mobile/cliente/select";
import { SelectIntegracao } from "../../models_integracao/pedidos/select";
import { SelectOrcamentoSistema } from "../../models_sistema/pedido/selectOrcamento";
import { UpdateOrcamentoSistema } from "../../models_sistema/pedido/updataOrcamento";
import { IPedidoMobile } from "../../models_mobile/pedido/types/IPedidoMobile";
import { InsertParamPedidosMobile } from "../../models_integracao/pedidos/insert";
import { PedidoSimples } from "../../models_sistema/pedido/types/IPedidoSistema";
import { paramPedido } from "../../models_integracao/pedidos/types/paramPedido";
export class pedidosController{


    async select( req:Request,res:Response){

        let objDate = new DateService();

    let selectOrcamentoMobile = new SelectOrcamentosMobile();
    let updateOrcamentoMobile = new UpdateOrcamentoMobile();
    let select_clientesSistema = new Select_clientes_sistema();

    let insertParamPedido  = new InsertParamPedidosMobile();

    let updatePedidoSistema = new UpdateOrcamentoSistema();

    let selectPedidosIntegracao = new  SelectIntegracao();

    let selectPedidoSistema = new SelectOrcamentoSistema();

    let selectClientesMobile = new Select_clientes_mobile();

    let createOrcamentoSistema = new CreateOrcamentoSistema()

    let orcamentos_registrados:any[] =[];

   let dataAtual = objDate.obterDataAtual()+' 00:00:00'
    // let dataAtual = '2025-01-09 00:00:00'
     
    let vendedor = 1
       try{
        orcamentos_registrados  = await selectOrcamentoMobile.buscaCompleta(dataAtual, vendedor)
    }catch(e){ console.log('erro ao Consultar os orcamentos Mobile')}
     
          if(orcamentos_registrados?.length > 0 ){

                 for(let i of orcamentos_registrados){
                    
                              
                    let validPedidoSistema:any = await selectPedidoSistema.buscaOrcamentosCompleto(i.codigo );
                              
                                if(validPedidoSistema.length){
                                    let pedidoSistema = validPedidoSistema[0];
                                  // se data de recadastro do pedido mobile for maior atualiza o pedido no sistema
                                      if(  i.data_recadastro  > pedidoSistema.data_recadastro   ){
                                           console.log(`atualizando pedido ${pedidoSistema.codigo } no sistema ${i.data_recadastro}  > ${pedidoSistema.data_recadastro} `)
                                            await updatePedidoSistema.update(i, pedidoSistema.codigo);
                                        }else {
                                        //  if( pedidoSistema.data_recadastro > i.data_recadastro  || i.situacao !== pedidoSistema.situacao  ){
                                        //   console.log(`atualizando pedido ${pedidoSistema.codigo } no mobile ${i.data_recadastro}  > ${pedidoSistema.data_recadastro} `)
//
                                        //    await updateOrcamentoMobile.update(databaseMobile, pedidoSistema, i.codigo )
                                        //   }else{
                                        //    console.log(`o pedido ${i.codigo} se encontra atualizado`)
                                        //   }
                                          }

                                }else{
                                  //   try{
 //
                                  //       let aux:number =  await createOrcamentoSistema.create(i);
                                  //          if(aux > 0 ){
          //
                                  //           let data:paramPedido = {codigo_sistema: aux, codigo_mobile: i.codigo , excluido: 'N'}
                                  //          await insertParamPedido.cadastrar(data)
                                  //   }
                                  //         console.log('resposta insert pedido', aux )
                                  //    } catch(e){
                                  //            console.log('erro ao tentar cadastrar orcamento', e)
                                  //        }
                                }
                                 
                            
                      
                       
                 
                }
         }
   
    
    }


}*/ 
