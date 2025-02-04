"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectVeiculosSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectVeiculosSistema {
    async busca(publico) {
        return new Promise(async (resolve, reject) => {
            const sql = `SELECT
                                *,
                                     DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO 
                 -- DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD
                     FROM ${publico}.cad_veic;`;
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
exports.SelectVeiculosSistema = SelectVeiculosSistema;
