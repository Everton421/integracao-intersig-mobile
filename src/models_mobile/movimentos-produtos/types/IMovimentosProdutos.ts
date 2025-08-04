    export type IMovimentosProdutosMobile =
        {
         id:number,
        codigo:number
        setor:number
        produto:number
        unidade_medida:string
        quantidade:string
        tipo:string
        historico:string
        data_recadastro:string
        usuario:number
        ent_sai: 'S'| 'E'
        }