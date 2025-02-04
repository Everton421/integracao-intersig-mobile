"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectUsuariosMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectUsuariosMobile {
    async buscaPorCodigo(empresa, codigo) {
        return new Promise(async (resolve, reject) => {
            let sql = ` select * 
        from ${empresa}.usuarios where codigo = ? `;
            await databaseConfig_1.conn_mobie.query(sql, [codigo], (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
}
exports.SelectUsuariosMobile = SelectUsuariosMobile;
