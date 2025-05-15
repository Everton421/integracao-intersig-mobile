import { Request, Response } from "express";
import { SelectPedidoMobile } from "../../models_mobile/pedido/selectPedidoMobile";
import { UpdatePedidoMobile } from "../../models_mobile/pedido/updatePedidoMobile";
import { DateService } from "../../services/date";

import { SelectOrcamentoSistema } from "../../models_sistema/pedido/selectOrcamento";
import { InsertParamPedidosMobile } from "../../models_integracao/pedidos/insert";
import { paramPedido } from "../../models_integracao/pedidos/types/paramPedido";
import { InsertPedidoSistema } from "../../models_sistema/pedido/insertPedidoSistema";
import { UpdatePedidoSistema } from "../../models_sistema/pedido/updatePedidoSistema";
import { databaseMobile } from "../../database/databaseConfig";


export class pedidosController{

    async main(  ){
console.log(" Atualizando pedidos ...")
        let objDate = new DateService();

    let selectPedidoMobile = new SelectPedidoMobile();
    let updatePedidoMobile = new UpdatePedidoMobile();

    let insertParamPedido  = new InsertParamPedidosMobile();

    let selectPedidoSistema = new SelectOrcamentoSistema();
    let createPedidoSistema = new InsertPedidoSistema()
    let updatePedidoSistema = new UpdatePedidoSistema();    

    let orcamentos_registrados:any[] =[];

   let dataAtual = objDate.obterDataAtual()+' 00:00:00'
   let dataHoraAtual = objDate.obterDataHoraAtual();
   
 
       try{
        console.log(dataAtual)

        if(dataAtual === undefined || dataAtual === '')  return
        orcamentos_registrados  = await selectPedidoMobile.buscaCompleta(databaseMobile, dataAtual)

    }catch(e){ console.log('erro ao Consultar os orcamentos Mobile')}
     
 
          if(orcamentos_registrados?.length > 0 ){

                for(let i of orcamentos_registrados){
                    //console.log(i)
                    //console.log('')
                    //console.log('')
                        let validPedidoSistema:any = await selectPedidoSistema.buscaOrcamentosCompleto(i.codigo );
                                
                                if(validPedidoSistema.length){
                                    
                                        let pedidoSistema = validPedidoSistema[0];

                                    // se data de recadastro do pedido mobile for maior atualiza o pedido no sistema 
                                        if(  i.data_recadastro  > pedidoSistema.data_recadastro     ){
                                            console.log(`atualizando pedido ${pedidoSistema.codigo } no sistema ${i.data_recadastro}  > ${pedidoSistema.data_recadastro} `)
                                            await updatePedidoSistema.update(i, pedidoSistema.codigo);
                                        }else {

                                            if( pedidoSistema.data_recadastro > i.data_recadastro      ){
                                                console.log(`atualizando pedido ${pedidoSistema.codigo } no mobile ${i.data_recadastro}  > ${pedidoSistema.data_recadastro} `)
                                                    await updatePedidoMobile.update(databaseMobile, pedidoSistema, i.codigo )
                                            
                                                }else{
                                                    if(  pedidoSistema.situacao !=  i.situacao || pedidoSistema.tipo !=  i.tipo ){
                                                        console.log(pedidoSistema.situacao ,' !== ', i.situacao,' ',   pedidoSistema.tipo ,' !== ', i.tipo)
                                                        // atualiza somente a tabela dos dados do orcamento
                                                        // tipo, situacao etc ..
                                                        console.log(`atualizando situacao do pedido ${i.codigo} no mobile `)
                                                        await updatePedidoMobile.updateTabelaPedido(databaseMobile,pedidoSistema ,i.codigo)
                                                    }else{
    
                                                    }
                                                    console.log(`o pedido ${i.codigo} se encontra atualizado`)

                                               }

                                           }

                                    }else{
                                        try{
                                            console.log(`inserindo pedido ${i.codigo} no sistema `)
                                            let aux:number =  await createPedidoSistema.create(i);
                                                if(aux > 0 ){
            
                                                let data:paramPedido = {codigo_sistema: aux, codigo_mobile: i.codigo , excluido: 'N'}
                                              //  await insertParamPedido.cadastrar(data)
                                        }
                                        } catch(e){
                                                console.log('erro ao tentar cadastrar orcamento', e)
                                            }
                                    } 
                                        
            
                    }  
                
         }   
  
    
    }


}









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