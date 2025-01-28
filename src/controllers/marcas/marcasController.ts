import { databaseMobile, db_publico } from "../../database/databaseConfig";
import { Insert_MarcasMobile } from "../../models_mobile/marcas/insert";
import { Select_MarcasMobile } from "../../models_mobile/marcas/select";
import { IMarcasMobile } from "../../models_mobile/marcas/types/IMarcasMobile";
import { Update_marcas_Mobile } from "../../models_mobile/marcas/update";
import { SelectMarcasSistema } from "../../models_sistema/marcas/select";
import { IMarcasSistema } from "../../models_sistema/marcas/types/IMarcasSistema";

    export class marcasController{

        async main(){
            const selectMarcasSistema = new SelectMarcasSistema();
            const insert_MarcasMobile = new Insert_MarcasMobile()
            const selectMarcasMobile = new Select_MarcasMobile();
            const updateMarcasMobile = new Update_marcas_Mobile();


                let marcasSistema:IMarcasSistema[] = await selectMarcasSistema.busca_geral( db_publico );

                    if( marcasSistema.length > 0 ){

                        for( let i of marcasSistema){

                                let marcasMobile = await selectMarcasMobile.buscaPorId(databaseMobile, i.CODIGO) 

                                    let validMarcaMobile = marcasMobile[0];
                               
                                    if(i.DATA_RECAD === null ){
                                        i.DATA_RECAD = '0000-00-00 00:00:00';
                                    } 

                               let objInsert:IMarcasMobile = {
                                id:i.CODIGO,
                                data_cadastro: i.DATA_CADASTRO,
                                data_recadastro:i.DATA_RECAD,
                                descricao:i.DESCRICAO,
                                codigo:i.CODIGO
                               }

                                if( marcasMobile.length > 0 ){

                                    if( i.DATA_RECAD >  validMarcaMobile.data_recadastro){
                                        try{
                                            //update
                                            console.log('atualizando ',i.CODIGO )
                                        await  updateMarcasMobile.update(databaseMobile, objInsert)
                                    }catch(e){ console.log(e)}

                                    }else{
                                        console.log(i.DATA_RECAD ,' > ',  validMarcaMobile.data_recadastro)
                                        continue;
                                    }
                               }else{
                           try{
                                console.log('cadastrando ',i.CODIGO )
                               //cadastrar
                                await insert_MarcasMobile.cadastrar(databaseMobile, objInsert)
                            }catch(e){ console.log(e)}

                               } 

                        }
                    }
            
        }

    }