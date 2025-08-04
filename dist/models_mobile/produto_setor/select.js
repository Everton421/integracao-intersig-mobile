"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoSetorMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class ProdutoSetorMobile {
    async findLastUpdate(empresa, data_recadastro) {
        return new Promise(async (resolve, reject) => {
            let sql = ` select 
            *,
               coalesce( DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s'), '0000-00-00 00:00:00') AS data_recadastro
            from ${empresa}.produto_setor  `;
            let paramQuery = [];
            let valueQuery = [];
            if (data_recadastro) {
                paramQuery.push(' WHERE data_recadastro >  ? ');
                valueQuery.push(data_recadastro);
            }
            let finalSql = sql;
            if (paramQuery.length > 0) {
                finalSql = sql + paramQuery;
            }
            await databaseConfig_1.conn_mobie.query(finalSql, valueQuery, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async findByDescription(empresa, query) {
        let { setor, produto, local_produto, local1_produto, local2_produto, local3_produto, local4_produto } = query;
        let baseSql = `
                SELECT
                    *,
                 coalesce( DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s'), '0000-00-00 00:00:00') AS data_recadastro
                FROM  ${empresa}.setores
            `;
        const conditions = [];
        const params = [];
        if (setor) {
            conditions.push(" setor = ?"); // Placeholder (?) para o parâmetro
            params.push(setor); // Adiciona o valor ao array de parâmetros
        }
        if (produto) {
            conditions.push(" produto = ?");
            params.push(produto);
        }
        if (local_produto) {
            conditions.push(' local_produto = ? ');
            params.push(`${local_produto}`);
        }
        if (local1_produto) {
            conditions.push(' local1_produto = ? ');
            params.push(`${local1_produto}`);
        }
        if (local2_produto) {
            conditions.push(' local2_produto = ? ');
            params.push(`${local2_produto}`);
        }
        if (local3_produto) {
            conditions.push(' local3_produto = ? ');
            params.push(`${local3_produto}`);
        }
        if (local4_produto) {
            conditions.push(' local4_produto = ? ');
            params.push(`${local4_produto}`);
        }
        let whereClause = "";
        if (conditions.length > 0) {
            whereClause = " WHERE " + conditions.join(" AND ");
        }
        //conditions.join(" LIMIT ?");
        const finalSql = baseSql + whereClause;
        try {
            return new Promise(async (resolve, reject) => {
                await databaseConfig_1.conn_mobie.query(finalSql, params, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
        }
        catch (err) {
            console.error("Erro ao executar a query:", err);
            throw new Error("Falha ao buscar setorres no banco de dados.");
            // Ou `reject(err)` se estivesse dentro do `new Promise` original, mas com async/await é melhor lançar.
        }
    }
    async findByCode(empresa, produto) {
        return new Promise(async (resolve, reject) => {
            let sql = ` select 
            *,
                 coalesce( DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s'), '0000-00-00 00:00:00') AS data_recadastro
            from ${empresa}.produto_setor where produto = ?  `;
            await databaseConfig_1.conn_mobie.query(sql, produto, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async findByProdSector(empresa, produto, setor) {
        return new Promise(async (resolve, reject) => {
            let sql = ` select 
            *,
                 coalesce( DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s'), '0000-00-00 00:00:00') AS data_recadastro
            from ${empresa}.produto_setor where produto = ${produto}  and setor = ${setor} `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
}
exports.ProdutoSetorMobile = ProdutoSetorMobile;
