"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertItensPedidoSistema = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class InsertItensPedidoSistema {
    async cadastraProdutosDoPedido(produtos, codigoPedido) {
        return new Promise(async (resolve, reject) => {
            let i = 1;
            for (let p of produtos) {
                let { id, codigo, preco, quantidade, desconto, just_icms, just_ipi, just_subst, total, fator_val, fator_qtde, tabela, } = p;
                if (!preco)
                    preco = 0;
                if (!quantidade)
                    quantidade = 0;
                if (!desconto)
                    desconto = 0;
                if (!just_icms)
                    just_icms = '';
                if (!just_ipi)
                    just_ipi = '';
                if (!just_subst)
                    just_subst = '';
                if (!total)
                    total = 0;
                if (!fator_val)
                    fator_val = 1;
                if (!fator_qtde)
                    fator_qtde = 1;
                if (!tabela)
                    tabela = 1;
                const sql = `INSERT INTO ${databaseConfig_1.db_vendas}.pro_orca (orcamento, sequencia, produto, fator_val, fator_qtde, unitario, quantidade, preco_tabela, desconto, tabela,  just_ipi, just_icms, just_subst, total_liq, unit_orig)
                VALUES ( 
                    '${codigoPedido}',
                    '${i}',
                    '${codigo}',
                    '${fator_val}',
                    '${fator_qtde}',
                    '${preco}',
                    '${quantidade}',
                    '${preco}',
                    '${desconto}',  
                    '${tabela}',  
                    '${just_ipi}',  
                    '${just_icms}',  
                    '${just_subst}',  
                    '${total}',  
                    '${preco}'  
                ) `;
                await databaseConfig_1.conn_sistema.query(sql, (error, resultado) => {
                    if (error) {
                        reject(" erro ao inserir produto do orcamento " + error);
                    }
                    else {
                        resolve(resultado);
                        console.log(`produto  inserido com sucesso`);
                    }
                });
                if (i === produtos.length) {
                    return;
                }
                i++;
            }
        });
    }
    async cadastraParcelasDoPeidido(parcelas, codigoPedido) {
        return new Promise(async (resolve, reject) => {
            parcelas.forEach(async (p) => {
                await databaseConfig_1.conn_sistema.query(` INSERT INTO ${databaseConfig_1.db_vendas}.par_orca ( ORCAMENTO, PARCELA, VALOR , VENCIMENTO, TIPO_RECEB)
                                                     VALUES ( ?,?,?,?,?)`, [codigoPedido, p.parcela, p.valor, p.vencimento, 1], (err, resultParcelas) => {
                    if (err) {
                        console.log("erro ao inserir parcelas !" + err);
                        reject(err);
                    }
                    else {
                        console.log('  Parcela inserida com sucesso ', resultParcelas);
                        resolve(resultParcelas);
                    }
                });
            });
        });
    }
    async cadastraServicosDoPedido(servicos, codigoPedido) {
        return new Promise(async (resolve, reject) => {
            if (servicos.length > 0) {
                let j = 1;
                for (let i of servicos) {
                    await databaseConfig_1.conn_sistema.query(` INSERT INTO ${databaseConfig_1.db_vendas}.ser_orca ( ORCAMENTO , SEQUENCIA, SERVICO, QUANTIDADE, UNITARIO, DESCONTO, PRECO_TABELA )
                            VALUES ( ?, ?, ?, ?, ?, ?, ?  ) `, [codigoPedido, j, i.codigo, i.quantidade, i.valor, i.desconto, i.valor], (err, resultServicos) => {
                        if (err) {
                            console.log(`ocorreu um erro ao inserir os servicos`, err);
                            reject(err);
                        }
                        else {
                            console.log(" Servico inserido com sucesso ", resultServicos);
                            resolve(resultServicos);
                        }
                    });
                    if (j === servicos.length) {
                        return;
                    }
                    j++;
                }
            }
        });
    }
}
exports.InsertItensPedidoSistema = InsertItensPedidoSistema;
