"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertProdutoSetorMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class InsertProdutoSetorMobile {
    async insert(empresa, produtoSetor) {
        return new Promise(async (resolve, reject) => {
            let sql = `
                    INSERT INTO ${empresa}.produto_setor (  
                    setor,
                    produto,
                    estoque,
                    local_produto,
                    local1_produto,
                    local2_produto,
                    local3_produto,
                    local4_produto,
                    data_recadastro ) VALUES
                            ( ? , ? , ? , ?, ?, ?, ?, ?, ? ); `;
            const values = [
                produtoSetor.setor,
                produtoSetor.produto,
                produtoSetor.estoque,
                produtoSetor.local_produto,
                produtoSetor.local1_produto,
                produtoSetor.local2_produto,
                produtoSetor.local3_produto,
                produtoSetor.local4_produto,
                produtoSetor.data_recadastro
            ];
            await databaseConfig_1.conn_mobie.query(sql, values, (err, result) => {
                if (err) {
                    console.log("Erro ao tentar inserir produto no setor mobile ");
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.InsertProdutoSetorMobile = InsertProdutoSetorMobile;
