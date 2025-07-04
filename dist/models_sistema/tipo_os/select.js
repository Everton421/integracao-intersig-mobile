"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectTiposOsSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectTiposOsSistema {
    async busca(empresa) {
        return new Promise(async (resolve, reject) => {
            let sql = ` select *
        from ${empresa}.tipos_os`;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
}
exports.SelectTiposOsSistema = SelectTiposOsSistema;
