 
import {conn_mobie} from '../../database/databaseConfig'
import { IMarcasMobile } from './types/IMarcasMobile'

export class Update_marcas_Mobile{

    async   update(empresa:any, marca:IMarcasMobile )   {
        return new Promise  ( async ( resolve , reject ) =>{
        let sql =
         `  
       UPDATE
         ${empresa}.marcas
           set id = '${marca.id}',
            data_cadastro = '${marca.data_cadastro}',
            data_recadastro = '${marca.data_recadastro}',
            descricao = '${marca.descricao}' 
               where id = '${marca.id}'
            `   

             await conn_mobie.query(sql,    (err:any, result:IMarcasMobile[] )=>{
                if (err) {
                  console.log(' erro ao atualizar marca',err)
                  reject(err);
                }else{ 
                  resolve(result)
                }
               })
         })
    }
  
}

