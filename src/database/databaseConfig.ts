 
import 'dotenv/config';
import mysql from 'mysql';

/**----------------------------------------------------------------------- */

 if( !process.env.DB_MOBILE ) throw new Error( " DATABASE_MOBILE não foi configurada")
        const hostname = process.env.HOST_MOBILE ;
        const portdb = process.env.PORT_DB_MOBILE;
        const username = process.env.USER_MOBILE;
        const dbpassword = process.env.PASSWORD_MOBILE;
        

       export let databaseMobile = `\`${process.env.DB_MOBILE}\``;


        let port:any | undefined;

        if(portdb !== undefined){
            port  = parseInt(portdb);
        }

       export const conn_mobie =   mysql.createPool({
            connectionLimit : 10,
            host: hostname,
            user: username,
            port: port,
            password: dbpassword,
        })

/*---------------------------------------------------------------------*/ 
        // conexao sistema

 
          const userSistema    = process.env.USER_SISTEMA;
          const passwordSitema  = process.env.PASSWORD_SISTEMA;
          const hostnameSistema    = process.env.HOST_SISTEMA;
          let port_sistema:number | any = process.env.PORT_DB_SISTEMA

	      export const db_financeiro:string | undefined = process.env.DB_FINANCEIRO;
           export const db_estoque:string    | undefined = process.env.DB_ESTOQUE;
           export const db_vendas:string     | undefined = process.env.DB_VENDAS;
           export const db_publico:string    | undefined = process.env.DB_PUBLICO;
          export const db_integracao_mobile:string | undefined = process.env.DB_INTEGRACAO;
            

           if(port_sistema !== undefined){
            port_sistema = parseInt(port_sistema);
           }


           export  var conn_sistema:any = mysql.createPool({
                connectionLimit : 10,
                host: hostnameSistema,
                user: userSistema,
                port:port_sistema,
                password: passwordSitema,
                })



 