import { conn_sistema, db_integracao_mobile } from "../../database/databaseConfig";
import { IConfig } from "./types/IConfig";

 export class InsertConfig{

    async insert(config: IConfig ){
     return new Promise <IConfig[]> ( async ( resolve , reject ) =>{

        const database = `\`${db_integracao_mobile}\``;

                let sql = ` 
                INSERT INTO  ${database}.configuracoes SET  
                  codigo = ${config.codigo} , 
                  ultima_verificacao_estoque = '${config.ultima_verificacao_estoque}' ,
                  importar_pedidos = '${config.importar_pedidos}',
                  importar_estoque = '${config.importar_estoque}',
                  ultima_verificacao_preco = '${config.ultima_verificacao_preco}', 
                  ultima_verificacao_pedidos ='${config.ultima_verificacao_pedidos}';
                ;`;

                   await conn_sistema.query(sql , (err:any, result:IConfig[] )=>{
                                 if (err)  reject(err); 
                                   resolve(result)
                             })
          })
    }
 }