"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectSetorMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectSetorMobile {
    async findAll(empresa) {
        return new Promise(async (resolve, reject) => {
            let sql = ` select 
            *,
            coalesce( DATE_FORMAT(data_cadastro, '%Y-%m-%d') , '0000-00-00') AS data_cadastro,
           coalesce( DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s'), '0000-00-00 00:00:00') AS data_recadastro   
            from ${empresa}.setores  `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async findByCode(empresa, codigo) {
        return new Promise(async (resolve, reject) => {
            let sql = ` select 
            *,
            coalesce( DATE_FORMAT(data_cadastro, '%Y-%m-%d') , '0000-00-00') AS data_cadastro,
           coalesce( DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s'), '0000-00-00 00:00:00') AS data_recadastro   
            from ${empresa}.setores where codigo = ?   `;
            await databaseConfig_1.conn_mobie.query(sql, codigo, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async findByDescription(empresa, query) {
        let { codigo, descricao, } = query;
        let baseSql = `
                SELECT
                    *,
                    DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
                    DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro  
                FROM  ${empresa}.setores
            `;
        const conditions = [];
        const params = [];
        if (codigo) {
            conditions.push("codigo = ?"); // Placeholder (?) para o parâmetro
            params.push(codigo); // Adiciona o valor ao array de parâmetros
        }
        if (descricao) {
            conditions.push("descricao = ?");
            params.push(`${descricao}`);
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
    /**
     *   obtem o setor atualizado após a data fornecida
     * @param empresa
     * @param data_recadastro
     * @returns
     */
    async findLastUpdated(empresa, data_recadastro) {
        return new Promise(async (resolve, reject) => {
            let sql = ` select 
            *,
            coalesce( DATE_FORMAT(data_cadastro, '%Y-%m-%d') , '0000-00-00') AS data_cadastro,
           coalesce( DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s'), '0000-00-00 00:00:00') AS data_recadastro   
            from ${empresa}.setores  WHERE data_recadastro >  ? `;
            await databaseConfig_1.conn_mobie.query(sql, data_recadastro, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
}
exports.SelectSetorMobile = SelectSetorMobile;
