"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoController = void 0;
const select_1 = require("../../models_sistema/produtos/select");
const select_2 = require("../../models_mobile/produtos/select");
const insert_1 = require("../../models_mobile/produtos/insert");
const databaseConfig_1 = require("../../database/databaseConfig");
const update_1 = require("../../models_mobile/produtos/update");
const tiraCaracteres_1 = require("../../services/tiraCaracteres");
class ProdutoController {
    async main() {
        const selectProdutosSistema = new select_1.SelectProdutosSistema();
        const selectProdutosMobile = new select_2.SelectProdutosMobile();
        const insertProdutosMobile = new insert_1.InsertProdutosMobile();
        const updateProdutosMobile = new update_1.UpdateProdutosMobile();
        const objTiraAspas = new tiraCaracteres_1.TiraCaracteres();
        let produtosSistema = await selectProdutosSistema.buscaGeral(databaseConfig_1.db_estoque, databaseConfig_1.db_publico);
        if (produtosSistema.length > 0) {
            for (let i of produtosSistema) {
                let produtoMobile = await selectProdutosMobile.buscaPorCodigo(databaseConfig_1.databaseMobile, i.codigo);
                let validProdutoMobile = produtoMobile[0];
                if (i.data_recadastro === null) {
                    i.data_recadastro = '0000-00-00 00:00:00';
                }
                if (i.data_recadastro_preco === null) {
                    i.data_recadastro_preco = '0000-00-00 00:00:00';
                }
                let data_ult_atualizacao = '0000-00-00 00:00:00';
                if (i.data_recadastro_preco > i.data_recadastro) {
                    data_ult_atualizacao = i.data_recadastro_preco;
                }
                else {
                    data_ult_atualizacao = i.data_recadastro;
                }
                i.descricao = objTiraAspas.normalizeString(i.descricao);
                let objInsert = {
                    id: i.codigo,
                    estoque: i.estoque,
                    preco: i.preco,
                    grupo: i.grupo,
                    origem: i.origem,
                    descricao: i.descricao,
                    num_fabricante: i.num_fabricante,
                    num_original: i.num_original,
                    sku: i.sku,
                    marca: i.marca,
                    class_fiscal: i.class_fiscal,
                    data_cadastro: i.data_cadastro,
                    data_recadastro: data_ult_atualizacao,
                    tipo: i.tipo,
                    observacoes1: i.observacoes1,
                    observacoes2: i.observacoes2,
                    observacoes3: i.observacoes3,
                    ativo: i.ativo,
                    codigo: i.codigo,
                    cst: i.cst
                };
                if (produtoMobile.length > 0) {
                    if (data_ult_atualizacao > validProdutoMobile.data_recadastro) {
                        try {
                            console.log('atualizando produto codigo: ', i.codigo);
                            await updateProdutosMobile.update(databaseConfig_1.databaseMobile, objInsert);
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                    else {
                        console.log('o produto codigo: ', i.codigo, ' se encontra atualizado', i.data_recadastro, ' > ', validProdutoMobile.data_recadastro);
                        continue;
                    }
                }
                else {
                    try {
                        console.log('cadastrando produto codigo: ', i.codigo);
                        await insertProdutosMobile.insertProdutoCodigoSistema(databaseConfig_1.databaseMobile, objInsert);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
        }
    }
}
exports.ProdutoController = ProdutoController;
