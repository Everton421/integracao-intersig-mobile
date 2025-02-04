"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tipos_osController = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
const insert_1 = require("../../models_mobile/tiposOs/insert");
const select_1 = require("../../models_mobile/tiposOs/select");
const update_1 = require("../../models_mobile/tiposOs/update");
const select_2 = require("../../models_sistema/tipo_os/select");
const tiraCaracteres_1 = require("../../services/tiraCaracteres");
class Tipos_osController {
    async main() {
        const selectTiposOsSistema = new select_2.SelectTiposOsSistema();
        const selectTiposOsMobile = new select_1.SelectTiposOsMobile();
        const insertTipoOsMobile = new insert_1.InsertTiposOsMobile();
        const updateTipoOsMobile = new update_1.UpdateTipoOsMobile();
        const objTiraAspas = new tiraCaracteres_1.TiraCaracteres();
        let tiposOSsistema = await selectTiposOsSistema.busca(databaseConfig_1.db_publico);
        if (tiposOSsistema.length > 0) {
            let validTipoOSSistema = tiposOSsistema[0];
            for (let i of tiposOSsistema) {
                let tipoOsMobile = await selectTiposOsMobile.buscaPorCodigo(databaseConfig_1.databaseMobile, i.CODIGO);
                let validTipoOSMobile = tipoOsMobile[0];
                if (!i.DATA_RECAD || i.DATA_RECAD === null) {
                    i.DATA_RECAD = '0000-00-00 00:00:00';
                }
                if (!i.DATA_CADASTRO || i.DATA_CADASTRO === null) {
                    i.DATA_CADASTRO = '0000-00-00 00:00:00';
                }
                i.DESCRICAO = objTiraAspas.normalizeString(i.DESCRICAO);
                let objInsert = {
                    id: i.CODIGO,
                    descricao: i.DESCRICAO,
                    data_cadastro: i.DATA_CADASTRO,
                    data_recadastro: i.DATA_RECAD,
                    codigo: i.CODIGO
                };
                if (tipoOsMobile.length > 0) {
                    //  if( i.DATA_RECAD >  validTipoOSMobile.data_recadastro){
                    //update
                    try {
                        console.log('atualizando ', i.CODIGO);
                        await updateTipoOsMobile.updateCodigoSistema(databaseConfig_1.databaseMobile, objInsert);
                        return;
                    }
                    catch (e) {
                        console.log(e);
                    }
                    //  }else{
                    //      console.log(i.DATA_RECAD ,' > ',  validTipoOSMobile.data_recadastro)
                    //      continue;
                    //  }
                }
                else {
                    try {
                        console.log('cadastrando ', i.CODIGO);
                        //cadastrar
                        await insertTipoOsMobile.insertCodigoSistema(databaseConfig_1.databaseMobile, objInsert);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
        }
    }
}
exports.Tipos_osController = Tipos_osController;
