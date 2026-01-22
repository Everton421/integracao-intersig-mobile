import { VeiculosController } from "../controllers/veiculo/VeiculosController";

export class JobVeiculos{
    async job(){
          const  cron = require('node-cron')

        let configEnvVeiculos = String(process.env.CONFIG_VEICULOS)
        if(configEnvVeiculos && configEnvVeiculos !=''){

                cron.schedule(configEnvVeiculos, async ()=>{
                let objController = new VeiculosController();
                await objController.main();
                })
        }else{
            console.log('Nao foi encontrado configuração de envio dos veiculo no arquivo .env')

        }

    }
}