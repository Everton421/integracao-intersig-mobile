"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriasController = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
const insert_1 = require("../../models_mobile/categorias/insert");
const select_1 = require("../../models_mobile/categorias/select");
const update_1 = require("../../models_mobile/categorias/update");
const select_2 = require("../../models_sistema/categorias/select");
const date_1 = require("../../services/date");
class categoriasController {
    async main() {
        const selectCategoriasMobile = new select_1.Select_Categorias();
        const insertCategoriasMobile = new insert_1.Insert_Categorias();
        const selectCategoriasSistema = new select_2.SelectCategoriasSistema();
        const update_categorias_Mobile = new update_1.Update_categorias_Mobile();
        const dateService = new date_1.DateService();
        let categoriasSistema;
        categoriasSistema = await selectCategoriasSistema.busca_geral(databaseConfig_1.db_publico);
        if (categoriasSistema.length > 0) {
            for (let i of categoriasSistema) {
                let validCategoriaMobile;
                validCategoriaMobile = await selectCategoriasMobile.buscaPorCodigo(databaseConfig_1.databaseMobile, i.CODIGO);
                let objInsertMobile = {
                    codigo: i.CODIGO,
                    id: i.CODIGO,
                    data_cadastro: i.DATA_CADASTRO,
                    data_recadastro: i.DATA_RECAD,
                    descricao: i.NOME
                };
                let categoriaV = validCategoriaMobile[0];
                let dataHoraAtual = dateService.obterDataHoraAtual();
                if (validCategoriaMobile.length > 0) {
                    if (i.DATA_RECAD === null || !i.DATA_RECAD) {
                        i.DATA_RECAD = '0000-00-00';
                        objInsertMobile.data_recadastro = '0000-00-00 00:00:00';
                    }
                    if (categoriaV.data_recadastro === null) {
                        categoriaV.data_recadastro = dateService.obterDataHoraAtual();
                    }
                    if (i.DATA_RECAD > categoriaV.data_recadastro) {
                        try {
                            console.log(` atualizando categoria ${objInsertMobile.codigo}  `, i.DATA_RECAD, '>', categoriaV.data_recadastro);
                            await update_categorias_Mobile.updateCodigoSistema(databaseConfig_1.databaseMobile, objInsertMobile);
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                    else {
                        console.log(' categoria ', i.CODIGO, ' se encontra atualizada ', i.DATA_RECAD, ' > ', categoriaV.data_recadastro);
                        continue;
                    }
                }
                else {
                    try {
                        console.log('cadastrando categoria codigo:', i.CODIGO, ' ', i.NOME);
                        let aux = await insertCategoriasMobile.cadastrarCodigoSistema(databaseConfig_1.databaseMobile, objInsertMobile);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
        }
    }
}
exports.categoriasController = categoriasController;
