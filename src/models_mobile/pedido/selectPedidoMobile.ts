
import { conn_sistema, databaseMobile } from "../../database/databaseConfig";
import { DateService } from "../../services/date";
import { Select_clientes_mobile } from "../cliente/select";
import { IPedidoMobile } from "./types/IPedidoMobile";
import { IProdutoPedidoMobile } from "./types/IProdutoPedidoMobile";
import { IServicosMobile } from "../servicos/types/IServicosMobile";
import { IParcelasPedidoMobile } from "./types/IParcelasPedido";
import { IClienteMobile } from "../cliente/types/IClienteMobile";
import { SelectItemsPedidoMobile } from "./selectItemsPedidoMobile";


export class SelectPedidoMobile {

    
  async buscaCompleta( dataAtual: string   ): Promise<IPedidoMobile[]> {
    let obj = new DateService();

    let selectOrcamentoMobile = new SelectPedidoMobile();

    let selectClientesMobile = new Select_clientes_mobile();

    let selectItemsPedidoMobile = new SelectItemsPedidoMobile();

    let orcamentos_registrados: IPedidoMobile[] = []; // Inicializar como um array vazio


    try {
        let  dados_orcamentos:any  = await selectOrcamentoMobile.buscaPordata( databaseMobile, dataAtual   );

      orcamentos_registrados = await Promise.all(
        dados_orcamentos.map(async (i:IPedidoMobile) => {
          let produtos: IProdutoPedidoMobile[] = [];
          let servicos: IServicosMobile[] = [];
          let parcelas: IParcelasPedidoMobile[] = [];
          let cliente: number =0 ;

          i.data_recadastro = obj.formatarDataHora( i.data_recadastro );
          i.data_cadastro = obj.formatarData(new Date(i.data_cadastro));

          try {
            const resultCliente:IClienteMobile[] = await selectClientesMobile.buscaPorcodigo(  databaseMobile,  i.cliente);

            if(resultCliente.length > 0   ){
                cliente =   resultCliente[0].id
            }
            
          } catch (e) {
            console.log(`erro ao buscar o cliente do pedido ${i.codigo}`);
          }

          try {
            produtos = await selectItemsPedidoMobile.buscaProdutosDoOrcamento( databaseMobile,  i.codigo  );

          } catch (e) {
            console.log(`erro ao buscar os produtos do pedido ${i.codigo}`);
          }

          try {
            servicos = await selectItemsPedidoMobile.buscaServicosDoOrcamento(
              databaseMobile,
              i.codigo
            );
          } catch (e) {
            console.log(`erro ao buscar os servicos do pedido ${i.codigo}`);
          }

          try {
            parcelas = await selectItemsPedidoMobile.buscaParcelasDoOrcamento(
              databaseMobile,
              i.codigo
            );
          } catch (e) {
            console.log(`erro ao buscar as parcelas do pedido ${i.codigo}`);
          }

          return {
            ...i,
            produtos,
            servicos,
            parcelas,
            cliente,
          } ;
        })
      );
      return orcamentos_registrados;
    } catch (error) {
      console.error("Erro ao buscar orcamentos:", error);
      return []; // Retornar um array vazio em caso de erro
    }
  }

  async validaExistencia(empresa: any, codigo: number) {
    return new Promise(async (resolve, reject) => {
      const code = codigo;
      const sql = ` select * from ${empresa}.pedidos where codigo =  ?  `;
      conn_sistema.query(sql, [code], (err: any, result: any) => {
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

  async buscaPordata(empresa: any, queryData: any ) {
    let date = new DateService();

    let param_data: any;
    if (!queryData) {
      param_data = date.obterDataAtual();
    }

    return new Promise<IPedidoMobile[]>(async (resolve, reject) => {
      const sql = `select *, CONVERT(observacoes USING utf8) as observacoes from ${empresa}.pedidos as co
                where   co.data_recadastro >= '${param_data}'  
            `;
      await conn_sistema.query(sql, async (err: any, result: any) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result as IPedidoMobile[]); // Use type assertion here
        }
      });
    });
  }

  async buscaTodos(empresa: any) {
    return new Promise(async (resolve, reject) => {
      const sql = ` select * from ${empresa}.pedidos  `;
      conn_sistema.query(sql, (err: any, result: any) => {
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