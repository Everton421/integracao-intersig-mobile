"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectUsuariosSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectUsuariosSistema {
    async select() {
        return new Promise(async (resolve, reject) => {
            const sql = `SELECT
                                        CODIGO codigo,
                                         NOME nome,
                                         EMAIL email,
                                         SENHA_WEB senha_web
                             FROM ${databaseConfig_1.db_publico}.cad_vend WHERE ATIVO = 'S';`;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(' erro ao consultar usuarios do sistema', err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.SelectUsuariosSistema = SelectUsuariosSistema;
