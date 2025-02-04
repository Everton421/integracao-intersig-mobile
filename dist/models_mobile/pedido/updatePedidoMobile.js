"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePedidoMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
const select_1 = require("../cliente/select");
const selectItemsPedidoMobile_1 = require("./selectItemsPedidoMobile");
const insertItensPedidoMobile_1 = require("./insertItensPedidoMobile");
const deleteItensPedidoMobile_1 = require("./deleteItensPedidoMobile");
const select_2 = require("../produtos/select");
const select_3 = require("../servicos/select");
const produtos_1 = require("../../controllers/produtos/produtos");
const select_4 = require("../../models_sistema/produtos/select");
class UpdatePedidoMobile {
    async updateTabelaPedido(empresa, orcamento, codigo) {
        return new Promise(async (resolve, reject) => {
            let sql = `
                UPDATE ${empresa}.pedidos  
                set 
                cliente             =  ${orcamento.cliente.codigo},
                total_geral         =  ${orcamento.total_geral} ,
                total_produtos      =  ${orcamento.total_produtos} ,
                total_servicos      =  ${orcamento.total_servicos} ,
                tipo_os             =  ${orcamento.tipo_os},
                tipo                =  ${orcamento.tipo},
                quantidade_parcelas =  ${orcamento.quantidade_parcelas} ,
                contato             = '${orcamento.contato}',
                veiculo             =  ${orcamento.veiculo},
                forma_pagamento     =  ${orcamento.forma_pagamento},
                observacoes         = '${orcamento.observacoes}',
                data_cadastro       = '${orcamento.data_cadastro}',
                data_recadastro     = '${orcamento.data_recadastro}',
                enviado             = 'S',
                observacoes         =  '${orcamento.observacoes}',
                situacao            = '${orcamento.situacao}'
                where codigo = ${codigo}
            `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result.affectedRows);
                }
            });
        });
    }
    async update(empresa, orcamento, codigoOrcamento) {
        return new Promise(async (resolve, reject) => {
            let produtoController = new produtos_1.ProdutoController();
            let selectClientesMobile = new select_1.Select_clientes_mobile();
            let selectItemsPedidoMobile = new selectItemsPedidoMobile_1.SelectItemsPedidoMobile();
            let insertItensPedidoMobile = new insertItensPedidoMobile_1.InsertItensPedidoMobile();
            let deleteItensPedidoMobile = new deleteItensPedidoMobile_1.DeleteItensPedidoMobile();
            let selectProdutosMobile = new select_2.SelectProdutosMobile();
            let selectServicosMobile = new select_3.SelectServicosMobile();
            let selectProdutosSistema = new select_4.SelectProdutosSistema();
            const servicos = orcamento.servicos;
            const parcelas = orcamento.parcelas;
            const produtos = orcamento.produtos;
            let statusAtualizacao;
            let statusDeletePro_orca;
            let statusDeletePar_orca;
            const validCliente = await selectClientesMobile.buscaPorId(databaseConfig_1.databaseMobile, orcamento.cliente.codigo);
            if (validCliente.length > 0) {
                orcamento.cliente = validCliente[0];
            }
            try {
                statusAtualizacao = await this.updateTabelaPedido(empresa, orcamento, codigoOrcamento);
                console.log('status atualizacao pedido ', statusAtualizacao);
            }
            catch (err) {
                reject(err);
                return;
            }
            const validaServicos = await selectItemsPedidoMobile.buscaServicosDoOrcamento(empresa, codigoOrcamento);
            if (validaServicos.length > 0) {
                try {
                    await deleteItensPedidoMobile.deleteServicosPedido(empresa, codigoOrcamento);
                }
                catch (e) {
                    reject(e);
                    return;
                }
            }
            if (servicos.length > 0) {
                try {
                    await insertItensPedidoMobile.cadastraServicosDoPedido(servicos, codigoOrcamento, empresa);
                }
                catch (e) {
                    reject(e);
                    return;
                }
            }
            const validaProdutos = await selectItemsPedidoMobile.buscaProdutosDoOrcamento(empresa, codigoOrcamento);
            if (validaProdutos.length > 0) {
                try {
                    statusDeletePro_orca = await deleteItensPedidoMobile.deleteProdutosPedido(empresa, codigoOrcamento);
                }
                catch (err) {
                    reject(err);
                    return;
                }
            }
            if (produtos.length > 0) {
                try {
                    await insertItensPedidoMobile.cadastraProdutosDoPedido(produtos, empresa, codigoOrcamento);
                }
                catch (err) {
                    reject(err);
                    return;
                }
            }
            const validaParcelas = await selectItemsPedidoMobile.buscaParcelasDoOrcamento(empresa, codigoOrcamento);
            if (validaParcelas.length > 0) {
                if (statusAtualizacao) {
                    try {
                        statusDeletePar_orca = await deleteItensPedidoMobile.deleteParcelasPedido(empresa, codigoOrcamento);
                    }
                    catch (err) {
                        reject(err);
                        return;
                    }
                }
                if (statusDeletePar_orca) {
                    try {
                        await insertItensPedidoMobile.cadastraParcelasDoPedido(parcelas, empresa, codigoOrcamento);
                    }
                    catch (err) {
                        reject(err);
                        return;
                    }
                }
            }
            resolve(codigoOrcamento);
        });
    }
}
exports.UpdatePedidoMobile = UpdatePedidoMobile;
