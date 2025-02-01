import { conn_sistema, db_publico, db_vendas } from "../../database/databaseConfig";

export class SelectItemsPedidoSistema{

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
    
}