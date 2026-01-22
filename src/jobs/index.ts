import { JobCategorias } from "./job-categoria";
import { JobCliente } from "./job-clientes";
import { JobEstoque } from "./job-estoque";
import { JobFormasPagamento } from "./job-formas-pagamento";
import { JobMarcas } from "./job-marcas";
import { JobProdutos } from "./job-produtos";
import { JobServicos } from "./job-servicos";
import { JobTipoOs } from "./job-tipo-os";
import { JobVeiculos } from "./job-veiculos";

export class MainJob {

    async job(){

const jobCategorias = new JobCategorias();
const jobProdutos = new JobProdutos();
const jobCliente = new JobCliente();
const jobEstoque = new JobEstoque();
const jobServicos = new JobServicos();
const jobTipoOs = new JobTipoOs();
const jobFormaPagamento = new JobFormasPagamento();
const jobMarcas = new JobMarcas()
const jobVeiculos= new JobVeiculos();

console.log("Iniciando tarefas ")

await jobCategorias.job();
await jobProdutos.job();
await jobCliente.job();
await jobEstoque.job();
await jobServicos.job();
await jobTipoOs.job();
await jobFormaPagamento.job();
await jobMarcas.job();
await jobVeiculos.job();

 }


}


