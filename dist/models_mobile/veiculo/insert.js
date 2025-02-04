"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertVeiculoMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class InsertVeiculoMobile {
    async insert(empresa, veiculo) {
        return new Promise(async (resolve, reject) => {
            let sql = ` INSERT INTO ${empresa}.veiculos
            ( 
            id,
            cliente,
            placa,
            marca,
            modelo,
            ano,
            cor,
            combustivel,
            data_cadastro,
            data_recadastro
            )values
            (
            '${veiculo.id}',
            '${veiculo.cliente}',
            '${veiculo.placa}',
            '${veiculo.marca}',
            '${veiculo.modelo}',
            '${veiculo.ano}',
            '${veiculo.cor}',
            '${veiculo.combustivel}',
            '${veiculo.data_cadastro}',
            '${veiculo.data_recadastro}' 
            )
            `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async insertCodigoSistema(empresa, veiculo) {
        return new Promise(async (resolve, reject) => {
            let sql = ` INSERT INTO ${empresa}.veiculos
            ( 
            codigo,
            id,
            cliente,
            placa,
            marca,
            modelo,
            ano,
            cor,
            combustivel,
            data_cadastro,
            data_recadastro
            )values
            (
            '${veiculo.codigo}',
            '${veiculo.id}',
            '${veiculo.cliente}',
            '${veiculo.placa}',
            '${veiculo.marca}',
            '${veiculo.modelo}',
            '${veiculo.ano}',
            '${veiculo.cor}',
            '${veiculo.combustivel}',
            '${veiculo.data_cadastro}',
            '${veiculo.data_recadastro}' 
            )
            `;
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.InsertVeiculoMobile = InsertVeiculoMobile;
