"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertPedidoSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
const insertItensPedidoSistema_1 = require("./insertItensPedidoSistema");
class InsertPedidoSistema {
    converterData(data) {
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
    async create(orcamento) {
        let insertItensPedidoSistema = new insertItensPedidoSistema_1.InsertItensPedidoSistema();
        return new Promise(async (resolve, reject) => {
            const dataAtual = this.obterDataAtual();
            let codigo_pedido;
            let { codigo, forma_pagamento, cliente, descontos, observacoes, observacoes2, quantidade_parcelas, total_geral, total_produtos, total_servicos, situacao, tipo, vendedor, data_cadastro, data_recadastro, veiculo, tipo_os, contato, just_ipi, just_icms, just_subst, } = orcamento;
            contato = 'APP';
            const servicos = orcamento.servicos;
            const parcelas = orcamento.parcelas;
            const produtos = orcamento.produtos;
            if (!situacao)
                situacao = 'EA';
            if (!vendedor)
                vendedor = 1;
            if (!tipo_os)
                tipo_os = 0;
            if (!veiculo)
                veiculo = 0;
            if (!data_cadastro)
                data_cadastro = dataAtual;
            if (!data_recadastro)
                data_recadastro = dataAtual;
            if (!total_servicos)
                total_servicos = 0;
            if (!observacoes)
                observacoes = '';
            if (!observacoes2)
                observacoes2 = '';
            if (!just_ipi)
                just_ipi = '';
            if (!just_icms)
                just_icms = '';
            if (!just_subst)
                just_subst = '';
            if (!forma_pagamento)
                forma_pagamento = 0;
            if (!descontos)
                descontos = 0;
            if (!quantidade_parcelas)
                quantidade_parcelas = 0;
            await databaseConfig_1.conn_sistema.query(`INSERT INTO ${databaseConfig_1.db_vendas}.cad_orca ` +
                `(cliente, cod_site, veiculo, total_produtos,total_servicos, forma_pagamento, tipo,  tipo_os, DESC_PROD, TOTAL_GERAL, DATA_CADASTRO, SITUACAO,VENDEDOR,CONTATO , DATA_INICIO,DATA_PEDIDO, DATA_APROV, QTDE_PARCELAS, OBSERVACOES,OBSERVACOES2, USUARIO, DATA_RECAD)  
                VALUES ( ? ,?, ?, ?, ?, ?, ?, ?, ? , ? , ? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [cliente, codigo, veiculo, total_produtos, total_servicos, forma_pagamento, tipo, tipo_os, descontos, total_geral, data_cadastro, situacao, vendedor, contato, data_cadastro, data_cadastro, data_cadastro, quantidade_parcelas, observacoes, observacoes2, vendedor, data_recadastro], async (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    codigo_pedido = result.insertId;
                    if (produtos.length > 0) {
                        try {
                            await insertItensPedidoSistema.cadastraProdutosDoPedido(produtos, codigo_pedido);
                        }
                        catch (e) {
                            console.log('erro ao cadastrar pedido no sistema ', e);
                        }
                    }
                    if (parcelas.length > 0) {
                        try {
                            await insertItensPedidoSistema.cadastraParcelasDoPeidido(parcelas, codigo_pedido);
                        }
                        catch (e) {
                            console.log(' erro ao cadastrar parcelas do pedido ', e);
                        }
                    }
                    if (servicos.length > 0) {
                        try {
                            await insertItensPedidoSistema.cadastraServicosDoPedido(servicos, codigo_pedido);
                        }
                        catch (e) {
                            console.log(' erro ao inserir servicos do pedido', e);
                        }
                    }
                    resolve(codigo_pedido);
                }
            });
        });
    }
}
exports.InsertPedidoSistema = InsertPedidoSistema;
