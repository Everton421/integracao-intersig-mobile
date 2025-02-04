"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectFormaPagamentoSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectFormaPagamentoSistema {
    async busca_por_descricao(db_publico, descricao) {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT *,
                  DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
                  DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD
               FROM ${db_publico}.cad_fpgt 
                 WHERE NOME = '${descricao}' `;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(` erro ao buscar forma de pagamento  do sistema  `, err);
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
               FROM ${db_publico}.cad_fpgt `;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(` erro ao buscar forma de pagamento  do sistema  `, err);
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
             FROM ${db_publico}.cad_fpgt WHERE CODIGO = ${codigo}`;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(` erro ao buscar forma de pagamento  do sistema  `, err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.SelectFormaPagamentoSistema = SelectFormaPagamentoSistema;
