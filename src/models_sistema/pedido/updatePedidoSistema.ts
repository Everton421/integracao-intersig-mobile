import { Request, Response, request, response } from "express";
import { conn_sistema, db_vendas, db_estoque, db_publico } from "../../database/databaseConfig";
import { SelectOrcamentoSistema } from "./selectOrcamento";
import { DateService } from "../../services/date";
 
import { SelectItemsPedidoSistema } from "./selectItensPedidoSistema";
import { DeleteItensPedidoMobile } from "../../models_mobile/pedido/deleteItensPedidoMobile";
import { DeleteItensPedidoSistema } from "./deleteItensPedidoSistema";
import { InsertItensPedidoSistema } from "./insertItensPedidoSistema";


export class UpdatePedidoSistema{
   
   
    async update(orcamento:any, codigoOrcamento:number ) {

 
        let codigoCliente = orcamento.cliente;

        
        async function updateCad_orca( orcamento:any, codigo:number ) {
            return new Promise(async (resolve, reject) => {
                let sql = `
                    UPDATE ${db_vendas}.cad_orca  
                    set 
                    cliente         =  ${codigoCliente},
                    total_geral     =  ${orcamento.total_geral} ,
                    total_produtos  =  ${orcamento.total_produtos} ,
                    total_servicos  =  ${orcamento.total_servicos} ,
                    tipo             =  ${orcamento.tipo},
                    tipo_os         =  ${orcamento.tipo_os},
                    qtde_parcelas   =  ${orcamento.quantidade_parcelas} ,
                    contato         = '${orcamento.contato}',
                    veiculo         =  ${orcamento.veiculo},
                    forma_pagamento =  ${orcamento.forma_pagamento},
                    observacoes     = '${orcamento.observacoes}',
                    data_cadastro   = '${orcamento.data_cadastro}',
                    data_recad      = '${orcamento.data_recadastro}',
                    situacao        = '${orcamento.situacao}'
                    where codigo = ${codigo}
                `

               await conn_sistema.query(sql, (err:any, result:any) => {
                    if (err) {
                        reject(err);
                    } else {
                        // console.log(result);
                        resolve(result.affectedRows);
                    }
                })
            })
        }

        
         const selectOrcamentoSistema = new SelectOrcamentoSistema();
         const deleteItensPedidoSistema = new DeleteItensPedidoSistema();
         const selectItensPedidoSistema = new SelectItemsPedidoSistema();
         const insertItensPedidoSistema = new InsertItensPedidoSistema();

        const objDate = new DateService();

        let objData = new DateService()

        const dataAtual = objData.obterDataAtual(); 


        let {
            forma_pagamento,
            descontos,
            observacoes,
            observacoes2,
            quantidade_parcelas,
            total_geral,
            total_produtos,
            totalSemDesconto,
            situacao,
            tipo,
            vendedor,
            data_cadastro,
            data_recadastro,
            veiculo,
            tipo_os,
            contato,
            just_ipi,
            just_icms,
            just_subst,
            codigo_cliente,
            descontos_produto
        } = orcamento;

        const servicos = orcamento.servicos;
        const parcelas = orcamento.parcelas;
        const produtos = orcamento.produtos;

        if (!situacao)  situacao = 'EA';
        if (!quantidade_parcelas)  quantidade_parcelas = 0;
        if (!vendedor)  vendedor = 1;
        if (!tipo_os)  tipo_os = 0;
        if (!veiculo)  veiculo = 0;
        if (!data_cadastro)   data_cadastro = dataAtual;
        if (!data_recadastro)  data_recadastro = objDate.obterDataHoraAtual();
        if (!contato)  contato = '';
        if (!observacoes)   observacoes = '';
        if (!observacoes2)  observacoes2 = '';
        if (!just_ipi)   just_ipi = '';
        if (!just_icms)   just_icms = '';
        if (!just_subst)  just_subst = '';
        if (!forma_pagamento)  forma_pagamento = 0
        if (!descontos)   descontos = 0
        if (!descontos_produto)   descontos_produto = 0

        let aux: any;
        let statusAtualizacao: any;
        let statusDeletePro_orca: any;
        let statusDeletePar_orca: any;

      
            try {
                statusAtualizacao = await updateCad_orca(orcamento,codigoOrcamento );
            } catch (err) {
                console.log(err);
               /// return response.status(500).json({ "msg": err });
            }

            if (statusAtualizacao) {
                
                const validaProdutos:any = await selectItensPedidoSistema.buscaProdutosDoOrcamento( codigoOrcamento )
                if( validaProdutos.length > 0 ){
                    try {
                        statusDeletePro_orca = await deleteItensPedidoSistema.deletePro_orca(codigoOrcamento);
                    } catch (err) {
                        console.log(err);
                    }
                    
                    if (produtos.length > 0) {
                            try {
                                await insertItensPedidoSistema.cadastraProdutosDoPedido(produtos ,codigoOrcamento);
                            } catch (err) {
                                console.log(err)
                            }
                    }
                }



              const validaServicos:any = await selectItensPedidoSistema.buscaServicosDoOrcamento( codigoOrcamento )
              
              if( validaServicos.length > 0 ){
               
                try {
                    await deleteItensPedidoSistema.deleteSer_orca(codigoOrcamento)
                } catch (e) {
                    console.log(e);
                }

                if (servicos.length > 0) {

                    try {
                        await insertItensPedidoSistema.cadastraServicosDoPedido( servicos, codigoOrcamento);
                    } catch (e) { console.log(` erro ao inserir os servicos`, e) }

                }
            }

              const validaParcelas:any = await selectItensPedidoSistema.buscaParcelasDoOrcamento( codigoOrcamento )

           if( validaParcelas.length > 0 ){

                if(statusAtualizacao ){
                    try{
                        statusDeletePar_orca = await deleteItensPedidoSistema.deletePar_orca(codigoOrcamento);
                        }catch(err){
                            console.log(err);
                            return response.status(500).json({"msg":err});
                        }   
                    } 

                if(statusDeletePar_orca){
                  try{
                     await insertItensPedidoSistema.cadastraParcelasDoPeidido( parcelas, codigoOrcamento);
                  }catch(err){
                      console.log(err)
                      return response.status(500).json({"msg":err});
                  }
               } 
            } 
          //      {
          //          "msg": ` orcamento ${codigoDoOrcamento} atualizado com sucesso!`,
          //          "codigo": `${codigoDoOrcamento}`
          //      });
        } else {
            console.log('nao foi encontrado orcamento com este codigo')
        }


    }


}