import { conn_mobie, conn_sistema, db_estoque, db_vendas } from "../../database/databaseConfig";
import { ISetorMobile } from "../../models_mobile/setor/types/setor";
import { ISetorSistema } from "./types/ISetorSistema";

 type query = {
    CODIGO:number
    NOME:string
    ATIVO:'S'|'N'

//    PADRAO_VENDA:'X'|''
//    PADRAO_COMPRA:'X'|''
//    PADRAO_PRODUCAO:'X'|''
//    EST_ATUAL:'X'|''
//    DATA_CADASTRO:string
 }
 
export class SelectSetorSistema{
    
    async   findAll()   {
        return new Promise <ISetorSistema[]> ( async ( resolve , reject ) =>{
            
            let sql = ` select 
            *,
            coalesce( DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') , '0000-00-00') AS DATA_CADASTRO 
            from ${db_estoque}.setores  WHERE  ATIVO = 'S';`
    
           
                 
            await conn_sistema.query(sql, (err:any, result:ISetorSistema[] )=>{
                if (err)  reject(err); 
                  resolve(result)
            })
         })
    }

    async findByDescription(  query: Partial<query>): Promise<ISetorSistema[]> {

            let {
               ATIVO,
               CODIGO,
               NOME,
              // DATA_CADASTRO,
              // EST_ATUAL,
              // PADRAO_COMPRA,
              // PADRAO_PRODUCAO,
              // PADRAO_VENDA
            } = query;
    
            let baseSql = `
                SELECT
                    *,
                    DATE_FORMAT(DATA_CADASTRO, '%Y-%m-%d') AS DATA_CADASTRO,
                FROM  ${db_vendas}.setores  
            `;  
    
            const conditions: string[] = [];
            const params: any[] = [];
     
    
            if (CODIGO) {
                conditions.push("CODIGO = ?"); // Placeholder (?) para o parâmetro
                params.push(CODIGO);          // Adiciona o valor ao array de parâmetros
            }
            
            if (NOME) {
                conditions.push("NOME = ?");
                params.push(`${NOME}`);  
            }
              if (ATIVO) {
                conditions.push("ATIVO = ?");
                params.push(`${ATIVO}`);  
            }

            let whereClause = "";
            
            if (conditions.length > 0) {
                whereClause = " WHERE " + conditions.join(" AND ");
            }
    
            //conditions.join(" LIMIT ?");
    
    
            const finalSql = baseSql + whereClause 
    
            try {
           
                 return new Promise <ISetorSistema[]> ( async ( resolve , reject ) =>{
                    await conn_sistema.query(finalSql, params,(err:any, result:ISetorSistema[] )=>{
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
            }
       }


  

}