import { conn_mobie } from "../../database/databaseConfig"
import { IProdutoMobile } from "./types/IProdutoMobile";

export class InsertProdutosMobile{

    async insert ( empresa:any, produto:IProdutoMobile){

       return new Promise( async ( resolve, reject)=>{
            let {
                ativo,
                id,
                class_fiscal,
                cst,
                data_cadastro,
                data_recadastro,
                descricao,
                estoque,
                grupo,
                marca,
                num_original,
                origem,
                preco,
                sku,
                tipo,
                num_fabricante,
                observacoes1,
                observacoes2,
                observacoes3   } = produto 

                const sql =` INSERT INTO  ${empresa}.produtos  
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

                let dados = [   id , estoque , preco ,  grupo , origem ,  descricao ,  num_fabricante ,   num_original , sku ,  marca ,  class_fiscal , data_cadastro , data_recadastro ,  tipo, observacoes1, observacoes2, observacoes3 ]
                            await conn_mobie.query(sql,   (err:any, result:any )=>{
                                if(err){
                                     console.log(err)
                                     reject(err);
                                }else{
                                    console.log(`produto cadastrado com sucesso `)
                                     resolve(result);
                                }
                            })
                        })
        }

}
 