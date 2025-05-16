
import { conn_sistema,  db_integracao_mobile, db_publico, db_vendas } from "../../database/databaseConfig"   
import { IPedidoMobile } from "../../models_mobile/pedido/types/IPedidoMobile"
import { IPedidoSistema } from "../../models_sistema/pedido/types/IPedidoSistema"
import { paramPedido } from "./types/paramPedido"


    type pedidoPartial =  {
        codigo:number
        cod_site:number
        total_geral:number
        codigo_cliente:number
        forma_pagamento:number
        contato:string
        situacao:string
        nome:string
        cpf:string
        celular:string
        qtde_parcelas:number
        total_produtos:number
        total_servicos:number
        data_cadastro:string
        vendedor:number
        data_recadastro:string
        observacoes:string
        desc_serv:number
        desc_prod:number
        veiculo:number
        tipo_os:number
        tipo:number
    }

export class SelectPedidoIntegracao{
    
    async validaPedido(codigoPedidoMobile:number):Promise<paramPedido>{
                  return new Promise ( async (resolve, reject)=>{
          
                       let sql = ` SELECT * 
                       FROM ${db_integracao_mobile}.pedidos where codigo_mobile=${codigoPedidoMobile} `
           
                      await conn_sistema.query( sql  ,(err:any, result:any )=>{
                          if(err){
                            console.log(` erro ao buscar pedidos  da tabela da api  `,err)
        
                              reject(err);
                          }else{
                              resolve(result);
                          }
                      })
                  })
    }

    async buscaSincronizados():Promise<pedidoPartial[]>{
                  return new Promise ( async (resolve, reject)=>{

        const sql = ` SELECT 
                       co.codigo as codigo,
                       co.cod_site,
                       co.total_geral,
                       cli.codigo as codigo_cliente,
                       co.forma_pagamento,
                       co.contato,
                       co.situacao,
                       cli.nome , 
                        cli.cpf cnpj,
                        cli.celular celular,
                       co.qtde_parcelas quantidade_parcelas, 
                       co.total_produtos total_produtos,
                       co.total_servicos total_servicos,
                       co.data_cadastro,
                       co.vendedor,
                       co.data_recad data_recadastro,
                      CAST( co.observacoes AS char ) observacoes ,
                       co.desc_serv,
                       co.desc_prod ,
                       co.veiculo veiculo,
                       co.tipo_os,
                       co.tipo
                     from ${db_vendas}.cad_orca co
                      join ${db_integracao_mobile}.pedidos pdi on pdi.codigo_sistema = co.codigo
                                   left join ${db_publico}.cad_clie cli on cli.codigo = co.cliente
                                    ;
                                `;
                  await conn_sistema.query( sql  ,(err:any, result:Promise < pedidoPartial[]> )=>{
                          if(err){
                            console.log(` erro ao buscar pedidos  da tabela da api  `,err)
                              reject(err);
                          }else{
                              resolve(result);
                          }
                      })
                 })

    }
}