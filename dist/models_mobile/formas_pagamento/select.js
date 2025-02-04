"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectFormaPagamentoMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class SelectFormaPagamentoMobile {
    async buscaGeral(empresa) {
        return new Promise(async (resolve, reject) => {
            let sql = ` select *,
         DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
        from ${empresa}.forma_pagamento  `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
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
            from ${empresa}.forma_pagamento 
            where id = ${id}
            `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async buscaPorCodigo(empresa, codigo) {
        return new Promise(async (resolve, reject) => {
            let sql = ` select *,
            DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
            from ${empresa}.forma_pagamento 
            where codigo = ${codigo}
            `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
}
exports.SelectFormaPagamentoMobile = SelectFormaPagamentoMobile;
