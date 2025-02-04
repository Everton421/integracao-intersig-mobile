"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectItemsPedidoSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectItemsPedidoSistema {
    async buscaProdutosDoOrcamento(codigo_orcamento) {
        let sql = `
                     select 
                      po.orcamento pedido , 
                      po.produto codigo,
                      cp.descricao,
                      po.fator_qtde as quantidade,
                      po.unitario as preco,
                      po.desconto,
                      po.total_liq as total  
                          from ${databaseConfig_1.db_vendas}.pro_orca po
                         left join ${databaseConfig_1.db_publico}.cad_prod cp on cp.codigo = po.produto
                          where po.orcamento = ${codigo_orcamento} ;`;
        return new Promise(async (resolve, reject) => {
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async buscaServicosDoOrcamento(codigo_orcamento) {
        let sql = `
                             select  
                             cs.codigo, so.orcamento pedido, 
                             cs.aplicacao ,so.quantidade ,
                              so.desconto, so.unitario valor,
                                ( (so.quantidade * so.unitario) - desconto ) as total 
                                  from ${databaseConfig_1.db_vendas}.ser_orca so 
                                  join ${databaseConfig_1.db_publico}.cad_serv cs 
                                  on cs.codigo = so.servico
                                  where so.orcamento = ?  ;`;
        return new Promise(async (resolve, reject) => {
            await databaseConfig_1.conn_sistema.query(sql, [codigo_orcamento], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(result);
                    // console.log(result);
                }
            });
        });
    }
    async buscaParcelasDoOrcamento(codigo_orcamento) {
        let sql = `
                             select   orcamento pedido, parcela, valor, DATE_FORMAT(vencimento, '%Y-%m-%d') as vencimento    from ${databaseConfig_1.db_vendas}.par_orca where orcamento = ?  ;`;
        return new Promise(async (resolve, reject) => {
            await databaseConfig_1.conn_sistema.query(sql, [codigo_orcamento], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(result);
                    // console.log(result);
                }
            });
        });
    }
}
exports.SelectItemsPedidoSistema = SelectItemsPedidoSistema;
