import { marcasController } from "../controllers/marcas/marcasController";

export class JobMarcas{
    async job(){
        const cron = require('node-cron');
        
        const configMarcas = String(process.env.CONFIG_MARCAS)
     
        if(configMarcas &&  configMarcas !=''){
              cron.schedule(configMarcas, async ()=>{
               let objController = new marcasController();
               await objController.main();
             })
     }else{
          console.log('Nao foi encontrado configuração de envio das marcas no arquivo .env')
     }

    }
}