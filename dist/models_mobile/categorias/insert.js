"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Insert_Categorias = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class Insert_Categorias {
    // cadastra categorai utilizando o autoincrement do banco mobile 
    async cadastrar(empresa, categoria) {
        return new Promise(async (resolve, reject) => {
            let sql = `
                    INSERT INTO ${empresa}.categorias ( id, data_cadastro, data_recadastro, descricao ) VALUES
                                                      ( ? , ? , ? , ? ); `;
            const values = [categoria.id, categoria.data_cadastro, categoria.data_recadastro, categoria.descricao];
            await databaseConfig_1.conn_mobie.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                    console.log(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    // cadastra categorai utilizando o codigo do sitema 
    async cadastrarCodigoSistema(empresa, categoria) {
        return new Promise(async (resolve, reject) => {
            let sql = `
                    INSERT INTO ${empresa}.categorias ( codigo ,id , data_cadastro, data_recadastro, descricao ) VALUES
                                                      (?,  ? , ? , ? , ? ); `;
            const values = [categoria.codigo, categoria.codigo, categoria.data_cadastro, categoria.data_recadastro, categoria.descricao];
            await databaseConfig_1.conn_mobie.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                    console.log(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.Insert_Categorias = Insert_Categorias;
