 
import {conn_mobie} from '../../database/databaseConfig'
import { ICategoriaMobile } from './types/ICategoriaMobile'

export class Update_categorias_Mobile{

    async   update(empresa:any, categoria:ICategoriaMobile )   {
        return new Promise  ( async ( resolve , reject ) =>{
        let sql =
         `  
       UPDATE
         ${empresa}.categorias
           set id = '${categoria.id}',
            data_cadastro = '${categoria.data_cadastro}',
            data_recadastro = '${categoria.data_recadastro}',
            descricao = '${categoria.descricao}' 
               where id = '${categoria.id}'
            `   

             await conn_mobie.query(sql,    (err:any, result:ICategoriaMobile[] )=>{
                if (err) {
                  console.log(' erro ao atualizar categoria',err)
                  reject(err);
                }else{ 
                  resolve(result)
                }
               })
         })
    }
  
}

