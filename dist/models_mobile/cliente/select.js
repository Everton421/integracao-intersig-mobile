"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select_clientes_mobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class Select_clientes_mobile {
    async buscaGeral(empresa, vendedor) {
        return new Promise(async (resolve, reject) => {
            let sql = ` select *,
             DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
            from ${empresa}.clientes c
            WHERE c.ativo = 'S' and 
                       ( c.vendedor = ${vendedor} OR c.vendedor = 0 or c.vendedor = null)
                       order by c.vendedor    `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async buscaTodos(empresa) {
        return new Promise(async (resolve, reject) => {
            let sql = ` select *,
           DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
          DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
          from ${empresa}.clientes c
          WHERE c.ativo = 'S'`;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async buscaPorVendedor(empresa, vendedor) {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT *,
             DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
           FROM ${empresa}.clientes WHERE vendedor = ?  `;
            await databaseConfig_1.conn_mobie.query(sql, [vendedor], (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async buscaPorcodigo(empresa, codigo) {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT  c.codigo,c.id,  c.nome, c.cnpj, c.celular ,
          DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
        FROM ${empresa}.clientes as c 
         
        WHERE c.codigo = ?  `;
            await databaseConfig_1.conn_mobie.query(sql, [codigo], (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async buscaPorId(empresa, id) {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT  codigo, nome, cnpj, celular ,
        DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
          DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
      FROM ${empresa}.clientes WHERE id = ?  `;
            await databaseConfig_1.conn_mobie.query(sql, [id], (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async buscaPorCnpj(empresa, cnpj) {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT  *,
        DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
          DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
      FROM ${empresa}.clientes WHERE cnpj = ?  `;
            await databaseConfig_1.conn_mobie.query(sql, [cnpj], (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async buscaUltimoIdInserido(empresa) {
        return new Promise(async (resolve, reject) => {
            let sql = ` SELECT MAX(codigo) as codigo FROM ${empresa}.clientes `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
}
exports.Select_clientes_mobile = Select_clientes_mobile;
