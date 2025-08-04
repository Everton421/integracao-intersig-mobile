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

  const cron = require('node-cron')

  const router = Router();
  export const versao = '/v1' 
 
 
  router.get('/', async (req,res )=>{
    const selectConfig = new SelectConfig()
    let config = await selectConfig.selectConfig();
    if(config.length > 0 ){
    res.render('configuracoes',{ dados:config[0]})
    }else{
    res.send('Você precisa verificar a tabela de configurações da integracao')
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
      if( verifyConfig[0].ultima_verificacao_estoque === null || !verifyConfig[0].ultima_verificacao_estoque   ) {
        verifyConfig[0].ultima_verificacao_estoque = '2000-01-01 13:00:00'
      }
       await prodSetorController.main(verifyConfig[0] )
        await movimentosController.main( verifyConfig[0])
      await setorController.main();
      
       let dateService= new DateService();
         
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
   router.get('/pedidos', new pedidosController().main)
   router.get('/usuarios', new UsuarioController().main)
     

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


      const configProdutos = String(process.env.CONFIG_PRODUTOS)

      if( configProdutos && configProdutos != ''){
      
        let configIntegracao = new SelectConfig();

        cron.schedule(configProdutos, async ()=>{
           let verifyConfig = await   configIntegracao.selectConfig();
           let updateConfig = new UpdateConfigIntegracao();
           let dateService= new DateService();

             let objController = new ProdutoController();
             if(verifyConfig.length > 0   ){
                await objController.main(  dateService.formatarDataHora(verifyConfig[0].ultima_verificacao_preco));
                    let resultUpdateConfig =  await updateConfig.update({ ultima_verificacao_preco: dateService.obterDataHoraAtual()})
               if( resultUpdateConfig.affectedRows > 0 ){
                 console.log({ok:true, msg:"fim da validacao dos produtos"})
             }
        }else{
               console.log("Nenhuma configuração encontrada")
             }
          })
        }else{
          console.log('Nao foi encontrado configuração de envio dos produtos no arquivo .env')
      }


     let configEnvEstoque = String(process.env.CONFIG_ESTOQUE)
        if( configEnvEstoque && configEnvEstoque != ''){

        cron.schedule( configEnvEstoque, async ()=>{
               let movimentosController =  new MovimentosController()  
               let prodSetorController =  new ProdSetorController()  
               let setorController = new SetoresController();
              let configIntegracao = new SelectConfig();
              let verifyConfig = await   configIntegracao.selectConfig();
              let updateConfig = new UpdateConfigIntegracao();
                  if(verifyConfig.length > 0   ){
 
                    if(verifyConfig[0].importar_estoque === 'S'){
                     if( verifyConfig[0].ultima_verificacao_estoque === null || !verifyConfig[0].ultima_verificacao_estoque   ) {
                     verifyConfig[0].ultima_verificacao_estoque = '2000-01-01 13:00:00'
                   }
                    console.log("Executando tarefa | estoque ")
                      await prodSetorController.main(verifyConfig[0] )
                      await movimentosController.main( verifyConfig[0])
                      await setorController.main();
                      let dateService= new DateService();
                    let resultUpdateConfig =  await updateConfig.update({ ultima_verificacao_estoque: dateService.obterDataHoraAtual()})
                if( resultUpdateConfig.affectedRows > 0 ){
                      console.log({ok:true, msg:"fim da validacao"})
                    }
                    }else{
                      console.log("A integracao nao esta configurada para enviar saldo de estoque ")
                    }
              }
              })
      }else{
        console.log('Nao foi encontrado configuração de envio de estoque no arquivo .env')
      }


   let configEnvTipoOs = String(process.env.CONFIG_TIPO_OS)
      if(  configEnvTipoOs && configEnvTipoOs != ''){
       cron.schedule(configEnvTipoOs, async ()=>{
              let objController = new Tipos_osController();
              await objController.main();
           })
      }else{
        console.log('Nao foi encontrado configuração de envio dos tipos de os  no arquivo .env')
      }
          
   
    let configEnvVeiculos = String(process.env.CONFIG_VEICULOS)
    if(configEnvVeiculos && configEnvVeiculos !=''){

            cron.schedule(configEnvVeiculos, async ()=>{
              let objController = new VeiculosController();
              await objController.main();
            })
    }else{
          console.log('Nao foi encontrado configuração de envio dos veiculo no arquivo .env')

    }

   const configMarcas = String(process.env.CONFIG_MARCAS)
     if(configMarcas &&  configMarcas !=''){
              cron.schedule(configMarcas, async ()=>{
               let objController = new marcasController();
               await objController.main();
             })
     }else{
          console.log('Nao foi encontrado configuração de envio das marcas no arquivo .env')
     }

   const configEnvFormasPagamento = String(process.env.CONFIG_FORMAS_PAGAMENTO)
 
     if(configEnvFormasPagamento && configEnvFormasPagamento !=''){
    cron.schedule(configEnvFormasPagamento, async ()=>{
              let objController = new formaPagamentoController();
              await objController.main();
            })
        }else{
          console.log('Nao foi encontrado configuração de envio das formas de pagamento no arquivo .env')
     }
         

  const configCAtegorias = String(process.env.CONFIG_CATEGORIAS)
 
     if(configCAtegorias && configCAtegorias !=''){
           cron.schedule(configCAtegorias, async ()=>{
             let objController = new categoriasController();
             await objController.main();
           })
              }else{
          console.log('Nao foi encontrado configuração de envio das categoras no arquivo .env')
     }



    const configClientes = String(process.env.CONFIG_CLIENTE)
    if(configClientes && configClientes != ''){
      cron.schedule(configClientes, async ()=>{
              let objController = new ClienteController();
              await objController.main();
            })
    } else{
          console.log('Nao foi encontrado configuração de envio dos clientes no arquivo .env')
    }
    
      const configservicos = String(process.env.CONFIG_SERVICOS)
      if( configservicos && configservicos != ''){
      cron.schedule(configservicos, async ()=>{
                let objController = new ServicoController();
                await objController.main();
            })
      }else{
          console.log('Nao foi encontrado configuração de envio dos servicos no arquivo .env')
      }
       



      const configPedidos = process.env.CONFIG_PEDIDOS
      if(configPedidos  && configPedidos !=''){
         cron.schedule(configPedidos, async ()=>{
       let configIntegracao = new SelectConfig();
              let verifyConfig = await   configIntegracao.selectConfig();
               let objController = new pedidosController();
             if(verifyConfig.length > 0   ){
               if(verifyConfig[0].importar_pedidos === "S" && verifyConfig[0].ultima_verificacao_pedidos !== null  ){
                    console.log("Executando tarefa, recebendo pedidos ... ")
                 await objController.main(verifyConfig[0].ultima_verificacao_pedidos);
                 }else{
                      console.log("A integracao nao esta configurada para receber pedidos")
                    }
             }else{
               console.log("Nenhuma configuração encontrada")
             }
            })
     }else{
          console.log('Nao foi encontrado configuração de recebimento dos pedidos  no arquivo .env')
      }



    export {router} 