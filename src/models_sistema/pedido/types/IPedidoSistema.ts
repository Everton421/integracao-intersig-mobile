
import { IServicosPedidoSistema } from "./IServicosPedidoSistema"    
import { IParcelasPedidoSistema } from "./IParcelasPedidoSistema"  
import { IProdutoPedidoSistema } from "./IProdutoPedidoSistema"   
import { IClientePedidoSistema } from "./IClientePedidoSistema"

export interface IPedidoSistema
{
    codigo:number
    id:number
    id_externo:number

    vendedor:number
    situacao: string
    contato: string
    descontos: number
    forma_pagamento:number
    observacoes: string
    observacoes2:string
    quantidade_parcelas:number
    total_geral: number
    total_produtos: number
    total_servicos: number
    cliente:  IClientePedidoSistema
    veiculo:number
    data_cadastro:string
    data_recadastro:string
    tipo_os:number
    enviado:string
    tipo:number
    just_ipi:string
    just_icms:string
    just_subst:string
    
    produtos:  IProdutoPedidoSistema[]
    servicos: IServicosPedidoSistema[]
    parcelas:  IParcelasPedidoSistema[]  
  }

export type PedidoSimples = {
 codigo:number,
  cod_site:number ,
   data_cadastro:string,
    data_recadastro:string,
}