"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertLogSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class InsertLogSistema {
    async insert(log) {
        return new Promise(async (resolve, reject) => {
            const sql = ` INSERT INTO ${databaseConfig_1.db_vendas}.log 
                    (
                    APELIDO,
                    COMPUTADOR,
                    DATA,
                    HORA,
                    ACAO,
                    HISTORICO,
                    IP_CPU
                    ) VALUES(
                    '${log.APELIDO}',
                    '${log.COMPUTADOR}',
                    '${log.DATA}',
                    '${log.HORA}',
                    '${log.ACAO}',
                    '${log.HISTORICO}',
                    '${log.IP_CPU}' 
                     )
            `;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log(`log registrado com sucesso`);
                    resolve(result);
                }
            });
        });
    }
}
exports.InsertLogSistema = InsertLogSistema;
