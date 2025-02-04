"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertFormaPagamentoMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class InsertFormaPagamentoMobile {
    async cadastrarCodigoSistema(empresa, forma_pagamento) {
        return new Promise(async (resolve, reject) => {
            let sql = `
            INSERT into ${empresa}.forma_pagamento
            (
            codigo,
            id,
            descricao,
            desc_maximo,
            parcelas,
            intervalo,
            recebimento,
            data_cadastro,
            data_recadastro
            ) values
            ( ?, ?, ? ,? ,?, ?, ? ,? ,?  ) 
            `;
            let arr = [forma_pagamento.codigo, forma_pagamento.id, forma_pagamento.descricao, forma_pagamento.desc_maximo, forma_pagamento.parcelas,
                forma_pagamento.intervalo, forma_pagamento.recebimento, forma_pagamento.data_cadastro, forma_pagamento.data_recadastro
            ];
            await databaseConfig_1.conn_mobie.query(sql, arr, (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            });
        });
    }
    async cadastrar(empresa, forma_pagamento) {
        return new Promise(async (resolve, reject) => {
            let sql = `
            INSERT into ${empresa}.forma_pagamento
            (
            id,
            descricao,
            desc_maximo,
            parcelas,
            intervalo,
            recebimento,
            data_cadastro,
            data_recadastro
            ) values
            (?, ? ,? ,?, ?, ? ,? ,?  ) 
            `;
            let arr = [forma_pagamento.id, forma_pagamento.descricao, forma_pagamento.desc_maximo, forma_pagamento.parcelas,
                forma_pagamento.intervalo, forma_pagamento.recebimento, forma_pagamento.data_cadastro, forma_pagamento.data_recadastro
            ];
            await databaseConfig_1.conn_mobie.query(sql, arr, (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            });
        });
    }
}
exports.InsertFormaPagamentoMobile = InsertFormaPagamentoMobile;
