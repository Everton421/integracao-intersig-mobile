"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formaPagamentoController = void 0;
const select_1 = require("../../models_mobile/formas_pagamento/select");
const insert_1 = require("../../models_mobile/formas_pagamento/insert");
const select_2 = require("../../models_sistema/formaDePagamento/select");
const databaseConfig_1 = require("../../database/databaseConfig");
const update_1 = require("../../models_mobile/formas_pagamento/update");
class formaPagamentoController {
    async main() {
        const selectFormaPagamentoMobile = new select_1.SelectFormaPagamentoMobile();
        const insertFormaPagamentoMobile = new insert_1.InsertFormaPagamentoMobile();
        const selectFormaPagamentoSistema = new select_2.SelectFormaPagamentoSistema();
        const updateFormaPagamentoSistema = new update_1.Update_formaPagamentoMobile();
        let fpgtSistema = await selectFormaPagamentoSistema.busca_geral(databaseConfig_1.db_publico);
        if (fpgtSistema.length > 0) {
            for (let i of fpgtSistema) {
                let fpgtMobile = await selectFormaPagamentoMobile.buscaPorCodigo(databaseConfig_1.databaseMobile, i.CODIGO);
                let validFpgtMobile = fpgtMobile[0];
                if (i.DATA_RECAD === null) {
                    i.DATA_RECAD = '0000-00-00 00:00:00';
                }
                let objInsert = {
                    codigo: i.CODIGO,
                    id: i.CODIGO,
                    descricao: i.DESCRICAO,
                    desc_maximo: i.DESC_MAXIMO,
                    parcelas: i.NUM_PARCELAS,
                    intervalo: i.INTERVALO,
                    recebimento: i.TIPO_RECEBIMENTO,
                    data_cadastro: i.DATA_CADASTRO,
                    data_recadastro: i.DATA_RECAD,
                };
                if (fpgtMobile.length > 0) {
                    if (i.DATA_RECAD > validFpgtMobile.data_recadastro) {
                        try {
                            //update
                            console.log(`atualizando forma de pagamento codigo :${i.CODIGO} `);
                            await updateFormaPagamentoSistema.updateCodigoSistema(databaseConfig_1.databaseMobile, objInsert);
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                    else {
                        console.log(` forma de pagamento codigo: ${i.CODIGO} se encontra atualizada `, i.DATA_RECAD, ' > ', validFpgtMobile.data_recadastro);
                        continue;
                    }
                }
                else {
                    try {
                        console.log('cadastrando forma de pagamento codigo: ', i.CODIGO);
                        //cadastrar
                        await insertFormaPagamentoMobile.cadastrarCodigoSistema(databaseConfig_1.databaseMobile, objInsert);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
        }
    }
}
exports.formaPagamentoController = formaPagamentoController;
