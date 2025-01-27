import { conn_mobie } from "../../database/databaseConfig"
import { ICategoriaMobile } from "./types/ICategoriaMobile";


export class Select_Categorias{


    async busca_por_descricao(empresa:string, descricao:string ){

        return new Promise<ICategoriaMobile[]>( async (resolve, reject)=>{

             let sql = ` SELECT *,
                DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro
             FROM ${empresa}.categorias 
               WHERE descricao = '${descricao}' `
 
            await conn_mobie.query( sql  ,(err, result )=>{
                if(err){
                    console.log(` erro ao buscar categorias    `,err)
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }

    async busca_geral(empresa:string ){

        return new Promise<ICategoriaMobile[]>( async (resolve, reject)=>{

             let sql = ` SELECT *,
                DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro
             FROM ${empresa}.categorias `
 
            await conn_mobie.query( sql  ,(err, result )=>{
                if(err){
                    reject(err);
                }else{
                    console.log(` erro ao buscar categorias    `,err)

                    resolve(result);
                }
            })
        })
    }

    async buscaPorId(empresa:string, id:any ){
        return new Promise<ICategoriaMobile[]>( async (resolve, reject)=>{

             let sql = ` SELECT *,
                DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
                DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro
             FROM ${empresa}.categorias where id = '${id}'`
 
            await conn_mobie.query( sql  ,(err, result )=>{
                if(err){
                    console.log(` erro ao buscar categoria id ${id}`,err)
                    reject(err);

                }else{
                    resolve(result);
                }
            })
        })
    }


}