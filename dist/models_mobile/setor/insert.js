"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertSetorMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class InsertSetorMobile {
    async insertByCode(empresa, setor) {
        return new Promise(async (resolve, reject) => {
            let sql = `
                    INSERT INTO ${empresa}.setores (  codigo, data_cadastro, data_recadastro, descricao ) VALUES
                                                      (   ? , ? , ? , ? ); `;
            const values = [setor.codigo, setor.data_cadastro, setor.data_recadastro, setor.descricao,];
            await databaseConfig_1.conn_mobie.query(sql, values, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.InsertSetorMobile = InsertSetorMobile;
