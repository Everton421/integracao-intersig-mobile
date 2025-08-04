"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertMvtoProdutosSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class InsertMvtoProdutosSistema {
    async insert(mvto) {
        return new Promise(async (resolve, reject) => {
            let { chave_mvto, item, tipo, ent_sai, setor, mov_saldo, produto, grade, padronizado, unidade, item_unid, fator_qtde, quantidade, data_mvto, hora_mvto, just_ipi, just_icms, just_subst } = mvto;
            const sql = ` INSERT INTO ${databaseConfig_1.db_vendas}.mvto_produtos 
              ( chave_mvto ,
                item ,
                tipo ,
                ent_sai ,
                setor ,
                mov_saldo ,
                produto ,
                grade ,
                padronizado ,
                unidade ,
                item_unid ,
                fator_qtde ,
                quantidade ,
                data_mvto ,
                hora_mvto ,
                just_ipi ,
                just_icms ,
                just_subst 
                )values(
                ${chave_mvto},
                ${item},
                '${tipo}',
                '${ent_sai}',
                ${setor},
                '${mov_saldo}',
                ${produto},
                ${grade},
                ${padronizado},
                '${unidade}',
                ${item_unid},
                ${fator_qtde},
                ${quantidade},
                '${data_mvto}',
                '${hora_mvto}',
                '${just_ipi}',
                '${just_icms}',
                '${just_subst}'
                );
             `;
            await databaseConfig_1.conn_sistema.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log(` movimento registrado com sucesso `);
                    resolve(result);
                }
            });
        });
    }
}
exports.InsertMvtoProdutosSistema = InsertMvtoProdutosSistema;
