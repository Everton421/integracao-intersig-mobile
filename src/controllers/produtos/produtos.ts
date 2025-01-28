import {   Request, Response  } from "express";
import { SelectProdutosSistema } from "../../models_sistema/produtos/select";
import { SelectProdutosMobile } from "../../models_mobile/produtos/select";
import { InsertProdutosMobile } from "../../models_mobile/produtos/insert";
import { databaseMobile, db_estoque, db_publico } from "../../database/databaseConfig";
import { IProdutoMobile } from "../../models_mobile/produtos/types/IProdutoMobile";
import { UpdateProdutosMobile } from "../../models_mobile/produtos/update";
import { TiraCaracteres } from "../../services/tiraCaracteres";

export class ProdutoController {

  async main(){
   const selectProdutosSistema = new SelectProdutosSistema();
   const selectProdutosMobile = new SelectProdutosMobile();
   const insertProdutosMobile = new InsertProdutosMobile();
   const updateProdutosMobile = new UpdateProdutosMobile();
    const objTiraAspas = new TiraCaracteres();

    let produtosSistema = await  selectProdutosSistema.buscaGeral(db_estoque, db_publico);

    if(produtosSistema.length > 0 ){

        for( let i of produtosSistema ){
                  let produtoMobile = await selectProdutosMobile.buscaPorId(databaseMobile, i.codigo) 
          
                                              let validProdutoMobile = produtoMobile[0];
                                         
                                              if(i.data_recadastro === null ){
                                                  i.data_recadastro = '0000-00-00 00:00:00';
                                              } 
                                                i.descricao = objTiraAspas.normalizeString(i.descricao);

                                         let objInsert:IProdutoMobile = {
                                          id :i.codigo,
                                          estoque :i.estoque,
                                          preco :i.preco,
                                          grupo :i.grupo,
                                          origem :i.origem,
                                          descricao :i.descricao,
                                          num_fabricante :i.num_fabricante,
                                          num_original :i.num_original,
                                          sku :i.sku,
                                          marca :i.marca,
                                          class_fiscal :i.class_fiscal,
                                          data_cadastro :i.data_cadastro,
                                          data_recadastro :i.data_recadastro,
                                          tipo :i.tipo,
                                          observacoes1 :i.observacoes1,
                                          observacoes2 :i.observacoes2,
                                          observacoes3 :i.observacoes3,
                                          ativo:i.ativo,
                                          codigo:i.codigo,
                                          cst:i.cst
                                         }
          
                                          if( produtoMobile.length > 0 ){
          
                                              if( i.data_recadastro >  validProdutoMobile.data_recadastro){
                                                try{
                                                    console.log('atualizando ',i.codigo )
                                                    await  updateProdutosMobile.update(databaseMobile, objInsert)
                                                }catch(e){
                                                    console.log(e)
                                                }
                                                  //update
                                              
                                              }else{
                                                  console.log(i.data_recadastro ,' > ',  validProdutoMobile.data_recadastro)
                                                  continue;
                                              }
                                         }else{
                                            try{

                                                  console.log('cadastrando ',i.codigo )
                                         //cadastrar
                                          await insertProdutosMobile.insert(databaseMobile, objInsert)
                                                
                                             }catch(e){ console.log(e)

                                             }
        }
    }
  } 


 }
 }

 