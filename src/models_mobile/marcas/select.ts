import { conn_mobie } from "../../database/databaseConfig"
import { IMarcasMobile } from "./types/IMarcasMobile";


export class Select_MarcasMobile{


    async busca_por_descricao(empresa:string, descricao:string ){

        return new Promise( async (resolve, reject)=>{

             let sql = ` SELECT *,
                DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro
             FROM ${empresa}.marcas 
               WHERE descricao = '${descricao}' `
 
            await conn_mobie.query( sql  ,(err:any, result :any)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }


    async busca_geral(empresa:string  ){
        return new Promise( async (resolve, reject)=>{

             let sql = ` SELECT *,
                DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro
             FROM ${empresa}.marcas   `
 
            await conn_mobie.query( sql  ,(err:any, result:any )=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }


async buscaPorId(empresa:string, id:any ){
        return new Promise<IMarcasMobile[]>( async (resolve, reject)=>{

             let sql = ` SELECT *,
                DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro
             FROM ${empresa}.marcas where id = '${id}'`
 
            await conn_mobie.query( sql  ,(err, result )=>{
                if(err){
                    console.log(` erro ao buscar marca id ${id}`,err)
                    reject(err);

                }else{
                    resolve(result);
                }
            })
        })
    }

}