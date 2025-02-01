import { conn_mobie } from "../../database/databaseConfig"
import { IProdutoMobile } from "./types/IProdutoMobile"

export class UpdateProdutosMobile{


    async update(empresa:string, produto:IProdutoMobile){
        return new Promise ( async(resolve, reject ) =>{

            const sql =` update ${empresa}.produtos  
                     set
                codigo = '${produto.codigo}',
                 id =  '${produto.id}',  
                 estoque =  ${produto.estoque} ,
                 preco =  ${produto.preco} ,
                 grupo =  ${produto.grupo} ,
                 origem =  ${produto.origem} ,
                 descricao =  '${produto.descricao}',
                 num_fabricante =  '${produto.num_fabricante}' ,
                 num_original =  '${produto.num_original}' ,
                 sku =  '${produto.sku}' ,
                 marca =   ${produto.marca} ,
                 class_fiscal =  '${produto.class_fiscal}',
                 data_cadastro =  '${produto.data_cadastro}',
                 data_recadastro =  '${produto.data_recadastro}',  
                 tipo =  ${produto.tipo}, 
                 observacoes1 =  '${produto.observacoes1}',
                 observacoes2 =  '${produto.observacoes2}',
                 observacoes3=  '${produto.observacoes3}'  
                 where codigo = '${produto.codigo}'
                  `

            await conn_mobie.query(sql, (err, result )=>{
                if(err){
                    console.log(`erro ao atualizar produto ${produto.codigo}`)
                    console.log(sql)
                    reject(err)
                }else{
                    reject(result)
                }
            })  
        })
    }
}