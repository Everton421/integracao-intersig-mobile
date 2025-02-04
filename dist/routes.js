"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.versao = void 0;
const express_1 = require("express");
require("dotenv/config");
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
const cron = require('node-cron');
const router = (0, express_1.Router)();
exports.router = router;
exports.versao = '/v1';
router.get('/clientes', new clienteController_1.ClienteController().main);
router.get('/produtos', new produtos_1.ProdutoController().main);
router.get('/servicos', new servicosController_1.ServicoController().main);
router.get('/tipos_os', new tipos_osController_1.Tipos_osController().main);
router.get('/veiculos', new VeiculosController_1.VeiculosController().main);
router.get('/marcas', new marcasController_1.marcasController().main);
router.get('/formasPagamento', new formaDePagamamento_1.formaPagamentoController().main);
router.get('/categorias', new categoriasController_1.categoriasController().main);
router.get('/pedidos', new pedidosController_1.pedidosController().main);
router.get('/usuarios', new usuariosController_1.UsuarioController().main);
cron.schedule('0 */2 * * 1-6', async () => {
    let objController = new tipos_osController_1.Tipos_osController();
    await objController.main();
});
cron.schedule('0 15 * * 1-6', async () => {
    let objController = new VeiculosController_1.VeiculosController();
    await objController.main();
});
//
cron.schedule('0 12 * * 1-6', async () => {
    let objController = new marcasController_1.marcasController();
    await objController.main();
});
//
cron.schedule('0 */2 * * 1-6 ', async () => {
    let objController = new formaDePagamamento_1.formaPagamentoController();
    await objController.main();
});
//
cron.schedule('0 */3 * * 1-6', async () => {
    let objController = new categoriasController_1.categoriasController();
    await objController.main();
});
//
cron.schedule('0 */4 * * 1-6', async () => {
    let objController = new clienteController_1.ClienteController();
    await objController.main();
});
cron.schedule('0 */2 * * 1-6', async () => {
    let objController = new servicosController_1.ServicoController();
    await objController.main();
});
// executa a cada 30 minutos
cron.schedule('*/30 * * * 1-6', async () => {
    let objController = new produtos_1.ProdutoController();
    await objController.main();
});
// executa a cada 3 minutos
cron.schedule('*/3 * * * 1-6', async () => {
    let objController = new pedidosController_1.pedidosController();
    await objController.main();
});
