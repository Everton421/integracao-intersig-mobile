import {   Request, Response  } from "express";
import { SelectProdutosSistema } from "../../models_sistema/produtos/select";
import { SelectProdutosMobile } from "../../models_mobile/produtos/select";
import { InsertProdutosMobile } from "../../models_mobile/produtos/insert";
import { databaseMobile, db_estoque, db_publico } from "../../database/databaseConfig";
import { IProdutoMobile } from "../../models_mobile/produtos/types/IProdutoMobile";
import { UpdateProdutosMobile } from "../../models_mobile/produtos/update";
import { TiraCaracteres } from "../../services/tiraCaracteres";

export class ProdutoController {


  async main(data:string){
      const codigoSetor = 1 ; 

   const selectProdutosSistema = new SelectProdutosSistema();
   const selectProdutosMobile = new SelectProdutosMobile();
   const insertProdutosMobile = new InsertProdutosMobile();
   const updateProdutosMobile = new UpdateProdutosMobile();
    const objTiraAspas = new TiraCaracteres();

    let produtosSistema = await  selectProdutosSistema.findByLastUpdated(db_estoque, db_publico, data);
 
    if(produtosSistema.length > 0 ){

        for( let i of produtosSistema ){
                  let produtoMobile = await selectProdutosMobile.buscaPorCodigo(databaseMobile, i.codigo) 
            
                                              let validProdutoMobile = produtoMobile[0];
                                         
                                             
                                              let data_ult_atualizacao = i.data_ultima_alteracao

                                                if( validProdutoMobile && new Date(i.data_ultima_alteracao) > new Date(validProdutoMobile.data_recadastro) ){
                                                    let arrEstoque = await selectProdutosSistema.buscaEstoqueRealPorSetor( i.codigo,  codigoSetor )
                                                    if(arrEstoque.length > 0 ){
                                                       i.estoque = arrEstoque[0].ESTOQUE  
                                                    } 
                                                  } 
                                                  
                     
                                                i.descricao = objTiraAspas.normalizeString(i.descricao);

                                         let objInsert:IProdutoMobile = {
                                           
                                          id :i.codigo,
                                          estoque :i.estoque,
                                          preco :i.preco,
                                          unidade_medida:i.unidade_medida,
                                          grupo :i.grupo,
                                          origem :Number(i.origem),
                                          descricao :i.descricao,
                                          num_fabricante :i.num_fabricante,
                                          num_original :i.num_original,
                                          sku :i.sku,
                                          marca :i.marca,
                                          class_fiscal :i.class_fiscal,
                                          data_cadastro :i.data_cadastro,
                                          data_recadastro :data_ult_atualizacao,
                                          tipo :i.tipo,
                                          observacoes1 :i.observacoes1,
                                          observacoes2 :i.observacoes2,
                                          observacoes3 :i.observacoes3,
                                          ativo:i.ativo,
                                          codigo:i.codigo,
                                          cst:Number(i.cst)
                                         }
          
                                          if( produtoMobile.length > 0 ){

                                              if( new Date( data_ult_atualizacao )  >  new Date(validProdutoMobile.data_recadastro)) {
                                                try{
                                                    console.log('atualizando produto codigo: ',i.codigo  )
                                                    await  updateProdutosMobile.update(databaseMobile, objInsert)
                                                }catch(e){
                                                    console.log(e)
                                                }
                                              
                                              }else{
                                                  console.log('o produto codigo: ',i.codigo, ' se encontra atualizado',  data_ult_atualizacao ,' > ',  validProdutoMobile.data_recadastro )
                                                  continue;
                                              }
                                         }else{
                                            try{
                                                  console.log('cadastrando produto codigo: ',i.codigo )
                                          await insertProdutosMobile.insertProdutoCodigoSistema(databaseMobile, objInsert)
                                                
                                             }catch(e){ console.log(e)
                                  }  
                    }
      }
  } 
 


 }
 }

 