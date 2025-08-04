import { conn_mobie } from "../../database/databaseConfig";
import { IProdutoSetorMobile } from "./types/IProduto-setor-mobile";

type query = {
            setor:string,
            produto:string,
            local_produto:string,
            local1_produto:string,
            local2_produto:string,
            local3_produto:string,
            local4_produto:string
}
export class ProdutoSetorMobile {

 
        async   findLastUpdate(empresa:any, data_recadastro:string )   {
        return new Promise <IProdutoSetorMobile[]> ( async ( resolve , reject ) =>{
            let sql = ` select 
            *,
               coalesce( DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s'), '0000-00-00 00:00:00') AS data_recadastro
            from ${empresa}.produto_setor  `
    
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
            await conn_mobie.query(finalSql, valueQuery, (err:any, result:IProdutoSetorMobile[] )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }

     async findByDescription(empresa: string, query:Partial<query>): Promise<IProdutoSetorMobile[]> {
   
            let {
            setor,
            produto,
            local_produto,
            local1_produto,
            local2_produto,
            local3_produto,
            local4_produto
            } = query;
    
            let baseSql = `
                SELECT
                    *,
                 coalesce( DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s'), '0000-00-00 00:00:00') AS data_recadastro
                FROM  ${empresa}.setores
            `;  
    
            const conditions: string[] = [];
            const params: any[] = [];
    
        
            if (setor) {
                conditions.push(" setor = ?"); // Placeholder (?) para o parâmetro
                params.push(setor);          // Adiciona o valor ao array de parâmetros
            }
            
            if (produto) {
                conditions.push(" produto = ?");
                params.push( produto );  
            }

            if(local_produto){
                conditions.push(' local_produto = ? ');
                params.push(`${local_produto}`)
            }
            if(local1_produto){
                conditions.push(' local1_produto = ? ');
                params.push(`${local1_produto}`)
            }
            if(local2_produto){
                conditions.push(' local2_produto = ? ');
                params.push(`${local2_produto}`)
            }
            if(local3_produto){
                conditions.push(' local3_produto = ? ');
                params.push(`${local3_produto}`)
            }
            if(local4_produto){
                conditions.push(' local4_produto = ? ');
                params.push(`${local4_produto}`)
            }


            let whereClause = "";
            
            if (conditions.length > 0) {
                whereClause = " WHERE " + conditions.join(" AND ");
            }
    
            //conditions.join(" LIMIT ?");
    
    
            const finalSql = baseSql + whereClause  
    
            try {
           
                 return new Promise <IProdutoSetorMobile[]> ( async ( resolve , reject ) =>{
                    await conn_mobie.query(finalSql, params,(err:any, result:IProdutoSetorMobile[] )=>{
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

     
    async   findByCode(empresa:any,  produto:number )   {
        return new Promise <IProdutoSetorMobile[]> ( async ( resolve , reject ) =>{
            
            let sql = ` select 
            *,
                 coalesce( DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s'), '0000-00-00 00:00:00') AS data_recadastro
            from ${empresa}.produto_setor where produto = ?  `
    
             
            await conn_mobie.query(sql, produto, (err:any, result:IProdutoSetorMobile[] )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }
 async   findByProdSector(empresa:any,  produto:number, setor:number )   {
        return new Promise <IProdutoSetorMobile[]> ( async ( resolve , reject ) =>{
            let sql = ` select 
            *,
                 coalesce( DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s'), '0000-00-00 00:00:00') AS data_recadastro
            from ${empresa}.produto_setor where produto = ${produto}  and setor = ${setor} `
    
            await conn_mobie.query(sql , (err:any, result:IProdutoSetorMobile[] )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }

}


 

   
 