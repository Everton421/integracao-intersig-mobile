import { conn_mobie } from "../../database/databaseConfig"
import { Select_fotos } from "./select"


export class Delete_fotos{

    async delete(empresa:string, codigoProduto:Number ){

    const select = new Select_fotos();

    try{
        await conn_mobie.query(`DELETE FROM ${empresa}.fotos_produtos WHERE produto=${codigoProduto}`)
        console.log('imagens deletadas com sucesso!')
    }catch(e){ console.log('erro ao deletar as imagens do produto:', codigoProduto)}

}
 

}
