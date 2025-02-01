import { conn_mobie } from "../../database/databaseConfig";

export class DeleteItensPedidoMobile{
    
     async   deleteProdutosPedido( empresa:any, codigo: number) {
            return new Promise( async(resolve, reject) => {
    
                let sql2 = ` delete from ${empresa}.produtos_pedido
                                        where pedido = ${codigo}
                                    `
                 await   conn_mobie.query(sql2, (err:any, result:any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
    
        }
    
        async   deleteServicosPedido(empresa:any ,codigo: number) {
            return new Promise( async(resolve, reject) => {
    
                let sql2 = ` delete from ${empresa}.servicos_pedido
                                        where pedido = ${codigo}
                                    `
             await   conn_mobie.query(sql2, (err:any, result:any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
    
        }
    
        async   deleteParcelasPedido(empresa:any,codigo: number) {
            return new Promise( async(resolve, reject) => {
    
                let sql2 = ` delete from ${empresa}.parcelas
                                        where pedido = ${codigo}
                                    `
                 await  conn_mobie.query(sql2, (err:any, result:any) => {
                    if (err) {
                       reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
    
        }
    
}