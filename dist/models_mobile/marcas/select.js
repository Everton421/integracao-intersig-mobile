"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select_MarcasMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class Select_MarcasMobile {
    async busca_por_descricao(empresa, descricao) {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT *,
                DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro
             FROM ${empresa}.marcas 
               WHERE descricao = '${descricao}' `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async busca_geral(empresa) {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT *,
                DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro
             FROM ${empresa}.marcas   `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async buscaPorId(empresa, id) {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT *,
                DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro
             FROM ${empresa}.marcas where id = '${id}'`;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(` erro ao buscar marca id ${id}`, err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async buscaPorCodigo(empresa, codigo) {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT *,
                DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro
             FROM ${empresa}.marcas where codigo = '${codigo}'`;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(` erro ao buscar marca id ${codigo}`, err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.Select_MarcasMobile = Select_MarcasMobile;
