"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetoresController = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
const insert_1 = require("../../models_mobile/setor/insert");
const select_1 = require("../../models_mobile/setor/select");
const update_1 = require("../../models_mobile/setor/update");
const select_2 = require("../../models_sistema/setor/select");
const date_1 = require("../../services/date");
class SetoresController {
    async main() {
        const selectSetoresMobile = new select_1.SelectSetorMobile();
        const insertSetorMobile = new insert_1.InsertSetorMobile();
        const updateSetorMobile = new update_1.UpdateSetorMobile();
        const selectSetorSistema = new select_2.SelectSetorSistema();
        const dateService = new date_1.DateService();
        try {
            let setoresSistema = await selectSetorSistema.findAll();
            if (setoresSistema.length > 0) {
                console.log('verificando setores...');
                for (let i of setoresSistema) {
                    let verifySetorMobile = await selectSetoresMobile.findByCode(databaseConfig_1.databaseMobile, i.CODIGO);
                    if (verifySetorMobile.length > 0) {
                        if (i.NOME !== verifySetorMobile[0].descricao) {
                            // update mobile 
                            console.log(` atualizando setor ${i.NOME} no mobile...`);
                            let resutlUpdateMobile = await updateSetorMobile.update(databaseConfig_1.databaseMobile, { codigo: i.CODIGO, data_cadastro: i.DATA_CADASTRO, data_recadastro: dateService.obterDataHoraAtual(), descricao: i.NOME });
                            if (resutlUpdateMobile.affectedRows > 0)
                                console.log(`setor ${i.NOME} atualizado com sucesso no mobile`);
                        }
                        else {
                        }
                    }
                    else {
                        /// insert iten mobile 
                        console.log(` inserindo setor ${i.NOME} no mobile...`);
                        let resultInsertMobile = await insertSetorMobile.insertByCode(databaseConfig_1.databaseMobile, { codigo: i.CODIGO, data_cadastro: i.DATA_CADASTRO, data_recadastro: dateService.obterDataHoraAtual(), descricao: i.NOME });
                        if (resultInsertMobile.affectedRows > 0)
                            console.log(`setor ${i.NOME} inserido com sucesso no mobile`);
                    }
                }
                console.log('Fim da verificação dos setores...');
            }
            else {
                console.log('Nenhum setor encontrado!');
            }
        }
        catch (e) {
            console.log("ocorreu um erro ao tentar processar os setores!  ", e);
        }
    }
}
exports.SetoresController = SetoresController;
