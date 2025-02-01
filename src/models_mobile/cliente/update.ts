 
import { IClienteMobile } from './types/IClienteMobile'   
import {conn_mobie} from '../../database/databaseConfig'

export class Updata_clientes_Mobile{

    async   update(empresa:any, cliente:IClienteMobile )   {
        return new Promise  ( async ( resolve , reject ) =>{
        let sql =
         `  
       UPDATE
         ${empresa}.clientes
              set   id = '${cliente.id}',
                celular = '${cliente.celular}', 
                nome = '${cliente.nome}',
                cep   = '${cliente.cep}',
                endereco  = '${cliente.endereco}',
                ie  = '${cliente.ie}',
                numero  = '${cliente.numero}',
                cnpj  = '${cliente.cnpj}',
                cidade  = '${cliente.cidade}',
                data_cadastro  = '${cliente.data_cadastro}',
                data_recadastro  = '${cliente.data_recadastro}',
                vendedor =  ${cliente.vendedor},
                bairro = '${cliente.bairro}',
                estado = '${cliente.estado}' 
               where id = ${cliente.id}
                  
            `   

             await conn_mobie.query(sql,    (err:any, result:IClienteMobile[] )=>{
                if (err) {
                  console.log(' erro ao atualizar cliente',err)
                  reject(err);
                }else{ 
                  resolve(result)
                }
               })
         })
    }
  
    async   updateCodigoSistema(empresa:any, cliente:IClienteMobile )   {
      return new Promise  ( async ( resolve , reject ) =>{
      let sql =
       `  
     UPDATE
       ${empresa}.clientes
            set  
              codigo = '${cliente.codigo}',
            id = '${cliente.id}',
              celular = '${cliente.celular}', 
              nome = '${cliente.nome}',
              cep   = '${cliente.cep}',
              endereco  = '${cliente.endereco}',
              ie  = '${cliente.ie}',
              numero  = '${cliente.numero}',
              cnpj  = '${cliente.cnpj}',
              cidade  = '${cliente.cidade}',
              data_cadastro  = '${cliente.data_cadastro}',
              data_recadastro  = '${cliente.data_recadastro}',
              vendedor =  ${cliente.vendedor},
              bairro = '${cliente.bairro}',
              estado = '${cliente.estado}' 
             where codigo = ${cliente.codigo}
                
          `   

           await conn_mobie.query(sql,    (err:any, result:IClienteMobile[] )=>{
              if (err) {
                console.log(' erro ao atualizar cliente',err)
                reject(err);
              }else{ 
                resolve(result)
              }
             })
       })
  }

}

