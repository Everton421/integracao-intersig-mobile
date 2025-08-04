"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.versao = void 0;
const express_1 = require("express");
require("dotenv/config");
const clienteController_1 = require("./controllers/cliente/clienteController");
const categoriasController_1 = require("./controllers/categorias/categoriasController");
const formaDePagamamento_1 = require("./controllers/formaDePagamamento/formaDePagamamento");
const marcasController_1 = require("./controllers/marcas/marcasController");
const produtos_1 = require("./controllers/produtos/produtos");
const servicosController_1 = require("./controllers/servicos/servicosController");
const tipos_osController_1 = require("./controllers/tipos_os/tipos_osController");
const VeiculosController_1 = require("./controllers/veiculo/VeiculosController");
const pedidosController_1 = require("./controllers/pedidos/pedidosController");
const usuariosController_1 = require("./controllers/usuarios/usuariosController");
const prod_setor_controller_1 = require("./controllers/prod-setor/prod-setor-controller");
const movimentos_controller_1 = require("./controllers/movimentos/movimentos-controller");
const select_1 = require("./models_integracao/configuracoes/select");
const update_1 = require("./models_integracao/configuracoes/update");
const date_1 = require("./services/date");
const setor_controller_1 = require("./controllers/setor/setor-controller");
const cron = require('node-cron');
const router = (0, express_1.Router)();
exports.router = router;
exports.versao = '/v1';
router.get('/', async (req, res) => {
    const selectConfig = new select_1.SelectConfig();
    let config = await selectConfig.selectConfig();
    if (config.length > 0) {
        res.render('configuracoes', { dados: config[0] });
    }
    else {
        res.send('Você precisa verificar a tabela de configurações da integracao');
    }
});
router.post('/ajusteConfig', async (req, res) => {
    let updateConfig = new update_1.UpdateConfigIntegracao();
    if (req.body) {
        let resultUpdateConfigApi = await updateConfig.update({ codigo: 1, importar_estoque: req.body.importar_estoque, importar_pedidos: req.body.importar_pedidos });
        if (resultUpdateConfigApi.affectedRows > 0) {
            res.redirect('/');
        }
    }
});
router.get('/estoque', async (req, res) => {
    let movimentosController = new movimentos_controller_1.MovimentosController();
    let configIntegracao = new select_1.SelectConfig();
    let prodSetorController = new prod_setor_controller_1.ProdSetorController();
    let setorController = new setor_controller_1.SetoresController();
    let verifyConfig = await configIntegracao.selectConfig();
    let updateConfig = new update_1.UpdateConfigIntegracao();
    if (verifyConfig.length > 0) {
        if (verifyConfig[0].importar_estoque === 'S') {
            if (verifyConfig[0].ultima_verificacao_estoque === null || !verifyConfig[0].ultima_verificacao_estoque) {
                verifyConfig[0].ultima_verificacao_estoque = '2000-01-01 13:00:00';
            }
            await prodSetorController.main(verifyConfig[0]);
            await movimentosController.main(verifyConfig[0]);
            await setorController.main();
            let dateService = new date_1.DateService();
            let resultUpdateConfig = await updateConfig.update({ ultima_verificacao_estoque: dateService.obterDataHoraAtual() });
            if (resultUpdateConfig.affectedRows > 0) {
                console.log({ ok: true, msg: "fim da validacao" });
                res.status(200).json({ ok: true, msg: "fim da validacao" });
            }
        }
        else {
            console.log("A integracao nao esta configurada para enviar saldo de estoque ");
            res.status(200).json({ ok: true, msg: "A integracao nao esta configurada para enviar saldo de estoque " });
        }
    }
});
router.get('/clientes', new clienteController_1.ClienteController().main);
router.get('/servicos', new servicosController_1.ServicoController().main);
router.get('/tipos_os', new tipos_osController_1.Tipos_osController().main);
router.get('/veiculos', new VeiculosController_1.VeiculosController().main);
router.get('/marcas', new marcasController_1.marcasController().main);
router.get('/formasPagamento', new formaDePagamamento_1.formaPagamentoController().main);
router.get('/categorias', new categoriasController_1.categoriasController().main);
router.get('/pedidos', new pedidosController_1.pedidosController().main);
router.get('/usuarios', new usuariosController_1.UsuarioController().main);
router.get('/produtos', async (req, res) => {
    let configIntegracao = new select_1.SelectConfig();
    let verifyConfig = await configIntegracao.selectConfig();
    let updateConfig = new update_1.UpdateConfigIntegracao();
    let dateService = new date_1.DateService();
    let objController = new produtos_1.ProdutoController();
    if (verifyConfig.length > 0) {
        await objController.main(dateService.formatarDataHora(verifyConfig[0].ultima_verificacao_preco));
        let resultUpdateConfig = await updateConfig.update({ ultima_verificacao_preco: dateService.obterDataHoraAtual() });
        if (resultUpdateConfig.affectedRows > 0) {
            console.log({ ok: true, msg: "fim da validacao" });
        }
    }
    else {
        console.log("Nenhuma configuração encontrada");
    }
    res.status(200).json({ ok: true, msg: "fim da validacao" });
});
const configProdutos = String(process.env.CONFIG_PRODUTOS);
if (configProdutos && configProdutos != '') {
    let configIntegracao = new select_1.SelectConfig();
    cron.schedule(configProdutos, async () => {
        let verifyConfig = await configIntegracao.selectConfig();
        let updateConfig = new update_1.UpdateConfigIntegracao();
        let dateService = new date_1.DateService();
        let objController = new produtos_1.ProdutoController();
        if (verifyConfig.length > 0) {
            await objController.main(dateService.formatarDataHora(verifyConfig[0].ultima_verificacao_preco));
            let resultUpdateConfig = await updateConfig.update({ ultima_verificacao_preco: dateService.obterDataHoraAtual() });
            if (resultUpdateConfig.affectedRows > 0) {
                console.log({ ok: true, msg: "fim da validacao dos produtos" });
            }
        }
        else {
            console.log("Nenhuma configuração encontrada");
        }
    });
}
else {
    console.log('Nao foi encontrado configuração de envio dos produtos no arquivo .env');
}
let configEnvEstoque = String(process.env.CONFIG_ESTOQUE);
if (configEnvEstoque && configEnvEstoque != '') {
    cron.schedule(configEnvEstoque, async () => {
        let movimentosController = new movimentos_controller_1.MovimentosController();
        let prodSetorController = new prod_setor_controller_1.ProdSetorController();
        let setorController = new setor_controller_1.SetoresController();
        let configIntegracao = new select_1.SelectConfig();
        let verifyConfig = await configIntegracao.selectConfig();
        let updateConfig = new update_1.UpdateConfigIntegracao();
        if (verifyConfig.length > 0) {
            if (verifyConfig[0].importar_estoque === 'S') {
                if (verifyConfig[0].ultima_verificacao_estoque === null || !verifyConfig[0].ultima_verificacao_estoque) {
                    verifyConfig[0].ultima_verificacao_estoque = '2000-01-01 13:00:00';
                }
                console.log("Executando tarefa | estoque ");
                await prodSetorController.main(verifyConfig[0]);
                await movimentosController.main(verifyConfig[0]);
                await setorController.main();
                let dateService = new date_1.DateService();
                let resultUpdateConfig = await updateConfig.update({ ultima_verificacao_estoque: dateService.obterDataHoraAtual() });
                if (resultUpdateConfig.affectedRows > 0) {
                    console.log({ ok: true, msg: "fim da validacao" });
                }
            }
            else {
                console.log("A integracao nao esta configurada para enviar saldo de estoque ");
            }
        }
    });
}
else {
    console.log('Nao foi encontrado configuração de envio de estoque no arquivo .env');
}
let configEnvTipoOs = String(process.env.CONFIG_TIPO_OS);
if (configEnvTipoOs && configEnvTipoOs != '') {
    cron.schedule(configEnvTipoOs, async () => {
        let objController = new tipos_osController_1.Tipos_osController();
        await objController.main();
    });
}
else {
    console.log('Nao foi encontrado configuração de envio dos tipos de os  no arquivo .env');
}
let configEnvVeiculos = String(process.env.CONFIG_VEICULOS);
if (configEnvVeiculos && configEnvVeiculos != '') {
    cron.schedule(configEnvVeiculos, async () => {
        let objController = new VeiculosController_1.VeiculosController();
        await objController.main();
    });
}
else {
    console.log('Nao foi encontrado configuração de envio dos veiculo no arquivo .env');
}
const configMarcas = String(process.env.CONFIG_MARCAS);
if (configMarcas && configMarcas != '') {
    cron.schedule(configMarcas, async () => {
        let objController = new marcasController_1.marcasController();
        await objController.main();
    });
}
else {
    console.log('Nao foi encontrado configuração de envio das marcas no arquivo .env');
}
const configEnvFormasPagamento = String(process.env.CONFIG_FORMAS_PAGAMENTO);
if (configEnvFormasPagamento && configEnvFormasPagamento != '') {
    cron.schedule(configEnvFormasPagamento, async () => {
        let objController = new formaDePagamamento_1.formaPagamentoController();
        await objController.main();
    });
}
else {
    console.log('Nao foi encontrado configuração de envio das formas de pagamento no arquivo .env');
}
const configCAtegorias = String(process.env.CONFIG_CATEGORIAS);
if (configCAtegorias && configCAtegorias != '') {
    cron.schedule(configCAtegorias, async () => {
        let objController = new categoriasController_1.categoriasController();
        await objController.main();
    });
}
else {
    console.log('Nao foi encontrado configuração de envio das categoras no arquivo .env');
}
const configClientes = String(process.env.CONFIG_CLIENTE);
if (configClientes && configClientes != '') {
    cron.schedule(configClientes, async () => {
        let objController = new clienteController_1.ClienteController();
        await objController.main();
    });
}
else {
    console.log('Nao foi encontrado configuração de envio dos clientes no arquivo .env');
}
const configservicos = String(process.env.CONFIG_SERVICOS);
if (configservicos && configservicos != '') {
    cron.schedule(configservicos, async () => {
        let objController = new servicosController_1.ServicoController();
        await objController.main();
    });
}
else {
    console.log('Nao foi encontrado configuração de envio dos servicos no arquivo .env');
}
const configPedidos = process.env.CONFIG_PEDIDOS;
if (configPedidos && configPedidos != '') {
    cron.schedule(configPedidos, async () => {
        let configIntegracao = new select_1.SelectConfig();
        let verifyConfig = await configIntegracao.selectConfig();
        let objController = new pedidosController_1.pedidosController();
        if (verifyConfig.length > 0) {
            if (verifyConfig[0].importar_pedidos === "S" && verifyConfig[0].ultima_verificacao_pedidos !== null) {
                console.log("Executando tarefa, recebendo pedidos ... ");
                await objController.main(verifyConfig[0].ultima_verificacao_pedidos);
            }
            else {
                console.log("A integracao nao esta configurada para receber pedidos");
            }
        }
        else {
            console.log("Nenhuma configuração encontrada");
        }
    });
}
else {
    console.log('Nao foi encontrado configuração de recebimento dos pedidos  no arquivo .env');
}
