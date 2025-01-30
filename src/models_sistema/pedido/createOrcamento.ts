import { Request, Response, request, response } from "express";
import { conn_sistema, db_vendas, db_estoque, db_publico } from "../../database/databaseConfig";
import { IPedidoSistema } from "./types/IPedidoSistema";
import { IProdutoPedidoSistema } from "./types/IProdutoPedidoSistema";
import { IParcelasPedidoMobile } from "../../models_mobile/pedido/types/IParcelasPedido";
import { IServicosPedidoSistema } from "./types/IServicosPedidoSistema";

export class CreateOrcamentoSistema{



      converterData(data: string): string {
        const [dia, mes, ano] = data.split('/');
        return `${ano}-${mes}-${dia}`;
    }
      obterDataAtual() {
        const dataAtual = new Date();
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const ano = dataAtual.getFullYear();
        return `${ano}-${mes}-${dia}`;
    }



    async create(orcamento:IPedidoSistema):Promise<number> {

        return new Promise( async(resolve, reject)=>{

        const dataAtual = this.obterDataAtual();

        let codigo_pedido;
        let {
            codigo,
            forma_pagamento,
            cliente,
            descontos,
            observacoes,
            observacoes2,
            quantidade_parcelas,
            total_geral,
            total_produtos,
            total_servicos,
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
             
        } = orcamento;


        const servicos = orcamento.servicos;
        const parcelas = orcamento.parcelas;
        const produtos = orcamento.produtos;

        if (!situacao)  situacao = 'EA';
        if (!vendedor)   vendedor = 1;
        if (!tipo_os)   tipo_os = 0;
        if (!veiculo)   veiculo = 0;
        if (!data_cadastro)   data_cadastro = dataAtual;
        if (!data_recadastro)  data_recadastro = dataAtual;
        if (!total_servicos)   total_servicos = 0;
        if (!contato)   contato = '';
        if (!observacoes)   observacoes = '';
        if (!observacoes2)  observacoes2 = '';
        if (!just_ipi)  just_ipi = '';
        if (!just_icms)   just_icms = '';
        if (!just_subst)   just_subst = '';
        if (!forma_pagamento)   forma_pagamento = 0
        if (!descontos)   descontos = 0
        if (!quantidade_parcelas)   quantidade_parcelas = 0
       

       await conn_sistema.query(
            `INSERT INTO ${db_vendas}.cad_orca ` +
            `(cliente, cod_site, total_produtos,total_servicos, forma_pagamento, tipo,  DESC_PROD, TOTAL_GERAL, DATA_CADASTRO, SITUACAO,VENDEDOR,CONTATO , DATA_INICIO,DATA_PEDIDO, DATA_APROV, QTDE_PARCELAS, OBSERVACOES,OBSERVACOES2, DATA_RECAD)  
                VALUES ( ? ,?, ?, ?, ?, ?, ?, ? , ? , ? ,?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [cliente, codigo, total_produtos, total_servicos ,forma_pagamento, tipo, descontos, total_geral, data_cadastro, situacao, vendedor, contato, data_cadastro, data_cadastro, data_cadastro, quantidade_parcelas, observacoes, observacoes2, data_recadastro],
            async    (err: any, result: any) => {
                if (err) {
                    console.log(err)
                     reject(err)
                } else {
                    codigo_pedido =  result.insertId;
                    
                    if (produtos.length > 0) {
                       try{
                           await this.cadastraProdutosDoPedido(produtos, codigo_pedido);
                        }catch(e){ console.log('erro ao cadastrar pedido no sistema ',e)} 
                    }


                    if(parcelas.length > 0 ){
                            try{
                             await this.cadastraParcelasDoPeidido(parcelas, codigo_pedido);
                            }catch(e) {
                                console.log(' erro ao cadastrar parcelas do pedido ',e)
                            }    
                       }

                       if(servicos.length > 0  ){
                            try{
                                await this.cadastraServicosDoPedido(servicos, codigo_pedido);
                            }catch(e){console.log(' erro ao inserir servicos do pedido',e)}
                       }
                        resolve(codigo_pedido) ;
                    }
                }
            )

        })

    }
 
	async cadastraProdutosDoPedido(produtos:IProdutoPedidoSistema[] , codigoPedido:any ){
		return new Promise( async (resolve, reject )=>{

			let i=1;
			for(let p of produtos){
                let {
                    id,
                    preco,
                    quantidade,
                    desconto,
                    just_icms,
                    just_ipi,
                    just_subst,
                    total,
                    fator_val,
                    fator_qtde,
                    tabela,
                } = p

                 if( !preco) preco = 0;
                 if( !quantidade) quantidade = 0;
                 if( !desconto) desconto = 0;
                 if( !just_icms) just_icms = '';
                 if( !just_ipi) just_ipi = '';
                 if( !just_subst) just_subst = '';
                 if( !total) total = 0;
                 if ( !fator_val ) fator_val = 1;
                 if ( !fator_qtde ) fator_qtde = 1;
                 if ( !tabela ) tabela = 1; 
			 
             const sql =  `INSERT INTO ${db_vendas}.pro_orca (orcamento, sequencia, produto, fator_val, fator_qtde, unitario, quantidade, preco_tabela, desconto, tabela,  just_ipi, just_icms, just_subst, total_liq, unit_orig)
                VALUES ( 
                    '${codigoPedido}',
                    '${i}',
                    '${id}',
                    '${fator_val}',
                    '${fator_qtde}',
                    '${preco}',
                    '${quantidade}',
                    '${preco}',
                    '${desconto}',  
                    '${tabela}',  
                    '${just_ipi}',  
                    '${just_icms}',  
                    '${just_subst}',  
                    '${total}',  
                    '${preco}'  
                ) `;

			  await conn_sistema.query( sql, (error:any, resultado:any)=>{
				   if(error){
						   reject(" erro ao inserir produto do orcamento "+ error);
				   }else{
					resolve(resultado)
					   console.log(`produto  inserido com sucesso`);
				   }
				})

				if(i === produtos.length){
					return;
				}
				i++;
			}
		})
    }


    async cadastraParcelasDoPeidido(parcelas:IParcelasPedidoMobile[], codigoPedido:any){
        return new Promise( async (resolve, reject )=>{

        parcelas.forEach( async (p: any) => {
            let vencimento = this.converterData(p.vencimento);
        await    conn_sistema.query(
                ` INSERT INTO ${db_vendas}.par_orca ( ORCAMENTO, PARCELA, VALOR , VENCIMENTO, TIPO_RECEB)
                                                     VALUES ( ?,?,?,?,?)`,
                [codigoPedido, p.parcela, p.valor, p.vencimento, 1], (err: any, resultParcelas:any) => {
                    if (err) {
                        console.log("erro ao inserir parcelas !" + err)
                        reject(err)
                    } else {
                        console.log('  Parcela inserida com sucesso ', resultParcelas)
                        resolve(resultParcelas)
                    }
                }
            )
        })
    })

    }

        async cadastraServicosDoPedido( servicos:IServicosPedidoSistema[], codigoPedido:any ){
            return new Promise( async (resolve, reject )=>{

            if (servicos.length > 0) {

                let j=1;

                for(let i of servicos ){

                  
                    await conn_sistema.query(
                        ` INSERT INTO ${db_vendas}.ser_orca ( ORCAMENTO , SEQUENCIA, SERVICO, QUANTIDADE, UNITARIO, DESCONTO, PRECO_TABELA )
                            VALUES ( ?, ?, ?, ?, ?, ?, ?  ) `,
                        [codigoPedido, j, i.codigo, i.quantidade, i.valor, i.desconto, i.valor ], (err: any, resultServicos:any) => {
                            if (err) {
                                console.log(`ocorreu um erro ao inserir os servicos`, err)
                                reject(err)
                            } else {
                                console.log(" Servico inserido com sucesso ", resultServicos);
                                resolve(resultServicos)
                            }
                        }
                    )
                    if(j === servicos.length){
                        return;
                    }
                    j++;
                }
            } 
        })
    }

}