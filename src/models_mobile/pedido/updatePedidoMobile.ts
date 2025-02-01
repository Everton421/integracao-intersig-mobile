import { conn_mobie, databaseMobile, db_estoque, db_publico  } from "../../database/databaseConfig";
import { IProdutoPedidoMobile } from "./types/IProdutoPedidoMobile";
import { IServicosMobile } from "../servicos/types/IServicosMobile";
import { IParcelasPedidoMobile } from "./types/IParcelasPedido";
import { Select_clientes_mobile } from "../cliente/select";
import { SelectItemsPedidoMobile } from "./SelectItemsPedidoMobile";
import { InsertItensPedidoMobile } from "./insertItensPedidoMobile";
import { DeleteItensPedidoMobile } from "./deleteItensPedidoMobile";
import { SelectProdutosMobile } from "../produtos/select";
import { SelectServicosMobile } from "../servicos/select";
import { SelectFormaPagamentoMobile } from "../formas_pagamento/select";
import { ProdutoController } from "../../controllers/produtos/produtos";
import { SelectProdutosSistema } from "../../models_sistema/produtos/select";


export class UpdatePedidoMobile{
    
    
    async  updateTabelaPedido( empresa:any ,orcamento:any, codigo:number ):Promise<number> {

        const  selectFormaPagamentoMobile = new SelectFormaPagamentoMobile();

        let resultForma_pagamento = await selectFormaPagamentoMobile.buscaPorId(databaseMobile, orcamento.forma_pagamento);
        let forma_pagamento = 0;
            if( resultForma_pagamento.length > 0 ) forma_pagamento = resultForma_pagamento[0].codigo   

        return new Promise(async (resolve, reject) => {
            let sql = `
                UPDATE ${empresa}.pedidos  
                set 
                cliente             =  ${orcamento.cliente.codigo},
                total_geral         =  ${orcamento.total_geral} ,
                total_produtos      =  ${orcamento.total_produtos} ,
                total_servicos      =  ${orcamento.total_servicos} ,
                tipo_os             =  ${orcamento.tipo_os},
                tipo                =  ${orcamento.tipo},
                quantidade_parcelas =  ${orcamento.quantidade_parcelas} ,
                contato             = '${orcamento.contato}',
                veiculo             =  ${orcamento.veiculo},
                forma_pagamento     =  ${forma_pagamento},
                observacoes         = '${orcamento.observacoes}',
                data_cadastro       = '${orcamento.data_cadastro}',
                data_recadastro     = '${orcamento.data_recadastro}',
                enviado             = 'S',
                observacoes         =  '${orcamento.observacoes}',
                situacao            = '${orcamento.situacao}'
                where codigo = ${codigo}
            `
          await  conn_mobie.query(sql, (err:any, result:any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows);
                }
            })
        })
    }

   
    async update(empresa:any,orcamento:any, codigoOrcamento:number )  {
       return new Promise ( async (resolve, reject )=>{
                
               let produtoController = new ProdutoController();


               let selectClientesMobile = new Select_clientes_mobile();

                let  selectItemsPedidoMobile = new SelectItemsPedidoMobile();
                let insertItensPedidoMobile = new InsertItensPedidoMobile();
                let deleteItensPedidoMobile = new DeleteItensPedidoMobile();
                
                let selectProdutosMobile = new SelectProdutosMobile();
                let selectServicosMobile = new SelectServicosMobile();
                let selectProdutosSistema = new SelectProdutosSistema();

                        const servicos:IServicosMobile[] = orcamento.servicos;
                        const parcelas:IParcelasPedidoMobile[] = orcamento.parcelas;
                        const produtos:IProdutoPedidoMobile[] = orcamento.produtos;

                        let statusAtualizacao: any;
                        let statusDeletePro_orca: any;
                        let statusDeletePar_orca: any;
                        
                        const validCliente = await selectClientesMobile.buscaPorId(databaseMobile, orcamento.cliente.codigo)
                    
                            if( validCliente.length > 0 ){
                                orcamento.cliente = validCliente[0]
                            }

                            try {
                                statusAtualizacao = await this.updateTabelaPedido(empresa,orcamento,codigoOrcamento );
                            } catch (err) {
                                reject(err)
                                return;
                            }

                        const validaServicos:any = await selectItemsPedidoMobile.buscaServicosDoOrcamento( empresa,codigoOrcamento )
                            
                        if( validaServicos.length > 0 ){
                                try {
                                    await  deleteItensPedidoMobile.deleteServicosPedido( empresa,codigoOrcamento )
                                } catch (e) {
                                    reject(e);
                                    return;
                                }
                            }
                        
                        
                            if (servicos.length > 0) {
                                    for (let i of servicos){
                                        let result = await selectServicosMobile.buscaPorId(databaseMobile, i.codigo);
                                        if( result.length > 0) i.id = result[0].codigo
                                    }  
                                try {
                                    await insertItensPedidoMobile.cadastraServicosDoPedido(   servicos,codigoOrcamento, empresa )
                                } catch (e) { 
                                    reject(e);
                                    return;
                                }
                            }

                                const validaProdutos:any = await selectItemsPedidoMobile.buscaProdutosDoOrcamento( empresa,codigoOrcamento )
                                
                                if( validaProdutos.length > 0 ){
                                    
                                    try {
                                        statusDeletePro_orca = await deleteItensPedidoMobile.deleteProdutosPedido(empresa,codigoOrcamento);
                                    } catch (err) {
                                        reject(err)
                                        return;
                                    }
                                    }
                                    
                                    if (produtos.length > 0) {
                                        for (let i of produtos){
                                            let result = await selectProdutosMobile.buscaPorId(databaseMobile, i.codigo);
                                           //// se nao encontrar o iten no mobile é feito o envio
                                            if( result.length > 0){
                                                i.id = result[0].codigo
                                            }

                                        }  
                                            try {
                                                await insertItensPedidoMobile.cadastraProdutosDoPedido(produtos,empresa,codigoOrcamento);
                                            } catch (err) {
                                                reject(err)
                                                return;
                                            }
                                        }
                    
                            const validaParcelas:any = await selectItemsPedidoMobile.buscaParcelasDoOrcamento(empresa, codigoOrcamento )

                                if( validaParcelas.length > 0 ){
                                        if(statusAtualizacao ){
                                            try{
                                                statusDeletePar_orca = await deleteItensPedidoMobile.deleteParcelasPedido(empresa,codigoOrcamento);
                                                }catch(err){
                                                    reject(err)
                                                    return;
                                                }   
                                        } 

                                    if(statusDeletePar_orca){
                                        try{
                                            await insertItensPedidoMobile.cadastraParcelasDoPedido (parcelas,empresa, codigoOrcamento );
                                        }catch(err){
                                            reject(err)
                                            return;
                                        }
                                } 
                    } 
                            
                            resolve(codigoOrcamento)
                    })
                
    }


}