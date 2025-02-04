"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertProdutosMobile = void 0;
const databaseConfig_1 = require("../../database/databaseConfig");
class InsertProdutosMobile {
    // insere o produto com o codigo do sistema
    async insertProdutoCodigoSistema(empresa, produto) {
        return new Promise(async (resolve, reject) => {
            let { ativo, codigo, id, class_fiscal, cst, data_cadastro, data_recadastro, descricao, estoque, grupo, marca, num_original, origem, preco, sku, tipo, num_fabricante, observacoes1, observacoes2, observacoes3 } = produto;
            const sql = ` INSERT INTO  ${empresa}.produtos  
                                  (
                                codigo,
                                 id,
                                 estoque ,
                                 preco ,
                                 grupo ,
                                 origem ,
                                 descricao ,
                                 num_fabricante ,
                                 num_original ,
                                 sku ,
                                 marca ,
                                 class_fiscal ,
                                 data_cadastro ,
                                 data_recadastro ,
                                 tipo,
                                 observacoes1,
                                 observacoes2,
                                 observacoes3
                                     ) VALUES (
                                         ${codigo},
                                         ${id},
                                         ${estoque} ,
                                         ${preco} ,
                                         ${grupo} ,
                                         ${origem} ,
                                         '${descricao}',
                                         '${num_fabricante}' ,
                                         '${num_original}' ,
                                         '${sku}' ,
                                         ${marca} ,
                                         '${class_fiscal}',
                                         '${data_cadastro}',
                                         '${data_recadastro}',  
                                         ${tipo}, 
                                         '${observacoes1}',
                                         '${observacoes2}',
                                         '${observacoes3}'  
                                       )
                                 `;
            let dados = [codigo, id, estoque, preco, grupo, origem, descricao, num_fabricante, num_original, sku, marca, class_fiscal, data_cadastro, data_recadastro, tipo, observacoes1, observacoes2, observacoes3];
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log(`produto cadastrado com sucesso `);
                    resolve(result);
                }
            });
        });
    }
    // insere o produto com gerando codigo de acordo com o autoIncrement do banco mobile 
    async insert(empresa, produto) {
        return new Promise(async (resolve, reject) => {
            let { ativo, id, class_fiscal, cst, data_cadastro, data_recadastro, descricao, estoque, grupo, marca, num_original, origem, preco, sku, tipo, num_fabricante, observacoes1, observacoes2, observacoes3 } = produto;
            const sql = ` INSERT INTO  ${empresa}.produtos  
                              (
                             id,
                             estoque ,
                             preco ,
                             grupo ,
                             origem ,
                             descricao ,
                             num_fabricante ,
                             num_original ,
                             sku ,
                             marca ,
                             class_fiscal ,
                             data_cadastro ,
                             data_recadastro ,
                             tipo,
                             observacoes1,
                             observacoes2,
                             observacoes3
                                 ) VALUES (
                                     ${id},
                                     ${estoque} ,
                                     ${preco} ,
                                     ${grupo} ,
                                     ${origem} ,
                                     '${descricao}',
                                     '${num_fabricante}' ,
                                     '${num_original}' ,
                                     '${sku}' ,
                                     ${marca} ,
                                     '${class_fiscal}',
                                     '${data_cadastro}',
                                     '${data_recadastro}',  
                                     ${tipo}, 
                                     '${observacoes1}',
                                     '${observacoes2}',
                                     '${observacoes3}'  
                                   )
                             `;
            let dados = [id, estoque, preco, grupo, origem, descricao, num_fabricante, num_original, sku, marca, class_fiscal, data_cadastro, data_recadastro, tipo, observacoes1, observacoes2, observacoes3];
            await databaseConfig_1.conn_mobie.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log(`produto cadastrado com sucesso `);
                    resolve(result);
                }
            });
        });
    }
}
exports.InsertProdutosMobile = InsertProdutosMobile;
