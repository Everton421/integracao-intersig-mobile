"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteController = void 0;
const select_1 = require("../../models_sistema/cliente/select");
const select_2 = require("../../models_mobile/cliente/select");
const databaseConfig_1 = require("../../database/databaseConfig");
const insert_1 = require("../../models_mobile/cliente/insert");
const update_1 = require("../../models_mobile/cliente/update");
class ClienteController {
    async main() {
        let select_clientes_mobile = new select_2.Select_clientes_mobile();
        let select_clientes_sistema = new select_1.Select_clientes_sistema();
        let insert_clientes_mobile = new insert_1.Insert_clientes_Mobile();
        let update_clientes_mobile = new update_1.Updata_clientes_Mobile();
        let clientesSistema;
        clientesSistema = await select_clientes_sistema.buscaTodos(databaseConfig_1.db_publico);
        if (clientesSistema.length > 0) {
            for (let i of clientesSistema) {
                let validClienteMobile;
                validClienteMobile = await select_clientes_mobile.buscaPorcodigo(databaseConfig_1.databaseMobile, i.CODIGO);
                if (i.DATA_CADASTRO === null)
                    i.DATA_CADASTRO = '0000-00-00';
                if (i.DATA_RECAD === null)
                    i.DATA_RECAD = '0000-00-00 00:00:00';
                let objInsertMobile = {
                    codigo: i.CODIGO,
                    id: i.CODIGO,
                    celular: i.CELULAR,
                    nome: i.NOME,
                    cep: i.CEP,
                    endereco: i.ENDERECO,
                    ie: i.RG,
                    numero: i.NUMERO,
                    cnpj: i.CPF,
                    cidade: i.CIDADE,
                    data_cadastro: i.DATA_CADASTRO,
                    data_recadastro: i.DATA_RECAD,
                    vendedor: i.VENDEDOR,
                    bairro: i.BAIRRO,
                    estado: i.ESTADO
                };
                let clienteV = validClienteMobile[0];
                if (validClienteMobile.length > 0) {
                    if (clienteV.data_recadastro !== null && i.DATA_RECAD !== null && i.DATA_RECAD > clienteV.data_recadastro) {
                        try {
                            console.log(` atualizando cliente : ${i.CODIGO} `, i.DATA_RECAD, '>', clienteV.data_recadastro);
                            await update_clientes_mobile.updateCodigoSistema(databaseConfig_1.databaseMobile, objInsertMobile);
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                    else {
                        console.log(`O cliente codigo: ${i.CODIGO} se encontra atualizado `, i.DATA_RECAD > clienteV.data_recadastro);
                        continue;
                    }
                }
                else {
                    try {
                        console.log(` Cadastrando cliente : ${i.CODIGO} `);
                        let aux = await insert_clientes_mobile.cadastrarCodigoSistema(databaseConfig_1.databaseMobile, objInsertMobile);
                        console.log(aux);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
        }
    }
}
exports.ClienteController = ClienteController;
