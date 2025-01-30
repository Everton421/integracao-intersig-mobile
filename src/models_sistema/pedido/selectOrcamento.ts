import { Request, Response, request, response } from "express";
import { conn_sistema, db_vendas, db_estoque, db_publico } from "../../database/databaseConfig";
import { PedidoSimples } from "./types/IPedidoSistema";
import { DateService } from "../../services/date";



export class SelectOrcamentoSistema{



      
       formatarData(data: string): string | null {
        const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        if (!regex.test(data)) {
            return null;
        }
        return data;
    }

      obterDataAtualSemHoras() {
        const dataAtual = new Date();
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const ano = dataAtual.getFullYear();
        return `${ano}-${mes}-${dia} 00-00-00`;
    }

      dataHora ( data:any  ) {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        const segundos = String(data.getSeconds()).padStart(2, '0');
        return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    }

       formatadataAtual ( data:any   ) {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        const segundos = String(data.getSeconds()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    }
    



    async buscaOrcamentosDoDia(request: Request, response: Response) {

        function obterDataAtual() {
            const dataAtual = new Date();
            const dia = String(dataAtual.getDate()).padStart(2, '0');
            const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
            const ano = dataAtual.getFullYear();
            return `${ano}-${mes}-${dia}`;
        }

        let aux = obterDataAtual();
        let filtro;
        let parametros: any;

        let vend:any = request.query.vendedor
        let vendedor:number = parseInt( aux );
        let parametro: any = request.query.parametro;

        if (!vendedor || vendedor === undefined) {
            vendedor = 0
        }
        //  console.log(vendedor);

        if (parametro !== '*') {
            filtro = `( cli.nome LIKE ? or co.codigo like ? ) AND co.vendedor = ${vendedor} `;
            parametros = [`%${parametro}%`, `%${parametro}%`, vendedor];
        } else {
            // busca os dadso com a data de hj, caso nao tenha sido passado nenhum parametro
            filtro = `co.data_cadastro LIKE ? and co.vendedor = ${vendedor}`;
            parametros = [`%${aux}%`];
        }

        const sql = `
        SELECT co.codigo, co.total_geral, cli.nome, co.data_cadastro, co.situacao, co.vendedor,co.tipo, 
         DATE_FORMAT( co.data_cadastro, '%Y-%m-%d') as data_cadastro
        FROM ${db_vendas}.cad_orca co
        JOIN ${db_publico}.cad_clie cli ON cli.codigo = co.cliente
        WHERE ${filtro};
    `;
        console.log(sql);

        return new Promise(async (resolve, reject) => {
            await conn_sistema.query(sql, parametros, (err:any, result:any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    // console.log(result);
                    if (result.length > 0) {
                        resolve(response.json(result));
                    } else {
                        return response.status(500).json("nenhum Orçamento encontrado")
                    }
                }
            })

        })

    }

