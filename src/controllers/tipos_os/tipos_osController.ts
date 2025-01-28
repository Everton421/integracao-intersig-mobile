import { databaseMobile, db_publico } from "../../database/databaseConfig";
import { InsertServicoMobile } from "../../models_mobile/servicos/insert";
import { SelectServicosMobile } from "../../models_mobile/servicos/select";
import { IServicosMobile } from "../../models_mobile/servicos/types/IServicosMobile";
import { UpdateServicosMobile } from "../../models_mobile/servicos/update";
import { InsertTiposOsMobile } from "../../models_mobile/tiposOs/insert";
import { SelectTiposOsMobile } from "../../models_mobile/tiposOs/select";
import { ITiposOsMobile } from "../../models_mobile/tiposOs/types/ITiposOsMobile";
import { UpdateTipoOsMobile } from "../../models_mobile/tiposOs/update";
import { SelectServicosSistema } from "../../models_sistema/servicos/select";
import { SelectTiposOsSistema } from "../../models_sistema/tipo_os/select";
import { TiraCaracteres } from "../../services/tiraCaracteres";

export class Tipos_osController{

    async main(){
        
            const selectTiposOsSistema = new SelectTiposOsSistema();
            const selectTiposOsMobile = new SelectTiposOsMobile();
            const insertTipoOsMobile = new InsertTiposOsMobile();
            const updateTipoOsMobile = new UpdateTipoOsMobile();

            const objTiraAspas = new TiraCaracteres();

                let tiposOSsistema = await selectTiposOsSistema.busca(db_publico);

                    if(tiposOSsistema.length > 0 ){
                        let validTipoOSSistema = tiposOSsistema[0];

                        for(let i of tiposOSsistema){
           
                                    let tipoOsMobile = await selectTiposOsMobile.buscaPorId(databaseMobile, i.CODIGO)
                                    let validTipoOSMobile = tipoOsMobile[0]

                                               if(!i.DATA_RECAD  || i.DATA_RECAD === null ){
                                                   i.DATA_RECAD  = '0000-00-00 00:00:00';
                                               } 
                                               if(!i.DATA_CADASTRO || i.DATA_CADASTRO === null ){
                                                i.DATA_CADASTRO = '0000-00-00 00:00:00';
                                            } 
                                                 i.DESCRICAO = objTiraAspas.normalizeString(i.DESCRICAO);
 
                                          let objInsert:ITiposOsMobile = {
                                            id: i.CODIGO,
                                            descricao:i.DESCRICAO,
                                            data_cadastro:i.DATA_CADASTRO,
                                            data_recadastro:i.DATA_RECAD,
                                            codigo:i.CODIGO
                                          }
           
                                           if( tipoOsMobile.length > 0 ){
           
                                             //  if( i.DATA_RECAD >  validTipoOSMobile.data_recadastro){
                                                   //update
                                                    try{
                                                    console.log('atualizando ',i.CODIGO )
                                                      await  updateTipoOsMobile.update(databaseMobile, objInsert)
                                                        return
                                                    }catch(e){ console.log(e)}
                                             //  }else{
                                             //      console.log(i.DATA_RECAD ,' > ',  validTipoOSMobile.data_recadastro)
                                             //      continue;
                                             //  }
                                          }else{
                                            try{ 
                                                   console.log('cadastrando ',i.CODIGO )
                                              //cadastrar
                                               await insertTipoOsMobile.insert(databaseMobile, objInsert)
                                             }catch(e){ console.log(e)}
           
                                          } 
                        }

                    }
    }
}