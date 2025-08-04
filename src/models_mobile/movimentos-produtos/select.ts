import { conn_mobie } from "../../database/databaseConfig";
import { IMovimentosProdutosMobile } from "./types/IMovimentosProdutos";


export class SelectMovimentosProdutosMobile{

  async   findLastUpdate(empresa:any, data_recadastro:string )   {
         return new Promise <IMovimentosProdutosMobile[]> ( async ( resolve , reject ) =>{
             let sql = ` select 
             *,
                coalesce( DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s'), '0000-00-00 00:00:00') AS data_recadastro
             from ${empresa}.movimentos_produtos  `
     
                 let paramQuery =[];
                 let valueQuery=[];
             if(data_recadastro){
                 paramQuery.push( ' WHERE data_recadastro >  ? ')
                 valueQuery.push(data_recadastro);
             }
                 let finalSql = sql;
     
                     if( paramQuery.length > 0 ){
                         finalSql = sql + paramQuery;
                     }
             await conn_mobie.query(finalSql, valueQuery, (err:any, result:IMovimentosProdutosMobile[] )=>{
                 if (err)  reject(err); 
                   resolve(result)
             })
          })
     }
}