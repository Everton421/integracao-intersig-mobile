"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertUsuarioMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class InsertUsuarioMobile {
    async cadastrarCodigoSistema(empresa, usuario) {
        return new Promise(async (resolve, reject) => {
            let sql = `
                    INSERT INTO ${empresa}.usuarios 
                    (
                    codigo, 
                    nome,
                    senha,
                    email,
                    cnpj,
                    responsavel
                    ) VALUES
                    ( ?, ?, ?, ?, ?, ?); `;
            const values = [usuario.codigo, usuario.nome, usuario.senha, usuario.email, empresa, 'S'];
            await databaseConfig_1.conn_mobie.query(sql, values, (err, result) => {
                if (err) {
                    console.log(' erro ao cadastrar usuario no banco mobile ', err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.InsertUsuarioMobile = InsertUsuarioMobile;
