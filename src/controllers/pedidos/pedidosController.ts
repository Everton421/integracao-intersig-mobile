import { Request, Response } from "express";
import { databaseMobile, db_mobile } from "../../database/databaseConfig";
import { SelectOrcamentosMobile } from "../../models_mobile/pedido/select";
import { UpdateOrcamento } from "../../models_mobile/pedido/update";
import { Select_clientes_sistema } from "../../models_sistema/cliente/select";
import { DateService } from "../../services/date";

export class pedidosController{


    async select( req:Request,res:Response){

        let obj = new DateService();

    let selectOrcamentoSistema = new SelectOrcamentosMobile();
    let updateOrcamento = new UpdateOrcamento();
    let select_clientes = new Select_clientes_sistema();

    let dataAtual = '2025-01-28 00:00:00'
        let vendedor = 1
    try{

        const dados_orcamentos:any  = await selectOrcamentoSistema.buscaPordata(  databaseMobile, dataAtual, vendedor  );
       
        const orcamentos_registrados = await Promise.all(dados_orcamentos.map( async (i:any) =>{
                let produtos: any = [];
                let servicos: any = [];
                let parcelas: any = [];
                let cliente:any;
                
                i.data_recadastro = obj.formatarData(new Date(i.data_recadastro));
                i.data_cadastro = obj.formatarData(new Date(i.data_cadastro));

                try{
                  const resultCliente = await select_clientes.buscaPorcodigo(databaseMobile, i.cliente);
                  cliente = resultCliente.length > 0 ? resultCliente[0] : {};
                }catch(e){ console.log(`erro ao buscar os produtos do pedido ${i.codigo}`)}

                try{
                   produtos = await updateOrcamento.buscaProdutosDoOrcamento(databaseMobile, i.codigo);
                }catch(e){ console.log(`erro ao buscar os produtos do pedido ${i.codigo}`)}
                
                try{
                   servicos = await updateOrcamento.buscaServicosDoOrcamento(databaseMobile, i.codigo);
                }catch(e){ console.log(`erro ao buscar os servicos do pedido ${i.codigo}`)}
                
                try{
                  parcelas = await updateOrcamento.buscaParcelasDoOrcamento(databaseMobile, i.codigo);
                }catch(e){ console.log(`erro ao buscar as parcelas do pedido ${i.codigo}`)}
            
                    return {
                        ...i,
                        produtos,
                        servicos,
                        parcelas,
                        cliente
                    }
                }))
        console.log(orcamentos_registrados)

                
        return res.status(200).json(orcamentos_registrados);

        } catch (error) {
             console.error("Erro ao buscar orcamentos:", error);
             return res.status(500).json({ error: "Erro interno ao buscar orcamentos." });
        }

    }


}