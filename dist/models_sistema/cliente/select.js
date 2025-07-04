"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select_clientes_sistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class Select_clientes_sistema {
    async buscaGeral(db_publico, vendedor) {
        return new Promise(async (resolve, reject) => {
            let sql = ` select *,
             DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
            DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD 
            from ${db_publico}.cad_clie c
            WHERE c.ativo = 'S' and 
                       ( c.vendedor = ${vendedor} OR c.vendedor = 0 or c.vendedor = null)
                       order by c.vendedor    `;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async buscaTodos(db_publico) {
        return new Promise(async (resolve, reject) => {
            let sql = ` select *,
           DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
          DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD 
          from ${db_publico}.cad_clie c
          WHERE c.ativo = 'S'  and c.no_site ='S' `;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async buscaPorVendedor(db_publico, vendedor) {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT *,
             DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
            DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD 
           FROM ${db_publico}.cad_clie WHERE vendedor = ?  `;
            await databaseConfig_1.conn_sistema.query(sql, [vendedor], (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async buscaPorcodigo(db_publico, codigo) {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT  codigo, nome, cnpj, celular ,
          DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
            DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD 
        FROM ${db_publico}.cad_clie WHERE codigo = ?  `;
            await databaseConfig_1.conn_sistema.query(sql, [codigo], (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async buscaPorCnpj(db_publico, cnpj) {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT  *,
        DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
          DATE_FORMAT(DATA_RECAD, '%Y-%m-%d %H:%i:%s') AS DATA_RECAD 
      FROM ${db_publico}.cad_clie WHERE cpf = ?  `;
            await databaseConfig_1.conn_sistema.query(sql, [cnpj], (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async buscaUltimoIdInserido(db_publico) {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT MAX(codigo) as codigo FROM ${db_publico}.cad_clie `;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
}
exports.Select_clientes_sistema = Select_clientes_sistema;
