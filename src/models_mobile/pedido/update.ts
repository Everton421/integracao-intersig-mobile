import { Request, Response, request, response } from "express";
import { conn_mobie, databaseMobile  } from "../../database/databaseConfig";
import { CreateOrcamento } from "./insert";
import { IProdutoPedidoMobile } from "./types/IProdutoPedidoMobile";
import { IServicosMobile } from "../servicos/types/IServicosMobile";
import {    IParcelasPedidoMobile } from "./types/IParcelasPedido";
import { IPedidoMobile } from "./types/IPedidoMobile";
import { SelectServicosMobile } from "../servicos/select";
import { SelectProdutosMobile } from "../produtos/select";
import { Select_clientes_mobile } from "../cliente/select";


export class UpdateOrcamentoMobile{
    
    
    async  updateTabelaPedido( empresa:any ,orcamento:any, codigo:number ):Promise<number> {
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
                forma_pagamento     =  ${orcamento.forma_pagamento},
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

    async   deleteProdutosPedido( empresa:any, codigo: number) {
        return new Promise( async(resolve, reject) => {

            let sql2 = ` delete from ${empresa}.produtos_pedido
                                    where pedido = ${codigo}
                                `
             await   conn_mobie.query(sql2, (err:any, result:any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })

    }

    async   deleteServicosPedido(empresa:any ,codigo: number) {
        return new Promise( async(resolve, reject) => {

            let sql2 = ` delete from ${empresa}.servicos_pedido
                                    where pedido = ${codigo}
                                `
         await   conn_mobie.query(sql2, (err:any, result:any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })

    }

    async   deleteParcelasPedido(empresa:any,codigo: number) {
        return new Promise( async(resolve, reject) => {

            let sql2 = ` delete from ${empresa}.parcelas
                                    where pedido = ${codigo}
                                `
             await  conn_mobie.query(sql2, (err:any, result:any) => {
                if (err) {
                   reject(err);
                } else {
                    resolve(result);
                }
            })
        })

    }

    async   buscaProdutosDoOrcamento(empresa:any, codigo: number):Promise<IProdutoPedidoMobile[]> {
        return new Promise( async (resolve, reject) => {
         const sql = ` select 
                        pp.pedido,
                       -- pp.codigo,
                        pp.desconto,
                        pp.quantidade,
                        pp.preco,
                        pp.total,
                            p.id
                        from ${empresa}.produtos_pedido pp 
                            join ${empresa}.produtos p on p.codigo = pp.codigo 
                        where pp.pedido = ? `
          await  conn_mobie.query(sql, [codigo], async (err:any, result:IProdutoPedidoMobile[]) => {
                if (err) {
                    console.log(err)
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
    async   buscaServicosDoOrcamento( empresa:any,codigo: number): Promise<IServicosMobile[]>{
        return new Promise( async (resolve, reject) => {
            const sql = ` select
                sp.pedido,
                s.codigo,
                sp.desconto,
                sp.quantidade,
                sp.valor,
                sp.total
              from ${empresa}.servicos_pedido sp
              join ${empresa}.servicos s  on sp.codigo = s.codigo
              where sp.pedido = ? `
      await      conn_mobie.query(sql, [codigo], async (err:any, result:IServicosMobile[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
    async   buscaParcelasDoOrcamento(empresa:any,codigo: number):Promise<IParcelasPedidoMobile[]>{
        return new Promise( async (resolve, reject) => {
            const sql = ` select *,  DATE_FORMAT(vencimento, '%Y-%m-%d') AS vencimento   from ${empresa}.parcelas where pedido = ? `
    await    conn_mobie.query(sql, [codigo], async (err:any, result:IParcelasPedidoMobile[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
 

   
    async update(empresa:any,orcamento:any, codigoOrcamento:number )  {
       return new Promise ( async (resolve, reject )=>{
            
    let selectServicosMobile = new SelectServicosMobile()
    let selectProdutosMobile = new SelectProdutosMobile()
        let selectClientesMobile = new Select_clientes_mobile();

        let objUpdate = new UpdateOrcamentoMobile();
        let objInsert = new CreateOrcamento();
   

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
                statusAtualizacao = await objUpdate.updateTabelaPedido(empresa,orcamento,codigoOrcamento );
            } catch (err) {
                reject(err)
                return;
            }

          const validaServicos:any = await objUpdate.buscaServicosDoOrcamento( empresa,codigoOrcamento )
              
           if( validaServicos.length > 0 ){
                try {
                    await  objUpdate.deleteServicosPedido( empresa,codigoOrcamento )
                } catch (e) {
                    reject(e);
                    return;
                }
            }
           
          
               if (servicos.length > 0) {

                // função para buscar o codigo interno do servico mobile
                        for( let i of servicos ){
                               let result = await selectServicosMobile.buscaPorId(empresa, i.codigo)
                               i.codigo = result[0].codigo
                        }

                 try {
                     await objInsert.cadastraServicosDoPedido(   servicos,codigoOrcamento, empresa )
                 } catch (e) { 
                     reject(e);
                      return;
                 }
              }

 

            
                const validaProdutos:any = await objUpdate.buscaProdutosDoOrcamento( empresa,codigoOrcamento )
                
                if( validaProdutos.length > 0 ){
                    
                    try {
                        statusDeletePro_orca = await objUpdate.deleteProdutosPedido(empresa,codigoOrcamento);
                    } catch (err) {
                        reject(err)
                         return;
                    }
                    }
                    
                    if (produtos.length > 0) {
                       // if (statusDeletePro_orca) {
                         for( let i of produtos ){
                                let result = await selectProdutosMobile.buscaPorId(empresa, i.codigo)
                                i.codigo = result[0].codigo
                        }

                            try {
                                await objInsert.cadastraProdutosDoPedido(produtos,empresa,codigoOrcamento);
                            } catch (err) {
                                 reject(err)
                                  return;
                            }
                        }
          
           
     
              const validaParcelas:any = await objUpdate.buscaParcelasDoOrcamento(empresa, codigoOrcamento )

                if( validaParcelas.length > 0 ){
                         if(statusAtualizacao ){
                            try{
                                statusDeletePar_orca = await objUpdate.deleteParcelasPedido(empresa,codigoOrcamento);
                                }catch(err){
                                    reject(err)
                                    return;
                                }   
                          } 

                       if(statusDeletePar_orca){
                        try{
                            await objInsert.cadastraParcelasDoPedido (parcelas,empresa, codigoOrcamento );
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