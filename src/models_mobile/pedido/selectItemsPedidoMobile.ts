import { conn_mobie,   databaseMobile } from "../../database/databaseConfig";
import { DateService } from "../../services/date";
import { IPedidoMobile } from "./types/IPedidoMobile";
import { IProdutoPedidoMobile } from "./types/IProdutoPedidoMobile";
import { IServicosMobile } from "../servicos/types/IServicosMobile";
import { IParcelasPedidoMobile } from "./types/IParcelasPedido";


export class SelectItemsPedidoMobile
 {

     async   buscaProdutosDoOrcamento(empresa:any, codigo: number):Promise<IProdutoPedidoMobile[]> {
            return new Promise( async (resolve, reject) => {
             const sql = ` select 
                            pp.pedido,
                           -- pp.codigo,
                            pp.desconto,
                            pp.quantidade,
                            pp.preco,
                            pp.total,
                             p.id,
                              p.codigo
                            from ${empresa}.produtos_pedido pp 
                                join ${empresa}.produtos p on p.codigo = pp.codigo 
                            where pp.pedido = ? `
              await  conn_mobie.query(sql, [codigo], async (err:any, result:IProdutoPedidoMobile[]) => {
                    if (err) {
                        console.log(err)
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        }
        async   buscaServicosDoOrcamento( empresa:any,codigo: number): Promise<IServicosMobile[]>{
            return new Promise( async (resolve, reject) => {
         
                const sql = ` select
                    sp.pedido,
                    s.id ,
                    s.codigo,
                    sp.desconto,
                    sp.quantidade,
                    sp.valor,
                    sp.total
                  from ${empresa}.servicos_pedido sp
                  join ${empresa}.servicos s  on sp.codigo = s.codigo
                  where sp.pedido = ? `
          await      conn_mobie.query(sql, [codigo], async (err:any, result:IServicosMobile[]) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        }

        async   buscaParcelasDoOrcamento(empresa:any,codigo: number):Promise<IParcelasPedidoMobile[]>{
            return new Promise( async (resolve, reject) => {
                const sql = ` select *,  DATE_FORMAT(vencimento, '%Y-%m-%d') AS vencimento   from ${empresa}.parcelas where pedido = ? `
        await    conn_mobie.query(sql, [codigo], async (err:any, result:IParcelasPedidoMobile[]) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        }
     
 

  async validaExistenciaPedido(empresa: any, codigo: number) {
    return new Promise(async (resolve, reject) => {
      const code = codigo;
      const sql = ` select * from ${empresa}.pedidos where codigo =  ?  `;
      conn_mobie.query(sql, [code], (err: any, result: any) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          // console.log(result)

          resolve(result);
        }
      });
    });
  }

  async busca_data_vendedor(empresa: any, queryData: any, vendedor: number) {
    let date = new DateService();

    let param_data: any;
    if (!queryData) {
      param_data = date.obterDataAtual();
    }

    return new Promise<IPedidoMobile[]>(async (resolve, reject) => {
      const sql = `select *, CONVERT(observacoes USING utf8) as observacoes from ${empresa}.pedidos as co
                where   co.data_recadastro >= '${param_data}' and co.vendedor = ${vendedor}
            `;
      await conn_mobie.query(sql, async (err: any, result: any) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result as IPedidoMobile[]); // Use type assertion here
        }
      });
    });
  }

  async buscaTodosPedidos(empresa: any) {
    return new Promise(async (resolve, reject) => {
      const sql = ` select * from ${empresa}.pedidos  `;
      conn_mobie.query(sql, (err: any, result: any) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          // console.log(result)

          resolve(result);
        }
      });
    });
  }

}