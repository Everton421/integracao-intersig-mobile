"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectOrcamentoSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
const date_1 = require("../../services/date");
const selectItensPedidoSistema_1 = require("./selectItensPedidoSistema");
class SelectOrcamentoSistema {
    async buscaTodos(codigo) {
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
             from ${databaseConfig_1.db_vendas}.cad_orca co
                           left join ${databaseConfig_1.db_publico}.cad_clie cli on cli.codigo = co.cliente
                           where co.COD_SITE = ${codigo}
                            ;
                        `;
        return new Promise(async (resolve, reject) => {
            await databaseConfig_1.conn_sistema.query(sql, async (err, result) => {
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
    async buscaOrcamentosCompleto(codigo) {
        const select = new SelectOrcamentoSistema();
        const selectItemsPedidoSistema = new selectItensPedidoSistema_1.SelectItemsPedidoSistema();
        const dateService = new date_1.DateService();
        const dados_orcamentos = await select.buscaTodos(codigo);
        let orcamentos_registrados = [];
        if (dados_orcamentos.length > 0) {
            const promises = dados_orcamentos.map(async (i) => {
                let produtos = [];
                let servicos = [];
                let parcelas = [];
                try {
                    servicos = await selectItemsPedidoSistema.buscaServicosDoOrcamento(i.codigo);
                    if (servicos.length === 0)
                        servicos = [];
                }
                catch (error) {
                    console.log('erro ao buscar os servicos do orcamento ', i.codigo);
                }
                try {
                    parcelas = await selectItemsPedidoSistema.buscaParcelasDoOrcamento(i.codigo);
                    if (parcelas.length === 0)
                        parcelas = [];
                }
                catch (error) {
                    console.log('erro ao buscar os servicos do orcamento ', i.codigo);
                }
                try {
                    produtos = await selectItemsPedidoSistema.buscaProdutosDoOrcamento(i.codigo);
                    if (produtos.length === 0)
                        produtos = [];
                }
                catch (error) {
                    console.log('erro ao buscar os produtos do orcamento ', i.codigo);
                }
                const descontos = (i.desc_prod + i.desc_serv);
                const data_cadastro = dateService.formatarData(i.data_cadastro);
                const data_recadastro = dateService.formatarDataHora(i.data_recadastro);
                let data = {
                    "cliente": {
                        "codigo": i.codigo_cliente,
                        "nome": i.nome,
                        "cnpj": i.cnpj,
                        "celular": i.celular,
                    },
                    "codigo": i.codigo,
                    "codigo_site": i.cod_site,
                    "situacao": i.situacao,
                    "total_geral": i.total_geral,
                    "total_produtos": i.total_produtos,
                    "total_servicos": i.total_servicos,
                    "quantidade_parcelas": i.quantidade_parcelas,
                    "forma_pagamento": i.forma_pagamento,
                    "contato": i.contato,
                    "vendedor": i.vendedor,
                    "data_recadastro": data_recadastro,
                    "data_cadastro": data_cadastro,
                    "veiculo": i.veiculo,
                    "observacoes": i.observacoes,
                    "tipo_os": i.tipo_os,
                    "tipo": i.tipo,
                    "descontos": descontos,
                    "produtos": produtos,
                    "parcelas": parcelas,
                    "servicos": servicos
                };
                orcamentos_registrados.push(data);
            });
            await Promise.all(promises);
        }
        //        console.log(produtos)
        return orcamentos_registrados;
        return dados_orcamentos;
    }
}
exports.SelectOrcamentoSistema = SelectOrcamentoSistema;
