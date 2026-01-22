import { ProdutoController } from "../controllers/produtos/produtos";
import { SelectConfig } from "../models_integracao/configuracoes/select";
import { UpdateConfigIntegracao } from "../models_integracao/configuracoes/update";
import { DateService } from "../services/date";

export class JobProdutos{
    
    async job(){
  const cron = require('node-cron')

      const configProdutos = String(process.env.CONFIG_PRODUTOS)

      if( configProdutos && configProdutos != ''){
      
        let configIntegracao = new SelectConfig();

        cron.schedule(configProdutos, async ()=>{
      console.log(" Job [PRODUTOS] ")

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
    }

}