"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pedidosController = void 0;
const selectPedidoMobile_1 = require("../../models_mobile/pedido/selectPedidoMobile");
const updatePedidoMobile_1 = require("../../models_mobile/pedido/updatePedidoMobile");
const date_1 = require("../../services/date");
const selectOrcamento_1 = require("../../models_sistema/pedido/selectOrcamento");
const insert_1 = require("../../models_integracao/pedidos/insert");
const insertPedidoSistema_1 = require("../../models_sistema/pedido/insertPedidoSistema");
const updatePedidoSistema_1 = require("../../models_sistema/pedido/updatePedidoSistema");
const databaseConfig_1 = require("../../database/databaseConfig");
class pedidosController {
    async main() {
        console.log(" Atualizando pedidos ...");
        let objDate = new date_1.DateService();
        let selectPedidoMobile = new selectPedidoMobile_1.SelectPedidoMobile();
        let updatePedidoMobile = new updatePedidoMobile_1.UpdatePedidoMobile();
        let insertParamPedido = new insert_1.InsertParamPedidosMobile();
        let selectPedidoSistema = new selectOrcamento_1.SelectOrcamentoSistema();
        let createPedidoSistema = new insertPedidoSistema_1.InsertPedidoSistema();
        let updatePedidoSistema = new updatePedidoSistema_1.UpdatePedidoSistema();
        let orcamentos_registrados = [];
        let dataAtual = objDate.obterDataAtual() + ' 00:00:00';
        let dataHoraAtual = objDate.obterDataHoraAtual();
        try {
            console.log(dataAtual);
            if (dataAtual === undefined || dataAtual === '')
                return;
            orcamentos_registrados = await selectPedidoMobile.buscaCompleta(databaseConfig_1.databaseMobile, dataAtual);
        }
        catch (e) {
            console.log('erro ao Consultar os orcamentos Mobile');
        }
        if (orcamentos_registrados?.length > 0) {
            for (let i of orcamentos_registrados) {
                //console.log(i)
                //console.log('')
                //console.log('')
                let validPedidoSistema = await selectPedidoSistema.buscaOrcamentosCompleto(i.codigo);
                if (validPedidoSistema.length) {
                    let pedidoSistema = validPedidoSistema[0];
                    // se data de recadastro do pedido mobile for maior atualiza o pedido no sistema 
                    if (i.data_recadastro > pedidoSistema.data_recadastro) {
                        console.log(`atualizando pedido ${pedidoSistema.codigo} no sistema ${i.data_recadastro}  > ${pedidoSistema.data_recadastro} `);
                        await updatePedidoSistema.update(i, pedidoSistema.codigo);
                    }
                    else {
                        if (pedidoSistema.data_recadastro > i.data_recadastro) {
                            console.log(`atualizando pedido ${pedidoSistema.codigo} no mobile ${i.data_recadastro}  > ${pedidoSistema.data_recadastro} `);
                            await updatePedidoMobile.update(databaseConfig_1.databaseMobile, pedidoSistema, i.codigo);
                        }
                        else {
                            if (pedidoSistema.situacao != i.situacao || pedidoSistema.tipo != i.tipo) {
                                console.log(pedidoSistema.situacao, ' !== ', i.situacao, ' ', pedidoSistema.tipo, ' !== ', i.tipo);
                                // atualiza somente a tabela dos dados do orcamento
                                // tipo, situacao etc ..
                                console.log(`atualizando situacao do pedido ${i.codigo} no mobile `);
                                await updatePedidoMobile.updateTabelaPedido(databaseConfig_1.databaseMobile, pedidoSistema, i.codigo);
                            }
                            else {
                            }
                            console.log(`o pedido ${i.codigo} se encontra atualizado`);
                        }
                    }
                }
                else {
                    try {
                        console.log(`inserindo pedido ${i.codigo} no sistema `);
                        let aux = await createPedidoSistema.create(i);
                        if (aux > 0) {
                            let data = { codigo_sistema: aux, codigo_mobile: i.codigo, excluido: 'N' };
                            //  await insertParamPedido.cadastrar(data)
                        }
                    }
                    catch (e) {
                        console.log('erro ao tentar cadastrar orcamento', e);
                    }
                }
            }
        }
    }
}
exports.pedidosController = pedidosController;
