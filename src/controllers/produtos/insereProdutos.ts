import { conn, db_estoque, db_publico } from "../../database/databaseConfig";

export class InsereProdutos {
    



    async  index( json:any, conexao:any, dbpublico:any , dbestoque:any, res:Response ) {
        if (!json.produto) {
            console.log('Produto não informado');
            return null; // Retorna null caso o produto não seja informado
        }
           
        
        
        const idProd: any = await this.insertProduto(json.produto[0], conexao, dbpublico);
           
           if(!idProd){
                console.log('erro ao cadastrar')
                 res.status(500).json({err:"erro ao cadastrar produto"})
           return null;
            }else{
                console.log("produto cadastrado produto: "+idProd)
            }

            try {
                await this.insertTabelaDePrecos(json.tabelaDePreco[0], idProd, conexao, dbpublico);
                console.log("tabela ok produto:"+idProd)
            }catch(err)
            {
                return res.status(500).json({err:"erro ao cadastrar tabela de preços"})
            }
        
        
            try {
                await this.insertUnidade(json.unidades[0], idProd, conexao, dbpublico);
                console.log("unidades ok produto:"+idProd)
            }catch(err)
            {
                return res.status(500).json({err:"erro ao cadastrar unidade de medida"})
            }

            try {
                await this.insertProdutoSetor(json.setores[0], idProd, conexao, dbestoque);
                console.log("setor ok produto:"+idProd)

            }catch(err)
            {
                return res.status(500).json({err:"erro ao cadastrar setor"})
            }

         
        return { codigo: idProd };

    }         





    async insertProduto( produto:any, conexao:any, publico:any ){
       
        const {
            codigo, 
            grupo ,
            descricao, 
            numfabricante, 
            num_original ,
            outro_cod ,
            marca ,
            ativo ,
            tipo ,
            class_fiscal, 
            origem,
            cst,
            observacoes1,
            observacoes2,
            observacoes3
        } = produto;

        return new Promise( async (resolve, reject )=>{
            await conexao.query( ` INSERT INTO ${publico}.cad_prod 
                (GRUPO,DESCRICAO,NUM_FABRICANTE,NUM_ORIGINAL,OUTRO_COD,APLICACAO,MARCA,ATIVO,TIPO,CLASS_FISCAL
                    ,ORIGEM,CST,OBSERVACOES1,OBSERVACOES2,OBSERVACOES3)
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            `,[  grupo ,descricao, numfabricante, num_original ,outro_cod, descricao, marca ,ativo ,tipo ,class_fiscal, origem,cst,observacoes1,observacoes2,observacoes3 ]     
            , (err:any, result:any)=>{
                    if(err){
                        reject(err.sqlMessage);
                    }else{
                        resolve(result.insertId);
                    }
            })

        })
    }

    async insertTabelaDePrecos(json: any, codigo: number, conexao: any, publico: any) {
        const {
            tabela,
            produto,
            lbv,
            preco,
            promocao,
            valid_prom,
            promocao_net,
            valid_prom_net,
            lbc,
            prom_especial,
            data_recad,
            prom_especial_net,
            valor_frete,
            inicio_prom
        } = json;
    
        return new Promise((resolve, reject) => {
            conexao.query(
                `INSERT INTO ${publico}.prod_tabprecos (TABELA, PRODUTO, LBV, PRECO, PROMOCAO, VALID_PROM, PROMOCAO_NET, VALID_PROM_NET, LBC, PROM_ESPECIAL,  PROM_ESPECIAL_NET, VALOR_FRETE)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [tabela, codigo, lbv, preco, promocao, valid_prom, promocao_net, valid_prom_net, lbc, prom_especial, prom_especial_net, valor_frete],
                (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async validaTabelaDePreco(  codigo: number, conexao: any, publico: any){
        return new Promise( async (reject , resolve )=>{
            await conexao.query(
                ` SELECT produto FROM ${publico}.prod_tabpreco WHERE produto =${codigo};`
             ,(err:any, result:any )=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }

             })

        })

    } 

    async insertUnidade( json: any, codigo: number, conexao: any, publico: any ){

        const {

            descricao,
            sigla,
            fracionavel,
            fator_val,
            fator_qtde,
            padr_ent,
            padr_sai,
            padr_sep,
            und_trib
        } = json


        return new Promise(  (resolve, reject)=>{
             conexao.query( 
                ` INSERT INTO ${publico}.unid_prod 
                    (PRODUTO, DESCRICAO, SIGLA)
                    VALUES( ?,?,?)
                `,[codigo, descricao, sigla ], (err:any, result:any)=>{
                        if(err){
                            reject(err.sqlMessage);
                        }else{
                            resolve(result);
                        }

                }
            )
        })
    }

async insertProdutoSetor( json: any, codigo: number, conexao: any, dbestoque: any){
    const {
        codigoSetor,
        nome_setor,
        produto,
        estoque,
        local1,
        local2,
        local3,
        data_recad,
        local,
        
    } = json;


    return new Promise( async ( resolve, reject )=>{

        await conexao.query(
            ` INSERT INTO ${dbestoque}.prod_setor 
            ( SETOR, PRODUTO, ESTOQUE, LOCAL1_PRODUTO, LOCAL2_PRODUTO, LOCAL3_PRODUTO, LOCAL_PRODUTO)
            VALUES( ?,?,?,?,?,?,?)
            `,[codigoSetor, codigo, estoque, local1, local2, local3, local ], (err:any, result:any)=>{

                if(err){
                    reject(err);
                }else{
                    resolve(result)
                }
            }
        )
    })
}
async buscaProdutoCadastrado( codigo:any, conexao:any, dbestoque:any, dbpublico:any){
    return new Promise( (reject, resolve)=>{
        conexao.query(
            `
            SELECT p.codigo, p.descricao, ps.estoque, pp.preco
            FROM ${dbpublico}.cad_prod p
            JOIN ${dbestoque}.prod_setor ps ON p.codigo = ps.produto
            JOIN ${dbpublico}.prod_tabprecos pp ON p.codigo = pp.produto
            WHERE p.CODIGO = ${codigo};
                `, ( err:any, result:any )=>{
                    if(err){
                            reject(err);
                    }else{
                        resolve(result);
                    }
                }
            
            )
    })
}




}