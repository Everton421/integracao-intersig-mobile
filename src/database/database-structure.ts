import { conn_mobie, conn_sistema, databaseMobile, db_integracao_mobile } from "./databaseConfig";

 
export async  function seed(){

    const databaseConfigMobile = `\`${db_integracao_mobile}\``;
      const tables = [
        `CREATE DATABASE IF NOT EXISTS ${databaseConfigMobile};`,
     
        `CREATE TABLE IF NOT EXISTS ${databaseConfigMobile}.configuracoes  (
         codigo  int(11) NOT NULL,
         ultima_verificacao_estoque  datetime NOT NULL DEFAULT '2000-01-01 00:00:01',
         importar_pedidos  enum('N','S') DEFAULT 'N',
         importar_estoque  enum('N','S') DEFAULT 'N',
         ultima_verificacao_preco  datetime NOT NULL DEFAULT '2000-01-01 00:00:01',
         ultima_verificacao_pedidos  datetime NOT NULL DEFAULT '2000-01-01 00:00:01',
        PRIMARY KEY ( codigo )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`,

       `CREATE TABLE  IF NOT EXISTS ${databaseConfigMobile}.movimentos  (
           Id  int(11) NOT NULL AUTO_INCREMENT,
           id_mobile  varchar(255) NOT NULL DEFAULT '0',
           codigo_sistema  varchar(255) DEFAULT '0',
          PRIMARY KEY ( Id )
        ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci; `,

    ]


    return new Promise( async (resolve, reject ) =>{
        let resultFunction:{ sucess:boolean, message:string} = { sucess:false , message:'tabelas ja existem'};

        for ( const sql of tables){
        await conn_sistema.query( sql, ( err:any, result:any )=>{
            if(err){
                console.log(err)
                resultFunction = { sucess:false , message: `Erro ao tentar registrar a tabela ${sql} | [ ERRO ]: ${err}` } 
                  reject(resultFunction)   ; 
                }else{
                resultFunction = { sucess:true  , message: `` } 
            }
               
        })
        resolve(resultFunction)
    }
    })
}