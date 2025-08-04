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


    private replaceCodeOrder(str:string){
        return str.replace(/^0+/,'');
    }

    async main( dataAtual:string ){
    console.log(" Atualizando pedidos ...")
        let objDate = new DateService();

    let selectPedidoMobile = new SelectPedidoMobile();
    let updatePedidoMobile = new UpdatePedidoMobile();

    let insertParamPedido  = new InsertParamPedidosMobile();

    let selectPedidoSistema = new SelectOrcamentoSistema();
    let createPedidoSistema = new InsertPedidoSistema()
    let updatePedidoSistema = new UpdatePedidoSistema();    

    let orcamentos_registrados:any[] =[];

   let dataHoraAtual = objDate.obterDataHoraAtual();
   
       try{
        console.log(objDate.formatarDataHora(dataAtual))

        if(dataAtual === undefined || dataAtual === '')  return
        orcamentos_registrados  = await selectPedidoMobile.buscaCompleta(databaseMobile,  objDate.formatarDataHora(dataAtual))

    }catch(e){ console.log('erro ao Consultar os orcamentos Mobile')}
     
 
          if(orcamentos_registrados?.length > 0 ){

                for(let i of orcamentos_registrados){
                    //console.log(i)
                    //console.log('')
                    //console.log('')
                    i.id = this.replaceCodeOrder(i.id);

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
                                                        await updatePedidoMobile.newUpdate(databaseMobile, i.codigo, 
                                                            {
                                                                situacao:pedidoSistema.situacao,
                                                            })
                                                    }else{
    
                                                    }
                                                    console.log(`o pedido ${i.codigo} se encontra atualizado`)

                                               }

                                           }

                                    }else{
                                        try{
                                            console.log(`inserindo pedido ${i.codigo} no sistema `)
                                            i.data_recadastro = dataHoraAtual
                                            let aux:number =  await createPedidoSistema.create(i);
                                                if(aux > 0 ){
            
                                                let data:paramPedido = {codigo_sistema: aux, codigo_mobile: i.codigo , excluido: 'N'}
                                             //  await insertParamPedido.cadastrar(data)
                                               await updatePedidoMobile.newUpdate( databaseMobile, i.codigo, {  id_externo:  aux, data_recadastro: i.data_recadastro} )
                                            }
                                        } catch(e){
                                                console.log('erro ao tentar cadastrar orcamento', e)
                                            }
                                    } 
                                        
            
                    }  
                
         }   
  
    
    }


}





 