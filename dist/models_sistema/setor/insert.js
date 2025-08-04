"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertSetorSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class InsertSetorSistema {
    async insert(setor) {
        return new Promise(async (resolve, reject) => {
            let sql = `
                    INSERT INTO ${databaseConfig_1.db_estoque}.setores (
                    NOME,
                    PADRAO_VENDA,
                    PADRAO_COMPRA,
                    PADRAO_PRODUCAO,
                    EST_ATUAL,
                    DATA_CADASTRO
                    ATIVO
                     )
                     VALUES
                    (
                     '${setor.NOME}',
                     '${setor.PADRAO_VENDA}',
                     '${setor.PADRAO_COMPRA}',
                     '${setor.PADRAO_PRODUCAO}',
                     '${setor.EST_ATUAL}',
                     '${setor.DATA_CADASTRO}'
                     '${setor.ATIVO}'
                    ) ; `;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log(result);
                    resolve(result);
                }
            });
        });
    }
}
exports.InsertSetorSistema = InsertSetorSistema;
