"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectServicosSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectServicosSistema {
    async busca(publico) {
        return new Promise(async (resolve, reject) => {
            const sql = `SELECT
                                *,
                                     DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO 
                 -- DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD
                     FROM ${publico}.cad_serv WHERE ATIVO = 'S' AND NO_SITE = 'S';`;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.SelectServicosSistema = SelectServicosSistema;
