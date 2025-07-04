"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectItemsPedidoMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
const date_1 = require("../../services/date");
class SelectItemsPedidoMobile {
    async buscaProdutosDoOrcamento(empresa, codigo) {
        return new Promise(async (resolve, reject) => {
            const sql = ` select 
                            pp.pedido,
                           -- pp.codigo,
                            pp.desconto,
                            pp.quantidade,
                            pp.preco,
                            pp.total,
                             p.id,
                              p.codigo
                            from ${empresa}.produtos_pedido pp 
                                join ${empresa}.produtos p on p.codigo = pp.codigo 
                            where pp.pedido = ? `;
            await databaseConfig_1.conn_mobie.query(sql, [codigo], async (err, result) => {
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
    async buscaServicosDoOrcamento(empresa, codigo) {
        return new Promise(async (resolve, reject) => {
            const sql = ` select
                    sp.pedido,
                    s.id ,
                    s.codigo,
                    sp.desconto,
                    sp.quantidade,
                    sp.valor,
                    sp.total
                  from ${empresa}.servicos_pedido sp
                  join ${empresa}.servicos s  on sp.codigo = s.codigo
                  where sp.pedido = ? `;
            await databaseConfig_1.conn_mobie.query(sql, [codigo], async (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async buscaParcelasDoOrcamento(empresa, codigo) {
        return new Promise(async (resolve, reject) => {
            const sql = ` select *,  DATE_FORMAT(vencimento, '%Y-%m-%d') AS vencimento   from ${empresa}.parcelas where pedido = ? `;
            await databaseConfig_1.conn_mobie.query(sql, [codigo], async (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async validaExistenciaPedido(empresa, codigo) {
        return new Promise(async (resolve, reject) => {
            const code = codigo;
            const sql = ` select * from ${empresa}.pedidos where codigo =  ?  `;
            databaseConfig_1.conn_mobie.query(sql, [code], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    // console.log(result)
                    resolve(result);
                }
            });
        });
    }
    async busca_data_vendedor(empresa, queryData, vendedor) {
        let date = new date_1.DateService();
        let param_data;
        if (!queryData) {
            param_data = date.obterDataAtual();
        }
        return new Promise(async (resolve, reject) => {
            const sql = `select *, CONVERT(observacoes USING utf8) as observacoes from ${empresa}.pedidos as co
                where   co.data_recadastro >= '${param_data}' and co.vendedor = ${vendedor}
            `;
            await databaseConfig_1.conn_mobie.query(sql, async (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(result); // Use type assertion here
                }
            });
        });
    }
    async buscaTodosPedidos(empresa) {
        return new Promise(async (resolve, reject) => {
            const sql = ` select * from ${empresa}.pedidos  `;
            databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    // console.log(result)
                    resolve(result);
                }
            });
        });
    }
}
exports.SelectItemsPedidoMobile = SelectItemsPedidoMobile;
