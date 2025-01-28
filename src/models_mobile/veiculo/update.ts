import { conn_mobie } from "../../database/databaseConfig"

export class UpdateVeiculosMobile{

     async update(empresa:string, veiculo:IVeiculoMobile){
         return new Promise ( async(resolve, reject ) =>{
 
             const sql =` update ${empresa}.veiculos   set
                    id = '${veiculo.id}',
                    cliente = '${veiculo.cliente}',
                    placa = '${veiculo.placa}',
                    marca = '${veiculo.marca}',
                    modelo = '${veiculo.modelo}',
                    ano = '${veiculo.ano}',
                    cor = '${veiculo.cor}',
                    combustivel = '${veiculo.combustivel}',
                    data_cadastro = '${veiculo.data_cadastro}',
                    data_recadastro = '${veiculo.data_recadastro}'
                  where id = '${veiculo.id}'
                   `
 
             await conn_mobie.query(sql, (err:any, result:any )=>{
                 if(err){
                     console.log(`erro ao atualizar veiculo ${veiculo.id}`)
                     console.log(sql)
                     reject(err)
                 }else{
                     reject(result)
                 }
             })  
         })
     }
 }