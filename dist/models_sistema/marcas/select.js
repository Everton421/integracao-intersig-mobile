"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMarcasSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectMarcasSistema {
    async busca_por_descricao(db_publico, descricao) {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT *,
                  DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
                  DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD
               FROM ${db_publico}.cad_pmar 
                 WHERE NOME = '${descricao}' `;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(` erro ao buscar marcas  do sistema  `, err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async busca_geral(db_publico) {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT *,
                  DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
                  DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD
               FROM ${db_publico}.cad_pmar WHERE NO_SITE ='S' `;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(` erro ao buscar marcas  do sistema  `, err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async buscaPorCodigo(db_publico, codigo) {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT *,
                DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
                DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD
             FROM ${db_publico}.cad_pmar WHERE CODIGO = ${codigo}`;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(` erro ao buscar marcas  do sistema  `, err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.SelectMarcasSistema = SelectMarcasSistema;
