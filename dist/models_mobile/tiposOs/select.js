"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectTiposOsMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectTiposOsMobile {
    async buscaPorCodigo(empresa, codigo) {
        return new Promise(async (resolve, reject) => {
            let sql = ` select *,
          DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
        from ${empresa}.tipos_os where codigo = ? `;
            await databaseConfig_1.conn_mobie.query(sql, [codigo], (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async buscaPorId(empresa, id) {
        return new Promise(async (resolve, reject) => {
            let sql = ` select *,
          DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
        from ${empresa}.tipos_os where id = ? `;
            await databaseConfig_1.conn_mobie.query(sql, [id], (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
}
exports.SelectTiposOsMobile = SelectTiposOsMobile;
