import { pedidosController } from "../controllers/pedidos/pedidosController";
import { SelectConfig } from "../models_integracao/configuracoes/select";
import { UpdateConfigIntegracao } from "../models_integracao/configuracoes/update";
import { DateService } from "../services/date";

export class JobPedidos{
    async  job() {
            const cron = require('node-cron')
            
        const configPedidos = process.env.CONFIG_PEDIDOS
          let updateConfig = new UpdateConfigIntegracao();

      if(configPedidos  && configPedidos !=''){
         cron.schedule(configPedidos, async ()=>{
               let configIntegracao = new SelectConfig(); 
               let verifyConfig = await   configIntegracao.selectConfig();
               let objController = new pedidosController();
               let dateService= new DateService();

             if(verifyConfig.length > 0   ){
               if(verifyConfig[0].importar_pedidos === "S" && verifyConfig[0].ultima_verificacao_pedidos !== null  ){
                    console.log("Executando tarefa, recebendo pedidos ... ")

                      let data = dateService.obterDataAtual() + ' 00:00:00'
                      console.log(data)
                      await objController.main(data);

                    let resultUpdateConfig =  await updateConfig.update({ ultima_verificacao_pedidos: dateService.obterDataHoraAtual()})

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
  
    }
}