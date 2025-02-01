import { conn_mobie } from "../../database/databaseConfig"


export class InsertVeiculoMobile{

    async insert(empresa:string ,veiculo:IVeiculoMobile){
        return new Promise( async(resolve, reject)=>{

            let sql = 
            ` INSERT INTO ${empresa}.veiculos
            ( 
            id,
            cliente,
            placa,
            marca,
            modelo,
            ano,
            cor,
            combustivel,
            data_cadastro,
            data_recadastro
            )values
            (
            '${veiculo.id}',
            '${veiculo.cliente}',
            '${veiculo.placa}',
            '${veiculo.marca}',
            '${veiculo.modelo}',
            '${veiculo.ano}',
            '${veiculo.cor}',
            '${veiculo.combustivel}',
            '${veiculo.data_cadastro}',
            '${veiculo.data_recadastro}' 
            )
            `
            await conn_mobie.query(sql, (err, result )=>{
                if(err){ 
                    console.log(err)
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }
    async insertCodigoSistema(empresa:string ,veiculo:IVeiculoMobile){
        return new Promise( async(resolve, reject)=>{

            let sql = 
            ` INSERT INTO ${empresa}.veiculos
            ( 
            codigo,
            id,
            cliente,
            placa,
            marca,
            modelo,
            ano,
            cor,
            combustivel,
            data_cadastro,
            data_recadastro
            )values
            (
            '${veiculo.codigo}',
            '${veiculo.id}',
            '${veiculo.cliente}',
            '${veiculo.placa}',
            '${veiculo.marca}',
            '${veiculo.modelo}',
            '${veiculo.ano}',
            '${veiculo.cor}',
            '${veiculo.combustivel}',
            '${veiculo.data_cadastro}',
            '${veiculo.data_recadastro}' 
            )
            `
            await conn_mobie.query(sql, (err, result )=>{
                if(err){ 
                    console.log(err)
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }

} 
 