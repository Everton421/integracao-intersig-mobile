"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Insert_MarcasMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class Insert_MarcasMobile {
    async cadastrar(empresa, marca) {
        return new Promise(async (resolve, reject) => {
            let sql = `
                    INSERT INTO ${empresa}.marcas ( id, data_cadastro, data_recadastro, descricao ) VALUES
                                                      ( ? , ? , ? , ? ); `;
            const values = [marca.id, marca.data_cadastro, marca.data_recadastro, marca.descricao];
            await databaseConfig_1.conn_mobie.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async cadastrarCodigoSistema(empresa, marca) {
        return new Promise(async (resolve, reject) => {
            let sql = `
                    INSERT INTO ${empresa}.marcas (  codigo, id, data_cadastro, data_recadastro, descricao ) VALUES
                                                      (? ,? , ? , ? , ? ); `;
            const values = [marca.codigo, marca.id, marca.data_cadastro, marca.data_recadastro, marca.descricao];
            await databaseConfig_1.conn_mobie.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.Insert_MarcasMobile = Insert_MarcasMobile;
