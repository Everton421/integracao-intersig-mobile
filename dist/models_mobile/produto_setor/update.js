"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProdutoSetorMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class UpdateProdutoSetorMobile {
    async update(prodSetor) {
        return new Promise(async (resolve, reject) => {
            const sql = ` update ${databaseConfig_1.databaseMobile}.produto_setor  set  `;
            let conditions = [];
            let values = [];
            if (prodSetor.ESTOQUE) {
                conditions.push(' estoque = ? ');
                values.push(`${prodSetor.ESTOQUE}`);
            }
            if (prodSetor.LOCAL1_PRODUTO) {
                conditions.push(' local1_produto = ? ');
                values.push(`${prodSetor.LOCAL1_PRODUTO}`);
            }
            if (prodSetor.LOCAL2_PRODUTO) {
                conditions.push(' local2_produto = ? ');
                values.push(`${prodSetor.LOCAL2_PRODUTO}`);
            }
            if (prodSetor.LOCAL3_PRODUTO) {
                conditions.push(' local3_produto = ? ');
                values.push(`${prodSetor.LOCAL3_PRODUTO}`);
            }
            if (prodSetor.DATA_RECAD) {
                conditions.push(' data_recadastro = ? ');
                values.push(`${prodSetor.DATA_RECAD}`);
            }
            if (prodSetor.LOCAL_PRODUTO) {
                conditions.push(' local_produto = ? ');
                values.push(`${prodSetor.LOCAL_PRODUTO}`);
            }
            if (prodSetor.LOCAL4_PRODUTO) {
                conditions.push(' local4_produto = ? ');
                values.push(`${prodSetor.LOCAL4_PRODUTO}`);
            }
            let whereClause = ' WHERE  produto =  ? and setor = ? ;';
            values.push(prodSetor.PRODUTO);
            values.push(prodSetor.SETOR);
            let finalSql = sql;
            if (conditions.length > 0) {
                finalSql = sql + conditions.join(' , ') + whereClause;
            }
            await databaseConfig_1.conn_mobie.query(finalSql, values, (err, result) => {
                if (err) {
                    console.log(`erro ao atualizar produto no setor mobile `, err);
                    console.log("SQL: ", finalSql, "  VALORES: ", values);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.UpdateProdutoSetorMobile = UpdateProdutoSetorMobile;
