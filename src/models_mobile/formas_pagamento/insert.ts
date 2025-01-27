import { conn_mobie } from "../../database/databaseConfig"
import { IForma_pagamento } from "./types/IFormas_pagamento";


export class InsertFormaPagamentoMobile{

    async cadastrar(empresa:string, forma_pagamento:IForma_pagamento){
        return new Promise( async (resolve, reject)=>{

            let sql =
            `
            INSERT into ${empresa}.forma_pagamento
            (
            id,
            descricao,
            desc_maximo,
            parcelas,
            intervalo,
            recebimento,
            data_cadastro,
            data_recadastro
            ) values
            (?, ? ,? ,?, ?, ? ,? ,?  ) 
            `
            let arr  = [  forma_pagamento.id, forma_pagamento.descricao, forma_pagamento.desc_maximo, forma_pagamento.parcelas,
                forma_pagamento.intervalo, forma_pagamento.recebimento, forma_pagamento.data_cadastro, forma_pagamento.data_recadastro
             ]
            await conn_mobie.query(sql, arr,(err:any, result:any)=>{
                if(err) reject(err);
                else resolve(result)
            })
        })
    }
}

 