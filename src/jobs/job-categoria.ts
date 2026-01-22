import { categoriasController } from "../controllers/categorias/categoriasController";

export class JobCategorias{
    async job(){
        const cron = require('node-cron')
        
  const configCAtegorias = String(process.env.CONFIG_CATEGORIAS)
 
     if(configCAtegorias && configCAtegorias !=''){
           cron.schedule(configCAtegorias, async ()=>{
             let objController = new categoriasController();
             await objController.main();
           })
              }else{
          console.log('Nao foi encontrado configuração de envio das categoras no arquivo .env')
     }

    }
}