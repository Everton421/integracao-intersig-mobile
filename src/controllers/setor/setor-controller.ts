import { databaseMobile  } from "../../database/databaseConfig";
import { InsertSetorMobile } from "../../models_mobile/setor/insert";
import { SelectSetorMobile } from "../../models_mobile/setor/select";
import { UpdateSetorMobile } from "../../models_mobile/setor/update";
import { SelectSetorSistema } from "../../models_sistema/setor/select";
import { DateService } from "../../services/date";


export class SetoresController{

 

    async main(){

        const selectSetoresMobile = new SelectSetorMobile();
        const insertSetorMobile = new InsertSetorMobile();
        const updateSetorMobile = new UpdateSetorMobile();

        const selectSetorSistema = new SelectSetorSistema();

        const dateService = new DateService();

            try{
                let setoresSistema = await selectSetorSistema.findAll()
                if(setoresSistema.length > 0 ){
                    console.log('verificando setores...')
                        for(let i of setoresSistema ){ 
                            let verifySetorMobile = await selectSetoresMobile.findByCode(databaseMobile, i.CODIGO  )
                            if(verifySetorMobile.length > 0 ){
                                if( i.NOME !== verifySetorMobile[0].descricao){
                                    // update mobile 
                                    console.log(` atualizando setor ${i.NOME } no mobile...`)
                                    let resutlUpdateMobile = await updateSetorMobile.update(databaseMobile, { codigo:i.CODIGO,data_cadastro:i.DATA_CADASTRO, data_recadastro:dateService.obterDataHoraAtual(),descricao:i.NOME });
                                    if(resutlUpdateMobile.affectedRows > 0 ) console.log(`setor ${i.NOME } atualizado com sucesso no mobile`)
                                }else{
                                }
                            }else{
                                /// insert iten mobile 
                                    console.log(` inserindo setor ${i.NOME } no mobile...`)

                                 let resultInsertMobile = await insertSetorMobile.insertByCode(databaseMobile, 
                                    { codigo:i.CODIGO, data_cadastro:i.DATA_CADASTRO, data_recadastro:dateService.obterDataHoraAtual(), descricao:i.NOME}) 
                                    if(resultInsertMobile.affectedRows > 0 ) console.log(`setor ${i.NOME } inserido com sucesso no mobile`)

                            }
                        }
                    console.log('Fim da verificação dos setores...')
                }else{
                    console.log('Nenhum setor encontrado!')
                }

            }catch(e){
                console.log("ocorreu um erro ao tentar processar os setores!  ", e )
            }



    }
}