"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeiculosController = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
const insert_1 = require("../../models_mobile/veiculo/insert");
const select_1 = require("../../models_mobile/veiculo/select");
const update_1 = require("../../models_mobile/veiculo/update");
const select_2 = require("../../models_sistema/veiculos/select");
const tiraCaracteres_1 = require("../../services/tiraCaracteres");
class VeiculosController {
    async main() {
        const selectVeiculosSistema = new select_2.SelectVeiculosSistema();
        const selectVeiculosMobile = new select_1.SelectVeiculosMobile();
        const inserVeiculosMobile = new insert_1.InsertVeiculoMobile();
        const updateVeiculosMobile = new update_1.UpdateVeiculosMobile();
        const objTiraAspas = new tiraCaracteres_1.TiraCaracteres();
        let veicSistema = await selectVeiculosSistema.busca(databaseConfig_1.db_publico);
        if (veicSistema.length > 0) {
            let validTipoOSSistema = veicSistema[0];
            for (let i of veicSistema) {
                let veicMobile = await selectVeiculosMobile.buscaPorCodigo(databaseConfig_1.databaseMobile, i.CODIGO);
                let validVeicMobile = veicMobile[0];
                if (!i.DATA_RECAD || i.DATA_RECAD === null) {
                    i.DATA_RECAD = '0000-00-00 00:00:00';
                }
                if (!i.DATA_CADASTRO || i.DATA_CADASTRO === null) {
                    i.DATA_CADASTRO = '0000-00-00 00:00:00';
                }
                let objInsert = {
                    codigo: i.CODIGO,
                    id: i.CODIGO,
                    cliente: i.CLIENTE,
                    placa: i.PLACA,
                    marca: i.MARCA,
                    modelo: i.MODELO,
                    ano: i.ANO,
                    cor: i.COR,
                    combustivel: i.COMBUSTIVEL,
                    data_cadastro: i.DATA_CADASTRO,
                    data_recadastro: i.DATA_RECAD,
                };
                if (veicMobile.length > 0) {
                    //    if( i.DATA_RECAD >  validVeicMobile.data_recadastro){
                    //update
                    try {
                        console.log('atualizando ', i.CODIGO);
                        await updateVeiculosMobile.updateCodigoSistema(databaseConfig_1.databaseMobile, objInsert);
                        return;
                    }
                    catch (e) {
                        console.log(e);
                    }
                    // }else{
                    //    console.log(i.DATA_RECAD ,' > ',  validVeicMobile.data_recadastro)
                    //      continue;
                    //  }
                }
                else {
                    try {
                        console.log('cadastrando ', i.CODIGO);
                        //cadastrar
                        await inserVeiculosMobile.insertCodigoSistema(databaseConfig_1.databaseMobile, objInsert);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
        }
    }
}
exports.VeiculosController = VeiculosController;
