import { Request, Response } from "express";
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

    let orcamentos_registrados:any;

    //let dataAtual = objDate.obterDataAtual()+' 00:00:00'
    let dataAtual = '2025-01-09 00:00:00'
     
    let vendedor = 1
       
        orcamentos_registrados  = await selectOrcamentoMobile.buscaCompleta(dataAtual, vendedor)
        console.log(orcamentos_registrados )

     
          if(orcamentos_registrados?.length > 0 ){

                 for(let i of orcamentos_registrados){
                    let validPedidoIntegracao:any 

                    
                     try{    
                            validPedidoIntegracao  = await selectPedidosIntegracao.validaPedido(i.codigo)
                        }catch(e){ console.log('erro ao consultar a tabela de controle de pedidos ', e )}

                       
                        if(validPedidoIntegracao.length > 0 ){
                            let validPedidoSistema:any = await selectPedidoSistema.buscaOrcamentoCod_site(i.codigo, i.vendedor);
                                if(validPedidoSistema.length){

                                     if(  i.data_recadastro  > validPedidoSistema[0].data_recadastro  ){
                                        console.log('atualizando')
                                         await updatePedidoSistema.update(i, validPedidoIntegracao[0].codigo_sistema)
                                     }else{

                                        if(   validPedidoSistema[0].data_recadastro > i.data_recadastro   ){

                                        }
                                     } 

                                } 
                                
                               
                        }else{
                             try{
                               let aux =  await createOrcamentoSistema.create(i);
                                 if(aux){
                                    let data = {codigo_sistema: i, codigo_mobile: i.codigo , excluido: 'N'}
                                        await insertParamPedido.cadastrar(data)
                                 }
                                 console.log('resposta insert pedido', aux )
                             } catch(e){
                                     console.log('erro ao tentar cadastrar orcamento', e)
                                 } 
                        }
                       
                 
                } 
         }   
   
    
    }


}