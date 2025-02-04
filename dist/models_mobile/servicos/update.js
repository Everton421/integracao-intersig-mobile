"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServicosMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class UpdateServicosMobile {
    async update(empresa, servico) {
        return new Promise(async (resolve, reject) => {
            const sql = ` update ${empresa}.servicos  
                      set
                    id =${servico.codigo},
                    valor =${servico.valor},
                    aplicacao =${servico.aplicacao},
                    tipo_serv =${servico.tipo_serv},
                    data_cadastro =${servico.data_cadastro},
                    data_recadastro =${servico.data_recadastro}  
                  where id = '${servico.codigo}'
                  )`;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(`erro ao atualizar servico ${servico.codigo}`);
                    console.log(sql);
                    reject(err);
                }
                else {
                    reject(result);
                }
            });
        });
    }
    async updateCodigoSistema(empresa, servico) {
        return new Promise(async (resolve, reject) => {
            const sql = ` update ${empresa}.servicos  
                     set
                     codigo= ${servico.codigo},
                   id =${servico.codigo},
                   valor =${servico.valor},
                   aplicacao =${servico.aplicacao},
                   tipo_serv =${servico.tipo_serv},
                   data_cadastro =${servico.data_cadastro},
                   data_recadastro =${servico.data_recadastro}  
                 where codigo = '${servico.codigo}'
                 )`;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(`erro ao atualizar servico ${servico.codigo}`);
                    console.log(sql);
                    reject(err);
                }
                else {
                    reject(result);
                }
            });
        });
    }
}
exports.UpdateServicosMobile = UpdateServicosMobile;
