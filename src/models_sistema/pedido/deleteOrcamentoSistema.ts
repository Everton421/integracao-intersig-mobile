import { conn_sistema, db_vendas } from "../../database/databaseConfig";

export class DeleteOrcamentoSistema{
    


    async   deletePro_orca(codigo: number) {
                return new Promise(async(resolve, reject) => {
    
                    let sql2 = ` delete from ${db_vendas}.pro_orca
                                            where orcamento = ${codigo}
                                        `
                 await   conn_sistema.query(sql2, (err:any, result:any) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(result);
                            resolve(result);
                            // statusAtualizacao = result.serverStatus ;
                        }
                    })
                })
    
            }

            async   deleteSer_orca(codigo: number) {
                return new Promise(async(resolve, reject) => {
    
                    let sql2 = ` delete from ${db_vendas}.ser_orca
                                            where orcamento = ${codigo}
                                        `
                  await  conn_sistema.query(sql2, (err:any, result:any) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log( " servico deletado com sucesso ",result);
                            resolve(result);
                            // statusAtualizacao = result.serverStatus ;
                        }
                    })
                })
    
            }
            async   deletePar_orca(codigo: number) {
                return new Promise(async(resolve, reject) => {
    
                    let sql2 = ` delete from ${db_vendas}.par_orca
                                            where orcamento = ${codigo}
                                        `
                 await   conn_sistema.query(sql2, (err:any, result:any) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log( " parcela deletada com sucesso ",result);
                            resolve(result);
                            // statusAtualizacao = result.serverStatus ;
                        }
                    })
                })
    
            }

}