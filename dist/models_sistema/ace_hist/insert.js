"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertAceHist = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class InsertAceHist {
    async insert(acerto) {
        return new Promise(async (resolve, reject) => {
            const sql = ` INSERT INTO ${databaseConfig_1.db_vendas}.ace_hist 
                (
                ITEM,
                TIPO,
                HISTORICO,
                USUARIO,
                SETOR
                )   VALUES
                  (
                     ${acerto.ITEM},
                    '${acerto.TIPO}',
                    '${acerto.HISTORICO}',
                     ${acerto.USUARIO},
                     ${acerto.SETOR} 
                   )
                `;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log(` acerto registrado com sucesso `);
                    resolve(result);
                }
            });
        });
    }
}
exports.InsertAceHist = InsertAceHist;
