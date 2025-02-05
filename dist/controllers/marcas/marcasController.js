"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marcasController = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
const insert_1 = require("../../models_mobile/marcas/insert");
const select_1 = require("../../models_mobile/marcas/select");
const update_1 = require("../../models_mobile/marcas/update");
const select_2 = require("../../models_sistema/marcas/select");
class marcasController {
    async main() {
        const selectMarcasSistema = new select_2.SelectMarcasSistema();
        const insert_MarcasMobile = new insert_1.Insert_MarcasMobile();
        const selectMarcasMobile = new select_1.Select_MarcasMobile();
        const updateMarcasMobile = new update_1.Update_marcas_Mobile();
        let marcasSistema = await selectMarcasSistema.busca_geral(databaseConfig_1.db_publico);
        if (marcasSistema.length > 0) {
            for (let i of marcasSistema) {
                let marcasMobile = await selectMarcasMobile.buscaPorCodigo(databaseConfig_1.databaseMobile, i.CODIGO);
                let validMarcaMobile = marcasMobile[0];
                if (i.DATA_RECAD === null) {
                    i.DATA_RECAD = '0000-00-00 00:00:00';
                }
                let objInsert = {
                    id: i.CODIGO,
                    data_cadastro: i.DATA_CADASTRO,
                    data_recadastro: i.DATA_RECAD,
                    descricao: i.DESCRICAO,
                    codigo: i.CODIGO
                };
                if (marcasMobile.length > 0) {
                    if (i.DATA_RECAD > validMarcaMobile.data_recadastro) {
                        try {
                            //update
                            console.log('atualizando marca codigo: ', i.CODIGO);
                            await updateMarcasMobile.updateCodigoSistema(databaseConfig_1.databaseMobile, objInsert);
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                    else {
                        console.log(' marca codigo: ', i.CODIGO, 'se encontra atualizada');
                        console.log(i.DATA_RECAD, ' > ', validMarcaMobile.data_recadastro);
                        continue;
                    }
                }
                else {
                    try {
                        console.log('cadastrando marca codigo: ', i.CODIGO);
                        //cadastrar
                        await insert_MarcasMobile.cadastrarCodigoSistema(databaseConfig_1.databaseMobile, objInsert);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
        }
    }
}
exports.marcasController = marcasController;
