"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectPedidoMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
const date_1 = require("../../services/date");
const select_1 = require("../cliente/select");
const selectItemsPedidoMobile_1 = require("./selectItemsPedidoMobile");
class SelectPedidoMobile {
    async buscaCompleta(empresa, dataAtual) {
        let obj = new date_1.DateService();
        let selectOrcamentoMobile = new SelectPedidoMobile();
        let selectClientesMobile = new select_1.Select_clientes_mobile();
        let selectItemsPedidoMobile = new selectItemsPedidoMobile_1.SelectItemsPedidoMobile();
        let orcamentos_registrados = []; // Inicializar como um array vazio
        try {
            let dados_orcamentos = await selectOrcamentoMobile.buscaPordata(empresa, dataAtual);
            orcamentos_registrados = await Promise.all(dados_orcamentos.map(async (i) => {
                let produtos = [];
                let servicos = [];
                let parcelas = [];
                let cliente = 0;
                i.data_recadastro = obj.formatarDataHora(i.data_recadastro);
                i.data_cadastro = obj.formatarData(new Date(i.data_cadastro));
                try {
                    const resultCliente = await selectClientesMobile.buscaPorcodigo(empresa, i.cliente);
                    if (resultCliente.length > 0) {
                        cliente = resultCliente[0].id;
                    }
                }
                catch (e) {
                    console.log(`erro ao buscar o cliente do pedido ${i.codigo}`);
                }
                try {
                    produtos = await selectItemsPedidoMobile.buscaProdutosDoOrcamento(empresa, i.codigo);
                }
                catch (e) {
                    console.log(`erro ao buscar os produtos do pedido ${i.codigo}`);
                }
                try {
                    servicos = await selectItemsPedidoMobile.buscaServicosDoOrcamento(databaseConfig_1.databaseMobile, i.codigo);
                }
                catch (e) {
                    console.log(`erro ao buscar os servicos do pedido ${i.codigo}`);
                }
                try {
                    parcelas = await selectItemsPedidoMobile.buscaParcelasDoOrcamento(databaseConfig_1.databaseMobile, i.codigo);
                }
                catch (e) {
                    console.log(`erro ao buscar as parcelas do pedido ${i.codigo}`);
                }
                return {
                    ...i,
                    produtos,
                    servicos,
                    parcelas,
                    cliente,
                };
            }));
            return orcamentos_registrados;
        }
        catch (error) {
            console.error("Erro ao buscar orcamentos:", error);
            return []; // Retornar um array vazio em caso de erro
        }
    }
    async validaExistencia(empresa, codigo) {
        return new Promise(async (resolve, reject) => {
            const code = codigo;
            const sql = ` select * from ${empresa}.pedidos where codigo =  ?  `;
            databaseConfig_1.conn_sistema.query(sql, [code], (err, result) => {
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
    async buscaPordata(empresa, queryData) {
        return new Promise(async (resolve, reject) => {
            const sql = ` SELECT *, CONVERT(observacoes USING utf8) AS observacoes FROM ${empresa}.pedidos  
                WHERE  data_recadastro >= '${queryData}'  
            `;
            await databaseConfig_1.conn_sistema.query(sql, async (err, result) => {
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
    async buscaTodos(empresa) {
        return new Promise(async (resolve, reject) => {
            const sql = ` select * from ${empresa}.pedidos  `;
            databaseConfig_1.conn_sistema.query(sql, (err, result) => {
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
exports.SelectPedidoMobile = SelectPedidoMobile;
