import { Tipos_osController } from "../controllers/tipos_os/tipos_osController";

export class JobTipoOs{
 
    async   job() {
        
        const cron = require('node-cron');

        let configEnvTipoOs = String(process.env.CONFIG_TIPO_OS)
      if(  configEnvTipoOs && configEnvTipoOs != ''){
       cron.schedule(configEnvTipoOs, async ()=>{
              let objController = new Tipos_osController();
              await objController.main();
           })
      }else{
        console.log('Nao foi encontrado configuração de envio dos tipos de os  no arquivo .env')
      }
          
 
    }
}