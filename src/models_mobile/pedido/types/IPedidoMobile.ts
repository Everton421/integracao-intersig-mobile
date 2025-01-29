
import { IServicosMobile } from "../../servicos/types/IServicosMobile"
import { IClientePedidoMobile } from "./IClientePedidoMobile"
import { IParcelasPedidoMobile } from "./IParcelasPedido"
import { IProdutoPedidoMobile } from "./IProdutoPedidoMobile"
export interface IPedidoMobile
{
    codigo:number
    id:number
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
    cliente:  number
    veiculo:number
    data_cadastro:string
    data_recadastro:string
    tipo_os:number
    enviado:string
    tipo:number
    just_ipi:string
    just_icms:string
    just_subst:string
    produtos:  IProdutoPedidoMobile[]
    servicos: IServicosMobile[]
    parcelas:  IParcelasPedidoMobile[]  
  }

