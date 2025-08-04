import { conn_mobie } from "../../database/databaseConfig";
import { ISetorMobile } from "./types/setor";

 
export class SelectSetorMobile{
    
    async   findAll(empresa:any  )   {
        return new Promise <ISetorMobile[]> ( async ( resolve , reject ) =>{
            
            let sql = ` select 
            *,
            coalesce( DATE_FORMAT(data_cadastro, '%Y-%m-%d') , '0000-00-00') AS data_cadastro,
           coalesce( DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s'), '0000-00-00 00:00:00') AS data_recadastro   
            from ${empresa}.setores  `
    
            await conn_mobie.query(sql,   (err:any, result:ISetorMobile[] )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }

    async   findByCode(empresa:any,codigo:number  )   {
        return new Promise <ISetorMobile[]> ( async ( resolve , reject ) =>{
            
            let sql = ` select 
            *,
            coalesce( DATE_FORMAT(data_cadastro, '%Y-%m-%d') , '0000-00-00') AS data_cadastro,
           coalesce( DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s'), '0000-00-00 00:00:00') AS data_recadastro   
            from ${empresa}.setores where codigo = ?   `
    
            await conn_mobie.query(sql, codigo,  (err:any, result:ISetorMobile[] )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }

    async findByDescription(empresa: string, query:{codigo:number, descricao:string}): Promise<ISetorMobile[]> {

            let {
                codigo,
                descricao,
            } = query;
    
            let baseSql = `
                SELECT
                    *,
                    DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
                    DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro  
                FROM  ${empresa}.setores
            `;  
    
            const conditions: string[] = [];
            const params: any[] = [];
    
         
            if (codigo) {
                conditions.push("codigo = ?"); // Placeholder (?) para o parâmetro
                params.push(codigo);          // Adiciona o valor ao array de parâmetros
            }
            
            if (descricao) {
                conditions.push("descricao = ?");
                params.push(`${descricao}`);  
            }
            let whereClause = "";
            
            if (conditions.length > 0) {
                whereClause = " WHERE " + conditions.join(" AND ");
            }
    
            //conditions.join(" LIMIT ?");
    
    
            const finalSql = baseSql + whereClause  
    
            try {
           
                 return new Promise <ISetorMobile[]> ( async ( resolve , reject ) =>{
                    await conn_mobie.query(finalSql, params,(err:any, result:ISetorMobile[] )=>{
                        if (err){
                            reject(err);
                        }else{
                            resolve(result)
    
                        } 
                    })
    
                 })
    
    
            } catch (err) {
                console.error("Erro ao executar a query:", err);
                throw new Error("Falha ao buscar setorres no banco de dados.");
                // Ou `reject(err)` se estivesse dentro do `new Promise` original, mas com async/await é melhor lançar.
            }
       }


       /**
        *   obtem o setor atualizado após a data fornecida 
        * @param empresa 
        * @param data_recadastro 
        * @returns 
        */
    async   findLastUpdated(empresa:any, data_recadastro:string )   {
        return new Promise <ISetorMobile[]> ( async ( resolve , reject ) =>{
            
            let sql = ` select 
            *,
            coalesce( DATE_FORMAT(data_cadastro, '%Y-%m-%d') , '0000-00-00') AS data_cadastro,
           coalesce( DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s'), '0000-00-00 00:00:00') AS data_recadastro   
            from ${empresa}.setores  WHERE data_recadastro >  ? `
    
                 
            await conn_mobie.query(sql, data_recadastro, (err:any, result:ISetorMobile[] )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }
     

}