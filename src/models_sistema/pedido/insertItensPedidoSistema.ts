import { conn_sistema, db_vendas } from "../../database/databaseConfig";
import { IParcelasPedidoMobile } from "../../models_mobile/pedido/types/IParcelasPedido";
import { IProdutoPedidoSistema } from "./types/IProdutoPedidoSistema";
import { IServicosPedidoSistema } from "./types/IServicosPedidoSistema";


export class InsertItensPedidoSistema{

    async cadastraProdutosDoPedido(produtos:IProdutoPedidoSistema[] , codigoPedido:any ){
		return new Promise( async (resolve, reject )=>{
          
         if( produtos.length > 0 ){

			let i=1;
			for(let p of produtos){
                let {
                    id,
                    codigo,
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
                    '${codigo}',
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
                    console.log(" erro ao inserir produto do orcamento ", error)
						   reject( error);
				   }else{
					   console.log(`produto  inserido com sucesso`,resultado);

					resolve(resultado)
				   }
				})

				if(i === produtos.length){
					return;
				}
				i++;
			}
			}else{
                console.log('nenhum produto informado')
            }

		})
    }


    async cadastraParcelasDoPeidido(parcelas:IParcelasPedidoMobile[], codigoPedido:any){
        return new Promise( async (resolve, reject )=>{

        parcelas.forEach( async (p: any) => {
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