


export interface IProdutoPedidoSistema
{
    pedido: number
    desconto: number
    quantidade: number
    preco: number 
    total: number
    id: number

    just_icms:string
    just_ipi:string
    just_subst:string
    fator_val:number
    fator_qtde:number
    tabela:number
  }