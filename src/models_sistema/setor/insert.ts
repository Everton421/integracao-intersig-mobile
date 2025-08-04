import { conn_sistema, db_estoque } from "../../database/databaseConfig";
import { ISetorSistema } from "./types/ISetorSistema";

type OkPacket = {
  fieldCount: number,
  affectedRows: number,
  insertId: number,
  serverStatus: number,
  warningCount: number,
  message: string,
  protocol41: boolean,
  changedRows: number
}

export class InsertSetorSistema{

    async insert(  setor:ISetorSistema ):Promise<OkPacket>{

        return new Promise( async (resolve, reject )=>{
            
            let sql = `
                    INSERT INTO ${db_estoque}.setores (
                    NOME,
                    PADRAO_VENDA,
                    PADRAO_COMPRA,
                    PADRAO_PRODUCAO,
                    EST_ATUAL,
                    DATA_CADASTRO
                    ATIVO
                     )
                     VALUES
                    (
                     '${setor.NOME}',
                     '${setor.PADRAO_VENDA}',
                     '${setor.PADRAO_COMPRA}',
                     '${setor.PADRAO_PRODUCAO}',
                     '${setor.EST_ATUAL}',
                     '${setor.DATA_CADASTRO}'
                     '${setor.ATIVO}'
                    ) ; `;

            await conn_sistema.query( sql ,  (err:any, result:any )=>{
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    console.log(result)
                    resolve(result);
                }
            })  
        })
    }
}