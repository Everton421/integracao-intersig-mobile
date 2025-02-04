import { Router,Request,Response, NextFunction } from "express";
import { conn_mobie   } from "./database/databaseConfig";
import 'dotenv/config';
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

  const cron = require('node-cron')

  const router = Router();
  export const versao = '/v1' 
 
 
 
  router.get('/clientes', new ClienteController().main)
  router.get('/produtos', new ProdutoController().main)
  router.get('/servicos', new ServicoController().main)
  router.get('/tipos_os', new Tipos_osController().main)
  router.get('/veiculos', new VeiculosController().main)
  router.get('/marcas', new marcasController().main)
  router.get('/formasPagamento', new formaPagamentoController().main)
  router.get('/categorias', new categoriasController().main)
  router.get('/pedidos', new pedidosController().main)
  router.get('/usuarios', new UsuarioController().main)
    
   
         cron.schedule('0 */2 * * 1-6', async ()=>{
           let objController = new Tipos_osController();
           await objController.main();
        })

         cron.schedule('0 15 * * 1-6', async ()=>{
           let objController = new VeiculosController();
           await objController.main();
         })
//
           cron.schedule('0 12 * * 1-6', async ()=>{
             let objController = new marcasController();
             await objController.main();
           })
//
          cron.schedule('0 */2 * * 1-6 ', async ()=>{
           let objController = new formaPagamentoController();
           await objController.main();
         })
//
         cron.schedule('0 */3 * * 1-6', async ()=>{
           let objController = new categoriasController();
           await objController.main();
         })
//
        cron.schedule('0 */4 * * 1-6', async ()=>{
            let objController = new ClienteController();
            await objController.main();
          })

          cron.schedule('0 */2 * * 1-6', async ()=>{
            let objController = new ServicoController();
            await objController.main();
         })
      // executa a cada 30 minutos
      cron.schedule('*/30 * * * 1-6', async ()=>{
         let objController = new ProdutoController();
         await objController.main();
      })


      // executa a cada 3 minutos
      cron.schedule('*/3 * * * 1-6', async ()=>{
            let objController = new pedidosController();
            await objController.main();
         })


    export {router} 