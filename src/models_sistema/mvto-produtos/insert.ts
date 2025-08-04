import { conn_sistema, db_vendas } from "../../database/databaseConfig";
import { IMvtoProdutosSistema } from "./types/IMvtoProdutosSistema";

type OkPacket = {
  fieldCount: number,
  affectedRows: number,
  insertId: number,
  serverStatus: number,
  warningCount: number,
  message: string,
  protocol41: true,
  changedRows: number
} 

export class InsertMvtoProdutosSistema{

    async insert(mvto:IMvtoProdutosSistema):Promise<OkPacket>{
            return new Promise( async ( resolve, reject)=>{

        let { 
        chave_mvto,
        item,
        tipo,
        ent_sai,
        setor,
        mov_saldo,
        produto,
        grade,
        padronizado,
        unidade,
        item_unid,
        fator_qtde,
        quantidade,
        data_mvto,
        hora_mvto,
        just_ipi,
        just_icms,
        just_subst
        } =mvto
        const sql = ` INSERT INTO ${db_vendas}.mvto_produtos 
              ( chave_mvto ,
                item ,
                tipo ,
                ent_sai ,
                setor ,
                mov_saldo ,
                produto ,
                grade ,
                padronizado ,
                unidade ,
                item_unid ,
                fator_qtde ,
                quantidade ,
                data_mvto ,
                hora_mvto ,
                just_ipi ,
                just_icms ,
                just_subst 
                )values(
                ${chave_mvto},
                ${item},
                '${tipo}',
                '${ent_sai}',
                ${setor},
                '${mov_saldo}',
                ${produto},
                ${grade},
                ${padronizado},
                '${unidade}',
                ${item_unid},
                ${fator_qtde},
                ${quantidade},
                '${data_mvto}',
                '${hora_mvto}',
                '${just_ipi}',
                '${just_icms}',
                '${just_subst}'
                );
             `
                 await conn_sistema.query(sql,   (err:any, result:any )=>{
                                                  if(err){
                                                       console.log(err)
                                                       reject(err);
                                                  }else{
                                                      console.log(` movimento registrado com sucesso `)
                                                       resolve(result);
                                                  }
                                              })
                                      })
    }
}