import { Router,Request,Response, NextFunction } from "express";
import { conn_mobie   } from "./database/databaseConfig";
import 'dotenv/config';
import { Select_clientes_mobile } from "./models_mobile/cliente/select";
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

  const crypt = require('crypt');
  const router = Router();
  export const versao = '/v1' 
 
         let  dbName = `\`${11122233344}\``;

   /**   router.get(`${versao}/`, async (req:Request, res:Response)=>{
      await conn.getConnection(
        async (err:Error)=>{
          if(err){
              return res.status(500).json({"erro": "falha ao se conectar ao banco de dados1 "})
          }else{
          //  res.header("Access-Control-Allow-Origin", "*");
          //  res.header("Access-Control-Allow-Headers", "Origin, X-Request-Width, Content-Type, Accept");
            return  res.json({"ok":true});
          }
        }
      )
    })*/

 
    router.get(`/teste`,  
 
  new pedidosController().select
      
       
     
     )

 
 

    export {router} 