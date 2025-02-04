"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVeiculosMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class UpdateVeiculosMobile {
    async update(empresa, veiculo) {
        return new Promise(async (resolve, reject) => {
            const sql = ` update ${empresa}.veiculos   set
                    id = '${veiculo.id}',
                    cliente = '${veiculo.cliente}',
                    placa = '${veiculo.placa}',
                    marca = '${veiculo.marca}',
                    modelo = '${veiculo.modelo}',
                    ano = '${veiculo.ano}',
                    cor = '${veiculo.cor}',
                    combustivel = '${veiculo.combustivel}',
                    data_cadastro = '${veiculo.data_cadastro}',
                    data_recadastro = '${veiculo.data_recadastro}'
                  where id = '${veiculo.id}'
                   `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(`erro ao atualizar veiculo ${veiculo.id}`);
                    console.log(sql);
                    reject(err);
                }
                else {
                    reject(result);
                }
            });
        });
    }
    async updateCodigoSistema(empresa, veiculo) {
        return new Promise(async (resolve, reject) => {
            const sql = ` update ${empresa}.veiculos   set
                   codigo = ${veiculo.codigo},
                  id = '${veiculo.id}',
                   cliente = '${veiculo.cliente}',
                   placa = '${veiculo.placa}',
                   marca = '${veiculo.marca}',
                   modelo = '${veiculo.modelo}',
                   ano = '${veiculo.ano}',
                   cor = '${veiculo.cor}',
                   combustivel = '${veiculo.combustivel}',
                   data_cadastro = '${veiculo.data_cadastro}',
                   data_recadastro = '${veiculo.data_recadastro}'
                 where codigo = '${veiculo.codigo}'
                  `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(`erro ao atualizar veiculo ${veiculo.id}`);
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
exports.UpdateVeiculosMobile = UpdateVeiculosMobile;
