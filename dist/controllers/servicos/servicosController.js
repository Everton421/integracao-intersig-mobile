"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicoController = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
const insert_1 = require("../../models_mobile/servicos/insert");
const select_1 = require("../../models_mobile/servicos/select");
const update_1 = require("../../models_mobile/servicos/update");
const select_2 = require("../../models_sistema/servicos/select");
const tiraCaracteres_1 = require("../../services/tiraCaracteres");
class ServicoController {
    async main() {
        const selectServicoSistema = new select_2.SelectServicosSistema();
        const selectServicoMobile = new select_1.SelectServicosMobile();
        const updateServicoMobile = new update_1.UpdateServicosMobile();
        const insertServicoMobile = new insert_1.InsertServicoMobile();
        const objTiraAspas = new tiraCaracteres_1.TiraCaracteres();
        let servicosSistema = await selectServicoSistema.busca(databaseConfig_1.db_publico);
        if (servicosSistema.length > 0) {
            let validServico = servicosSistema[0];
            for (let i of servicosSistema) {
                let servicoMobile = await selectServicoMobile.buscaPorId(databaseConfig_1.databaseMobile, i.CODIGO);
                let validServicoMobile = servicoMobile[0];
                if (!i.DATA_RECAD || i.DATA_RECAD === null) {
                    i.DATA_RECAD = '0000-00-00 00:00:00';
                }
                if (!i.DATA_CADASTRO || i.DATA_CADASTRO === null) {
                    i.DATA_CADASTRO = '0000-00-00 00:00:00';
                }
                i.APLICACAO = objTiraAspas.normalizeString(i.APLICACAO);
                let objInsert = {
                    codigo: i.CODIGO,
                    id: i.CODIGO,
                    valor: i.VALOR,
                    aplicacao: i.APLICACAO,
                    tipo_serv: i.TIPO_SERV,
                    data_cadastro: i.DATA_CADASTRO,
                    data_recadastro: i.DATA_RECAD,
                };
                if (servicoMobile.length > 0) {
                    if (i.DATA_RECAD > validServicoMobile.data_recadastro) {
                        //update
                        try {
                            console.log('atualizando servico: ', i.CODIGO);
                            await updateServicoMobile.updateCodigoSistema(databaseConfig_1.databaseMobile, objInsert);
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                    else {
                        console.log('o produto codigo: ', i.CODIGO, ' se encontra atualizado', i.DATA_RECADASTRO, ' > ', validServicoMobile.data_recadastro);
                        continue;
                    }
                }
                else {
                    console.log('cadastrando servico: ', i.CODIGO);
                    //cadastrar
                    try {
                        await insertServicoMobile.insertCodigoSistema(databaseConfig_1.databaseMobile, objInsert);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
        }
    }
}
exports.ServicoController = ServicoController;
