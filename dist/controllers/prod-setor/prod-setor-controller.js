"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdSetorController = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
const insert_1 = require("../../models_mobile/produto_setor/insert");
const select_1 = require("../../models_mobile/produto_setor/select");
const update_1 = require("../../models_mobile/produto_setor/update");
const insert_2 = require("../../models_sistema/prod_setor/insert");
const select_2 = require("../../models_sistema/prod_setor/select");
const update_2 = require("../../models_sistema/prod_setor/update");
const date_1 = require("../../services/date");
class ProdSetorController {
    async main(configIntegracao) {
        const selectProdSetorSistema = new select_2.SelectProdSetorSistema();
        const updateProdSetorSistema = new update_2.UpdateProdSetorSistema();
        const insertProdSetorSistema = new insert_2.InsertProdSetorSistema();
        const updateProdutoSetorMobile = new update_1.UpdateProdutoSetorMobile();
        const selectProdutoSetorMobile = new select_1.ProdutoSetorMobile();
        const insertProdutoSetorMobile = new insert_1.InsertProdutoSetorMobile();
        const dateService = new date_1.DateService();
        try {
            if (configIntegracao.importar_estoque === 'S') {
                let resultLastItens = await selectProdutoSetorMobile.findLastUpdate(databaseConfig_1.databaseMobile, configIntegracao.ultima_verificacao_estoque);
                if (resultLastItens.length > 0) {
                    console.log('Verificando produtos do  setor no mobile  ');
                    for (let i of resultLastItens) {
                        let verifyItemSistem = await selectProdSetorSistema.findByProductAndSector(i.produto, i.setor);
                        if (verifyItemSistem.length > 0) {
                            let validItenSistem = verifyItemSistem[0];
                            if (new Date(i.data_recadastro) > new Date(validItenSistem.DATA_RECAD)) {
                                //fazer update do item
                                console.log(new Date(i.data_recadastro), '  >  ', new Date(validItenSistem.DATA_RECAD));
                                console.log(' atualizando item na tabela prod_setor ...');
                                let resultUpdateSistem = await updateProdSetorSistema.update(i);
                                if (resultUpdateSistem.affectedRows > 0)
                                    console.log(` Produto ${i.produto} atualizado com sucesso no sistema!`);
                            }
                        }
                        else {
                            let resultInsertProdsetor = await insertProdSetorSistema.insert(i);
                            if (resultInsertProdsetor.affectedRows > 0) {
                                console.log(` produto codigo: ${i.produto}  inserido no setor: ${i.setor}!`);
                            }
                        }
                    }
                }
                let resultLasItensSistema = await selectProdSetorSistema.findLastUpdated(configIntegracao.ultima_verificacao_estoque);
                if (resultLasItensSistema.length > 0) {
                    console.log('Verificando produtos do  setor no sistema  ');
                    for (let i of resultLasItensSistema) {
                        let verifyItemMobile = await selectProdutoSetorMobile.findByProdSector(databaseConfig_1.databaseMobile, i.PRODUTO, i.SETOR);
                        if (verifyItemMobile.length > 0) {
                            let validItenMob = verifyItemMobile[0];
                            if (new Date(i.DATA_RECAD) > new Date(validItenMob.data_recadastro)) {
                                console.log(' atualizando item na tabela produto_setor do mobile ...');
                                let resultUpdateMobile = await updateProdutoSetorMobile.update(i);
                                if (resultUpdateMobile.affectedRows > 0)
                                    console.log(` Produto ${i.PRODUTO} atualizado com sucesso no Mobile!`);
                            }
                        }
                        else {
                            console.log(`inserindo produto: ${i.PRODUTO} no setor: ${i.SETOR} no mobile...`);
                            let resultInsertProdSetorMobile = await insertProdutoSetorMobile.insert(databaseConfig_1.databaseMobile, {
                                produto: i.PRODUTO,
                                setor: i.SETOR,
                                data_recadastro: i.DATA_RECAD,
                                estoque: i.ESTOQUE,
                                local1_produto: i.LOCAL1_PRODUTO,
                                local2_produto: i.LOCAL2_PRODUTO,
                                local3_produto: i.LOCAL3_PRODUTO,
                                local4_produto: i.LOCAL4_PRODUTO,
                                local_produto: i.LOCAL_PRODUTO
                            });
                            if (resultInsertProdSetorMobile.affectedRows > 0)
                                console.log(`produto: ${i.PRODUTO} inserido com sucesso no setor: ${i.SETOR} no mobile`);
                        }
                    }
                }
            }
            else {
                if (configIntegracao.importar_estoque === 'N') {
                    console.log('a integracao nao esta configurada para enviar os movimentos/produtos nos setores');
                }
                else {
                    console.log('Não foi encontrado configurações de envio da integracao');
                }
            }
        }
        catch (e) {
            console.log(`ocorreu um erro ao processar produtos no setor`, e);
        }
    }
    async insertItens() {
    }
}
exports.ProdSetorController = ProdSetorController;
