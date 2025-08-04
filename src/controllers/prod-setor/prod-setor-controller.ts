import { databaseMobile } from "../../database/databaseConfig";
import { SelectConfig } from "../../models_integracao/configuracoes/select";
import { IConfig } from "../../models_integracao/configuracoes/types/IConfig";
import { SelectMovimentosProdutosMobile } from "../../models_mobile/movimentos-produtos/select";
import { InsertProdutoSetorMobile } from "../../models_mobile/produto_setor/insert";
import { ProdutoSetorMobile } from "../../models_mobile/produto_setor/select";
import { UpdateProdutoSetorMobile } from "../../models_mobile/produto_setor/update";
import { InsertProdSetorSistema } from "../../models_sistema/prod_setor/insert";
import { SelectProdSetorSistema } from "../../models_sistema/prod_setor/select";
import { UpdateProdSetorSistema } from "../../models_sistema/prod_setor/update";
import { DateService } from "../../services/date";


export class ProdSetorController{


      async main ( configIntegracao:IConfig ){

        const selectProdSetorSistema = new SelectProdSetorSistema();
        const updateProdSetorSistema = new UpdateProdSetorSistema();
        const insertProdSetorSistema = new InsertProdSetorSistema();

        const updateProdutoSetorMobile = new UpdateProdutoSetorMobile();
        const selectProdutoSetorMobile = new ProdutoSetorMobile();
        const insertProdutoSetorMobile = new InsertProdutoSetorMobile();
        const dateService = new DateService();

            try{    
                if( configIntegracao.importar_estoque === 'S'){
             

                let resultLastItens = await selectProdutoSetorMobile.findLastUpdate(databaseMobile,configIntegracao.ultima_verificacao_estoque )
                  if(resultLastItens.length > 0 ){
                        console.log('Verificando produtos do  setor no mobile  ')

                    for(let i of resultLastItens){
                        let verifyItemSistem = await selectProdSetorSistema.findByProductAndSector(i.produto, i.setor);
                        if(verifyItemSistem.length > 0 ){
                                let validItenSistem = verifyItemSistem[0];
                                if( new Date(i.data_recadastro) > new Date(validItenSistem.DATA_RECAD) ){
                                    //fazer update do item
                                        console.log(new Date(i.data_recadastro),'  >  ', new Date(validItenSistem.DATA_RECAD) );
                                        console.log(' atualizando item na tabela prod_setor ...')
                                        let resultUpdateSistem = await updateProdSetorSistema.update(i)
                                        if( resultUpdateSistem.affectedRows > 0 ) console.log(` Produto ${i.produto} atualizado com sucesso no sistema!`)
                                    }
                               
                            }else{
                                    let resultInsertProdsetor = await insertProdSetorSistema.insert(i)
                                    if(resultInsertProdsetor.affectedRows > 0 )  { console.log(` produto codigo: ${i.produto}  inserido no setor: ${i.setor}!`) }
                            }
                        }
                    }

                    let resultLasItensSistema = await selectProdSetorSistema.findLastUpdated(configIntegracao.ultima_verificacao_estoque )

                    
                       if(resultLasItensSistema.length > 0 ){
                        console.log('Verificando produtos do  setor no sistema  ')
                        for(let i of resultLasItensSistema){
                        let verifyItemMobile = await selectProdutoSetorMobile.findByProdSector(databaseMobile, i.PRODUTO, i.SETOR);
                            if(verifyItemMobile.length > 0 ){
                                let validItenMob = verifyItemMobile[0];
                                if( new Date(i.DATA_RECAD) > new Date(validItenMob.data_recadastro) ){
                                        console.log(' atualizando item na tabela produto_setor do mobile ...')
                                            let resultUpdateMobile =  await updateProdutoSetorMobile.update(i)
                                             if( resultUpdateMobile.affectedRows > 0 ) console.log(` Produto ${i.PRODUTO} atualizado com sucesso no Mobile!`)
                                    }
                            }else{
                                console.log(`inserindo produto: ${i.PRODUTO} no setor: ${i.SETOR} no mobile...`)
                                let resultInsertProdSetorMobile = await insertProdutoSetorMobile.insert(databaseMobile, 
                                    { 
                                       produto:i.PRODUTO,
                                      setor: i.SETOR ,
                                      data_recadastro:  i.DATA_RECAD ,
                                      estoque:i.ESTOQUE,
                                      local1_produto:i.LOCAL1_PRODUTO,
                                      local2_produto:i.LOCAL2_PRODUTO,
                                      local3_produto:i.LOCAL3_PRODUTO,
                                      local4_produto:i.LOCAL4_PRODUTO,
                                      local_produto:i.LOCAL_PRODUTO  
                                    }  )
                                   if(resultInsertProdSetorMobile.affectedRows > 0 ) console.log(`produto: ${i.PRODUTO} inserido com sucesso no setor: ${i.SETOR} no mobile`)
                            }
                        }
                           }
                         

                }else{
                    if( configIntegracao.importar_estoque === 'N'){
                          console.log('a integracao nao esta configurada para enviar os movimentos/produtos nos setores')
                    }else{
                     console.log('Não foi encontrado configurações de envio da integracao')
                    }
                }
            }catch(e){
                console.log(`ocorreu um erro ao processar produtos no setor`,e )
            }

    }

    async insertItens(){

    }
}