import { formaPagamentoController } from "../controllers/formaDePagamamento/formaDePagamamento";

export class JobFormasPagamento{
    async job(){ 
       
        const   cron = require('node-cron')
    const configEnvFormasPagamento = String(process.env.CONFIG_FORMAS_PAGAMENTO)
    
        if(configEnvFormasPagamento && configEnvFormasPagamento !=''){
        cron.schedule(configEnvFormasPagamento, async ()=>{
                let objController = new formaPagamentoController();
                await objController.main();
                })
            }else{
            console.log('Nao foi encontrado configuração de envio das formas de pagamento no arquivo .env')
        }
        
    }
}