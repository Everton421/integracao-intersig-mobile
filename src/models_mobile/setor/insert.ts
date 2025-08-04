import { conn_mobie } from "../../database/databaseConfig";

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

export class InsertSetorMobile{

    async insertByCode( empresa:string, setor:{codigo:number, data_cadastro:string, data_recadastro:string, descricao:string} ):Promise<OkPacket>{
        return new Promise( async (resolve, reject )=>{
            
            let sql = `
                    INSERT INTO ${empresa}.setores (  codigo, data_cadastro, data_recadastro, descricao ) VALUES
                                                      (   ? , ? , ? , ? ); `;
            const values = [ setor.codigo, setor.data_cadastro, setor.data_recadastro, setor.descricao, ]

            await conn_mobie.query( sql , values,(err:any, result:any )=>{
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(result);
                }
            })  
        })
    }
}