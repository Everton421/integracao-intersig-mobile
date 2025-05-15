import { databaseMobile, db_publico } from "../../database/databaseConfig";
import { Insert_Categorias } from "../../models_mobile/categorias/insert";
import { Select_Categorias } from "../../models_mobile/categorias/select";
import { ICategoriaMobile } from "../../models_mobile/categorias/types/ICategoriaMobile";
import { Update_categorias_Mobile } from "../../models_mobile/categorias/update";
import { SelectCategoriasSistema } from "../../models_sistema/categorias/select";
import { ICategoriasSistema } from "../../models_sistema/categorias/types/ICategoriasSistema";
import { DateService } from "../../services/date";

export class categoriasController{



    async main(){
        const selectCategoriasMobile = new Select_Categorias()
        const insertCategoriasMobile = new Insert_Categorias()

        const selectCategoriasSistema = new SelectCategoriasSistema()
        const update_categorias_Mobile = new Update_categorias_Mobile();

        const dateService= new DateService();

       let categoriasSistema :ICategoriasSistema[];

       categoriasSistema = await selectCategoriasSistema.busca_geral(db_publico);
                 
                 if(categoriasSistema.length > 0 ){
                         for(let i of categoriasSistema ){
                             let validCategoriaMobile:ICategoriaMobile[];

                             validCategoriaMobile = await selectCategoriasMobile.buscaPorCodigo(databaseMobile, i.CODIGO);

                             let objInsertMobile:any =
                             {
                                codigo:i.CODIGO,
                                id:i.CODIGO,
                                data_cadastro:i.DATA_CADASTRO,
                                data_recadastro:i.DATA_RECAD,
                                descricao:i.NOME
                             }

                             let categoriaV:any = validCategoriaMobile[0]

                           let dataHoraAtual = dateService.obterDataHoraAtual()
  
  
                                        if( validCategoriaMobile.length > 0 ){

                                            if(i.DATA_RECAD === null  || !i.DATA_RECAD   ){
                                                i.DATA_RECAD = '0000-00-00'
                                                objInsertMobile.data_recadastro = '0000-00-00 00:00:00'
                                            }
                                            if( categoriaV.data_recadastro === null    ){
                                                categoriaV.data_recadastro = dateService.obterDataHoraAtual();
                                            }

                                               if(  i.DATA_RECAD > categoriaV.data_recadastro ){
                                          
                                                try{ 
                                                      console.log(` atualizando categoria ${objInsertMobile.codigo}  `,i.DATA_RECAD ,'>', categoriaV.data_recadastro )
                                                        await update_categorias_Mobile.updateCodigoSistema(databaseMobile, objInsertMobile)
                                                }catch(e){ console.log(e)}
                                                 
                                             }else{
                                                 console.log(' categoria ',i.CODIGO,' se encontra atualizada ' , i.DATA_RECAD,' > ', categoriaV.data_recadastro)
                                                 continue
                                             }

                                        }else{

                                     try{ 
                                            console.log('cadastrando categoria codigo:', i.CODIGO,' ', i.NOME )
                                           let aux =  await insertCategoriasMobile.cadastrarCodigoSistema(databaseMobile, objInsertMobile)
                                    }catch(e){ console.log(e)}

                                        }
                                        
                         }
                 }
       

    }

}