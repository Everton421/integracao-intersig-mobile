"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
const insert_1 = require("../../models_mobile/usuario/insert");
const select_1 = require("../../models_mobile/usuario/select");
const update_1 = require("../../models_mobile/usuario/update");
const select_2 = require("../../models_sistema/usuarios/select");
class UsuarioController {
    async main() {
        let selectUsuariosSistema = new select_2.SelectUsuariosSistema();
        let selectUsuariosMobile = new select_1.SelectUsuariosMobile();
        let updateUsuarioMobile = new update_1.UpdateUsuarioMobile();
        let insertUsuarioMobile = new insert_1.InsertUsuarioMobile();
        let usuariosSistema = await selectUsuariosSistema.select();
        if (usuariosSistema.length > 0) {
            for (let i of usuariosSistema) {
                if (i.email === '' || !i.email) {
                    i.email = 'semEmaill@semEmail.com';
                }
                if (i.senha === '' || !i.senha) {
                    i.senha = '***';
                }
                let objInsert = {
                    codigo: i.codigo,
                    cnpj: databaseConfig_1.databaseMobile,
                    email: i.email,
                    nome: i.nome,
                    senha: i.senha,
                    responsavel: 'N'
                };
                let validUsuariosSistema = await selectUsuariosMobile.buscaPorCodigo(databaseConfig_1.databaseMobile, i.codigo);
                if (validUsuariosSistema.length > 0) {
                    await updateUsuarioMobile.update(databaseConfig_1.databaseMobile, objInsert);
                }
                else {
                    await insertUsuarioMobile.cadastrarCodigoSistema(databaseConfig_1.databaseMobile, objInsert);
                }
            }
        }
    }
}
exports.UsuarioController = UsuarioController;
