"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertMovimentosIntegracao = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class InsertMovimentosIntegracao {
    async insert(movimento) {
        return new Promise(async (resolve, reject) => {
            const sql = `
                    INSERT INTO ${databaseConfig_1.db_integracao_mobile}.movimentos 
                    (   
                     id_mobile,
                     codigo_sistema
                    ) VALUES(
                       '${movimento.id_mobile}',
                       '${movimento.codigo_sistema}'
                    ); `;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log(` movimento registrado com sucesso no banco de dados Da integracao `);
                    resolve(result);
                }
            });
        });
    }
}
exports.InsertMovimentosIntegracao = InsertMovimentosIntegracao;
