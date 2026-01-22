import { MovimentosController } from "../controllers/movimentos/movimentos-controller";
import { ProdSetorController } from "../controllers/prod-setor/prod-setor-controller";
import { SetoresController } from "../controllers/setor/setor-controller";
import { SelectConfig } from "../models_integracao/configuracoes/select";
import { UpdateConfigIntegracao } from "../models_integracao/configuracoes/update";
import { DateService } from "../services/date";

export class JobEstoque{
    async job(){
  const cron = require('node-cron')

     let configEnvEstoque = String(process.env.CONFIG_ESTOQUE)
        if( configEnvEstoque && configEnvEstoque != ''){

        cron.schedule( configEnvEstoque, async ()=>{
      console.log(" Job [ESTOQUE] ")

               let movimentosController =  new MovimentosController()  
               let prodSetorController =  new ProdSetorController()  
               let setorController = new SetoresController();
              let configIntegracao = new SelectConfig();
              let verifyConfig = await   configIntegracao.selectConfig();
              let updateConfig = new UpdateConfigIntegracao();
                  if(verifyConfig.length > 0   ){
 
                    if(verifyConfig[0].importar_estoque === 'S'){

                    console.log("Executando tarefa | estoque ")
                    let dateService= new DateService();

                      let data = dateService.obterDataAtual() + ' 00:00:00'

                      await prodSetorController.main( { dataEstoque: data, importar_estoque:verifyConfig[0].importar_estoque} )

                      await movimentosController.main( { dataEstoque: data, importar_estoque:verifyConfig[0].importar_estoque} )
                      await setorController.main();
                    let resultUpdateConfig =  await updateConfig.update({ ultima_verificacao_estoque: dateService.obterDataHoraAtual()})
                if( resultUpdateConfig.affectedRows > 0 ){
                      console.log({ok:true, msg:"fim da validacao"})
                    }
                    }else{
                      console.log("A integracao nao esta configurada para enviar saldo de estoque ")
                    }
              }
              })
      }else{
        console.log('Nao foi encontrado configuração de envio de estoque no arquivo .env')
      }

    }
}