    async validaOrcamento( codigo: any, vendedor:number ) {
        return new Promise(async (resolve, reject) => {

            const code = parseInt(codigo)

            const sql = ` select * from ${db_vendas}.cad_orca where COD_SITE = ${code} and vendedor = ${vendedor} `
            conn_sistema.query(sql, (err:any, result:any) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    // console.log(result)
                    resolve(result);
                }
            })

        })
    }
     

    async buscaOrcamentoCod_site( codigo: any  ) :Promise< PedidoSimples[]>{
        return new Promise(async (resolve, reject) => {

            const code = parseInt(codigo)

            const sql = ` select CODIGO codigo ,COD_SITE cod_site,
                 DATE_FORMAT( DATA_CADASTRO, '%Y-%m-%d') AS data_cadastro,
        DATE_FORMAT( DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
              from ${db_vendas}.cad_orca where COD_SITE = ${code} `
            conn_sistema.query(sql, (err:any, result:any) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    // console.log(result)
                    resolve(result);
                }
            })

        })
    }
    

    async buscaOrcamentoCod_siteVendedorData( codigo: any, data:any , vendedor:number ) {
        return new Promise(async (resolve, reject) => {

            const code = parseInt(codigo)

            const sql = ` select CODIGO ,
                 DATE_FORMAT( DATA_CADASTRO, '%Y-%m-%d') AS data_cadastro,
        DATE_FORMAT( DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
              from ${db_vendas}.cad_orca 
              where
               COD_SITE = ${code} and vendedor = ${vendedor}
                and co.data_recad  >= '${data}'
               `

            conn_sistema.query(sql, (err:any, result:any) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    // console.log(result)
                    resolve(result);
                }
            })

        })
    }
    async   buscaProdutosDoOrcamento(codigo_orcamento: any) {
        let sql  = `
                 select 
                  po.orcamento pedido , 
                  po.produto codigo,
                  cp.descricao,
                  po.fator_qtde as quantidade,
                  po.unitario as preco,
                  po.desconto,
                  po.total_liq as total  
                      from ${db_vendas}.pro_orca po
                     left join ${db_publico}.cad_prod cp on cp.codigo = po.produto
                      where po.orcamento = ${codigo_orcamento} ;`

            return new Promise( async (resolve, reject) => {
               await conn_sistema.query(sql , (err:any, result:any) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
    }
 

    async  buscaServicosDoOrcamento(codigo_orcamento: any) {
        let sql = `
                         select  
                         cs.codigo, so.orcamento pedido, 
                         cs.aplicacao ,so.quantidade ,
                          so.desconto, so.unitario valor,
                            ( (so.quantidade * so.unitario) - desconto ) as total 
                              from ${db_vendas}.ser_orca so 
                              join ${db_publico}.cad_serv cs 
                              on cs.codigo = so.servico
                              where so.orcamento = ?  ;`

        return new Promise( async (resolve, reject) => {

            await conn_sistema.query(sql, [codigo_orcamento], (err:any, result:any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                    // console.log(result);
                }
            })
        })
    }

    async  buscaParcelasDoOrcamento(codigo_orcamento: any) {
        let sql = `
                         select   orcamento pedido, parcela, valor, DATE_FORMAT(vencimento, '%Y-%m-%d') as vencimento    from ${db_vendas}.par_orca where orcamento = ?  ;`

        return new Promise( async (resolve, reject) => {

           await conn_sistema.query(sql, [codigo_orcamento], (err:any, result:any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                    // console.log(result);
                }
            })
        })
    }


    async buscaPordata( queryData:any, vendedor:any ) {
        
        function formatarData(data: string): string | null {
            const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
            if (!regex.test(data)) {
                return null;
            }
            return data;
        }

        function obterDataAtualSemHoras() {
            const dataAtual = new Date();
            const dia = String(dataAtual.getDate()).padStart(2, '0');
            const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
            const ano = dataAtual.getFullYear();
            return `${ano}-${mes}-${dia} 00-00-00`;
        }
        
        let param_data;
    
        if (!queryData) {
            param_data = obterDataAtualSemHoras();
        } 

        const sql = ` SELECT 
               co.codigo as orcamento,
               co.cod_site,
               co.total_geral,
               cli.codigo as codigo_cliente,
               co.forma_pagamento,
               co.contato,
               co.situacao,
               cli.nome , 
                cli.cpf cnpj,
                cli.celular celular,
               co.qtde_parcelas quantidade_parcelas, 
               co.total_produtos total_produtos,
               co.total_servicos total_servicos,
               cli.nome,
               co.data_cadastro,
               co.vendedor,
               co.data_recad data_recadastro,
              CAST( co.observacoes AS char ) observacoes ,
               co.desc_serv,
               co.desc_prod ,
               co.veiculo veiculo,
               co.tipo_os,
               co.tipo
             from ${db_vendas}.cad_orca co
                           left join ${db_publico}.cad_clie cli on cli.codigo = co.cliente
                            where co.data_recad  >= '${param_data}' and co.vendedor = ${vendedor}
                            ;
                        `;

      return new Promise( async ( resolve, reject )=>{

        await conn_sistema.query(sql,   async (err:any, result:any ) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
           resolve(result)
            }
        })
    }) 

    }


    async buscaTodos(codigo:number  ) {

        const sql = ` SELECT 
               co.codigo as codigo,
               co.cod_site,
               co.total_geral,
               cli.codigo as codigo_cliente,
               co.forma_pagamento,
               co.contato,
               co.situacao,
               cli.nome , 
                cli.cpf cnpj,
                cli.celular celular,
               co.qtde_parcelas quantidade_parcelas, 
               co.total_produtos total_produtos,
               co.total_servicos total_servicos,
               cli.nome,
               co.data_cadastro,
               co.vendedor,
               co.data_recad data_recadastro,
              CAST( co.observacoes AS char ) observacoes ,
               co.desc_serv,
               co.desc_prod ,
               co.veiculo veiculo,
               co.tipo_os,
               co.tipo
             from ${db_vendas}.cad_orca co
                           left join ${db_publico}.cad_clie cli on cli.codigo = co.cliente
                           where co.COD_SITE = ${codigo}
                            ;
                        `;

      return new Promise( async ( resolve, reject )=>{

        await conn_sistema.query(sql,   async (err:any, result:any ) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
           resolve(result)
            }
        })
    }) 

    }


    async buscaPorCodigo(codigo:number  ) {

        const sql = ` SELECT 
    co.codigo as orcamento,
    co.cod_site,
    co.total_geral,
    cli.codigo as codigo_cliente,
    co.forma_pagamento,
    co.contato,
    co.situacao,
    cli.nome , 
     cli.cpf cnpj,
     cli.celular celular,
    co.qtde_parcelas quantidade_parcelas, 
    co.total_produtos total_produtos,
    co.total_servicos total_servicos,
    cli.nome,
    co.data_cadastro,
    co.vendedor,
    co.data_recad data_recadastro,
   CAST( co.observacoes AS char ) observacoes ,
    co.desc_serv,
    co.desc_prod ,
    co.veiculo veiculo,
    co.tipo_os,
    co.tipo
  from ${db_vendas}.cad_orca co
                left join ${db_publico}.cad_clie cli on cli.codigo = co.cliente
                where co. codigo = ${codigo}
                        `;

      return new Promise( async ( resolve, reject )=>{

        await conn_sistema.query(sql,   async (err:any, result:any ) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
             //   console.log(result)
           resolve(result)
            }
        })
    }) 

    }




     async buscaOrcamentosCompleto( codigo:number ){
            const select = new SelectOrcamentoSistema();
           
            const dateService = new DateService(); 

            const dados_orcamentos:any  = await select.buscaTodos(codigo );
    
            let orcamentos_registrados:any=[];
    
            if( dados_orcamentos.length > 0 ){
          
            const promises  = dados_orcamentos.map( async ( i:any )=>{
                let produtos: any = [];
                let servicos: any = [];
                let parcelas: any = [];
                    
                        try {
                            servicos = await select.buscaServicosDoOrcamento(i.codigo);
                            if (servicos.length === 0 ) servicos = [];
                        } catch (error) {
                            console.log('erro ao buscar os servicos do orcamento ', i.codigo);
                        }
                        try {
                            parcelas = await select.buscaParcelasDoOrcamento(i.codigo);
                            if (parcelas.length === 0 ) parcelas = [];
                        } catch (error) {
                            console.log('erro ao buscar os servicos do orcamento ', i.codigo);
                        }
                        try {
                            produtos = await  select.buscaProdutosDoOrcamento(i.codigo);   
                            if(produtos.length === 0 ) produtos = [];
     
                         } catch (error) {
                                 console.log('erro ao buscar os produtos do orcamento ', i.codigo );
                         }
    
    
                    const descontos = ( i.desc_prod + i.desc_serv);
                    const data_cadastro =  dateService.formatarData(i.data_cadastro);
                    const data_recadastro = dateService.formatarDataHora(i.data_recadastro) 
                    
    
                    let  data = {
                        "cliente": {
                            "codigo":  i.codigo_cliente,
                            "nome":  i.nome,
                            "cnpj": i.cnpj,
                            "celular": i.celular,
                                 },
                        "codigo"               : i.codigo,
                        "codigo_site"          : i.cod_site, 
                        "situacao"             : i.situacao,
                        "total_geral"          : i.total_geral,
                        "total_produtos"       : i.total_produtos,
                        "total_servicos"       : i.total_servicos,
                        "quantidade_parcelas"  : i.quantidade_parcelas,
                        "forma_pagamento"      : i.forma_pagamento,
                        "contato"              : i.contato,
                        "vendedor"             : i.vendedor,
                        "data_recadastro"      : data_recadastro,
                        "data_cadastro"        : data_cadastro,
                        "veiculo"              : i.veiculo,
                        "observacoes"          : i.observacoes,
                        "tipo_os"              : i.tipo_os,
                        "tipo"                 : i.tipo,
                        "descontos"            : descontos,
                        "produtos"             : produtos,
                        "parcelas"             : parcelas,
                        "servicos"             : servicos
                    }
                     
    
                    orcamentos_registrados.push(data);
                })
                await Promise.all(promises);
            }
    //        console.log(produtos)
         
                return orcamentos_registrados 
 
                return dados_orcamentos
        }
    

}