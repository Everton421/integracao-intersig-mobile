import { ClienteController } from "../controllers/cliente/clienteController";


export class JobCliente{
    async job(){
        const cron = require('node-cron');

    const configClientes = String(process.env.CONFIG_CLIENTE)
    if(configClientes && configClientes != ''){
      cron.schedule(configClientes, async ()=>{
              let objController = new ClienteController();
              await objController.main();
            })
    } else{
          console.log('Nao foi encontrado configuração de envio dos clientes no arquivo .env')
    }

    }
}