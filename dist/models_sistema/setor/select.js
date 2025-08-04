"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectSetorSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectSetorSistema {
    async findAll() {
        return new Promise(async (resolve, reject) => {
            let sql = ` select 
            *,
            coalesce( DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') , '0000-00-00') AS DATA_CADASTRO 
            from ${databaseConfig_1.db_estoque}.setores  WHERE  ATIVO = 'S';`;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async findByDescription(query) {
        let { ATIVO, CODIGO, NOME,
        // DATA_CADASTRO,
        // EST_ATUAL,
        // PADRAO_COMPRA,
        // PADRAO_PRODUCAO,
        // PADRAO_VENDA
         } = query;
        let baseSql = `
                SELECT
                    *,
                    DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
                FROM  ${databaseConfig_1.db_vendas}.setores  
            `;
        const conditions = [];
        const params = [];
        if (CODIGO) {
            conditions.push("CODIGO = ?"); // Placeholder (?) para o parâmetro
            params.push(CODIGO); // Adiciona o valor ao array de parâmetros
        }
        if (NOME) {
            conditions.push("NOME = ?");
            params.push(`${NOME}`);
        }
        if (ATIVO) {
            conditions.push("ATIVO = ?");
            params.push(`${ATIVO}`);
        }
        let whereClause = "";
        if (conditions.length > 0) {
            whereClause = " WHERE " + conditions.join(" AND ");
        }
        //conditions.join(" LIMIT ?");
        const finalSql = baseSql + whereClause;
        try {
            return new Promise(async (resolve, reject) => {
                await databaseConfig_1.conn_sistema.query(finalSql, params, (err, result) => {
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
        }
    }
}
exports.SelectSetorSistema = SelectSetorSistema;
