import { ServicoController } from "../controllers/servicos/servicosController";


export class JobServicos{
    async job(){
  const cron = require('node-cron')
        
        const configservicos = String(process.env.CONFIG_SERVICOS)
      if( configservicos && configservicos != ''){
      cron.schedule(configservicos, async ()=>{
                let objController = new ServicoController();
                await objController.main();
            })
      }else{
          console.log('Nao foi encontrado configuração de envio dos servicos no arquivo .env')
      }
       
    }
}