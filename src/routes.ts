import { Router,Request,Response, NextFunction } from "express";
import 'dotenv/config';
import { ClienteController } from "./controllers/cliente/clienteController";
import { categoriasController } from "./controllers/categorias/categoriasController";
import { formaPagamentoController } from "./controllers/formaDePagamamento/formaDePagamamento";
import { marcasController } from "./controllers/marcas/marcasController";
import { ProdutoController } from "./controllers/produtos/produtos";
import { ServicoController } from "./controllers/servicos/servicosController";
import { Tipos_osController } from "./controllers/tipos_os/tipos_osController";
import { VeiculosController } from "./controllers/veiculo/VeiculosController";
import { pedidosController } from "./controllers/pedidos/pedidosController";
import { UsuarioController } from "./controllers/usuarios/usuariosController";
import { ProdSetorController } from "./controllers/prod-setor/prod-setor-controller";
import { MovimentosController } from "./controllers/movimentos/movimentos-controller";
import { SelectConfig } from "./models_integracao/configuracoes/select";
import { UpdateConfigIntegracao } from "./models_integracao/configuracoes/update";
import { DateService } from "./services/date";
import { SetoresController } from "./controllers/setor/setor-controller";
import { InsertConfig } from "./models_integracao/configuracoes/insert";

  const cron = require('node-cron')

  const router = Router();
  export const versao = '/v1' 
 
 
  router.get('/', async (req,res )=>{
                
    const selectConfig = new SelectConfig()
    let config = await selectConfig.selectConfig();
    const insertConfig = new InsertConfig();

    if(config.length > 0 ){

      res.render('configuracoes',{ dados:config[0]})
    
      }else{
        await insertConfig.insert({ 
          codigo:1,
          importar_estoque:'N',
          importar_pedidos:'N',
          ultima_verificacao_estoque:'2000-01-01 00:00:01',
          ultima_verificacao_pedidos:'2000-01-01 00:00:01',
          ultima_verificacao_preco:'2000-01-01 00:00:01'
        })
    let config = await selectConfig.selectConfig();

      res.render('configuracoes',{ dados:config[0]})

    }
  })

  router.post('/ajusteConfig', async (req,res ) =>{
    let updateConfig = new UpdateConfigIntegracao();
 
      if(req.body ){
        let resultUpdateConfigApi = await updateConfig.update({ codigo:1, importar_estoque:req.body.importar_estoque, importar_pedidos:req.body.importar_pedidos})
        if(resultUpdateConfigApi.affectedRows > 0 ){
          res.redirect('/')
        }
      }
  })
 
 
  router.get('/estoque', async  ( req, res )=>{
  let movimentosController =  new MovimentosController()  
  let configIntegracao = new SelectConfig();
  let prodSetorController =  new ProdSetorController()  
  let setorController = new SetoresController();
  let verifyConfig = await   configIntegracao.selectConfig();

  let updateConfig = new UpdateConfigIntegracao();

   if(verifyConfig.length > 0   ){
     if(verifyConfig[0].importar_estoque === 'S'){
    
           let dateService= new DateService();

        let date = dateService.obterDataAtual()+'00:00:00';

       await prodSetorController.main( {dataEstoque:date, importar_estoque:verifyConfig[0].importar_estoque })
        await movimentosController.main( {dataEstoque:date, importar_estoque:verifyConfig[0].importar_estoque })
      await setorController.main();
      
       let resultUpdateConfig =   await updateConfig.update({ ultima_verificacao_estoque: dateService.obterDataHoraAtual()})
       if( resultUpdateConfig.affectedRows > 0 ){
         console.log({ok:true, msg:"fim da validacao"})
         res.status(200).json({ok:true, msg:"fim da validacao"})
       }
     }else{
       console.log("A integracao nao esta configurada para enviar saldo de estoque ")
         res.status(200).json({ok:true, msg:"A integracao nao esta configurada para enviar saldo de estoque "})
     }
   }
 
  }
)
              

   router.get('/clientes', new ClienteController().main)
   
   router.get('/servicos', new ServicoController().main)
   router.get('/tipos_os', new Tipos_osController().main)
   router.get('/veiculos', new VeiculosController().main)
   router.get('/marcas', new marcasController().main)
   router.get('/formasPagamento', new formaPagamentoController().main)
   router.get('/categorias', new categoriasController().main)
   router.get('/usuarios', new UsuarioController().main)
     
////////////////////////
   router.get('/produtos', async (req,res)=>{
       let configIntegracao = new SelectConfig();
       let verifyConfig = await   configIntegracao.selectConfig();
          let updateConfig = new UpdateConfigIntegracao();
           let dateService= new DateService();

             let objController = new ProdutoController();
             if(verifyConfig.length > 0   ){
                await objController.main( dateService.formatarDataHora(verifyConfig[0].ultima_verificacao_preco));
                    let resultUpdateConfig =  await updateConfig.update({ ultima_verificacao_preco: dateService.obterDataHoraAtual()})
               if( resultUpdateConfig.affectedRows > 0 ){
             console.log({ok:true, msg:"fim da validacao"})
          }
        }else{
               console.log("Nenhuma configuração encontrada")
             }
         res.status(200).json({ok:true, msg:"fim da validacao"})

   })
////////////////////////

   router.get('/pedidos', ( req, res)=>{
               let dateService= new DateService();
        let aux = new pedidosController().main( dateService.obterDataAtual()+' 00:00:00');

   })
////////////////////////


   

    export {router} 