 
import { IClienteMobile } from './types/IClienteMobile'   
import {conn_mobie} from '../../database/databaseConfig'

export class Insert_clientes_Mobile{

    async   cadastrar(empresa:any, cliente:IClienteMobile )   {
        return new Promise  ( async ( resolve , reject ) =>{
        let sql =
         `  
         INSERT INTO 
         ${empresa}.clientes
              (   id,
                celular, 
                nome ,
                cep ,
                endereco ,
                ie ,
                numero ,
                cnpj ,
                cidade ,
                data_cadastro ,
                data_recadastro ,
                vendedor,
                bairro,
                estado 
               ) values
                (
                  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );
            `   
                const dados = [  cliente.id, cliente.celular, cliente.nome, cliente.cep, cliente.endereco, cliente.ie, cliente.numero, 
                    cliente.cnpj, cliente.cidade, cliente.data_cadastro, cliente.data_recadastro, cliente.vendedor, cliente.bairro, cliente.estado  ]

             await conn_mobie.query(sql, dados, (err:any, result:IClienteMobile[] )=>{
                if (err) {
                  console.log(err)
                  reject(err);
                }else{ 
                  resolve(result)
                }
               })
         })
    }
  
}

