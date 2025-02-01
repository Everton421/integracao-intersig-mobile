 
import { databaseMobile, db_publico } from "../../database/databaseConfig";
import { InsertVeiculoMobile } from "../../models_mobile/veiculo/insert";
import { SelectVeiculosMobile } from "../../models_mobile/veiculo/select";
import { UpdateVeiculosMobile } from "../../models_mobile/veiculo/update";
import { SelectVeiculosSistema } from "../../models_sistema/veiculos/select";
import { TiraCaracteres } from "../../services/tiraCaracteres";

export class VeiculosController{

    async main(){

      const selectVeiculosSistema = new SelectVeiculosSistema();
      const selectVeiculosMobile = new SelectVeiculosMobile();
      const inserVeiculosMobile = new InsertVeiculoMobile();
      const updateVeiculosMobile = new UpdateVeiculosMobile();

            const objTiraAspas = new TiraCaracteres();

                let veicSistema = await selectVeiculosSistema.busca(db_publico);

                    if(veicSistema.length > 0 ){
                        let validTipoOSSistema = veicSistema[0];

                        for(let i of veicSistema){
           
                                    let veicMobile = await selectVeiculosMobile.buscaPorCodigo(databaseMobile, i.CODIGO)
                                    let validVeicMobile = veicMobile[0]

                                               if(!i.DATA_RECAD  || i.DATA_RECAD === null ){
                                                   i.DATA_RECAD  = '0000-00-00 00:00:00';
                                               } 
                                               if(!i.DATA_CADASTRO || i.DATA_CADASTRO === null ){
                                                i.DATA_CADASTRO = '0000-00-00 00:00:00';
                                            } 
                                               
                                          let objInsert:any = {
                                            codigo:i.CODIGO,
                                            id: i.CODIGO,
                                            cliente: i.CLIENTE,
                                            placa: i.PLACA,
                                            marca: i.MARCA,
                                            modelo: i.MODELO,
                                            ano: i.ANO,
                                            cor: i.COR,
                                            combustivel: i.COMBUSTIVEL,
                                            data_cadastro: i.DATA_CADASTRO,
                                            data_recadastro: i.DATA_RECAD,
                                          }
           
                                           if( veicMobile.length > 0 ){
           
                                            //    if( i.DATA_RECAD >  validVeicMobile.data_recadastro){
                                                   //update
                                                    try{
                                                    console.log('atualizando ',i.CODIGO )
                                                      await  updateVeiculosMobile.updateCodigoSistema(databaseMobile, objInsert)
                                                        return
                                                    }catch(e){ console.log(e)}
                                               // }else{
                                               //    console.log(i.DATA_RECAD ,' > ',  validVeicMobile.data_recadastro)
                                             //      continue;
                                             //  }
                                          }else{
                                            try{ 
                                                   console.log('cadastrando ',i.CODIGO )
                                              //cadastrar
                                               await inserVeiculosMobile.insertCodigoSistema(databaseMobile, objInsert)
                                             }catch(e){ console.log(e)} 
           
                                          } 
                        }

                    }
    }
}