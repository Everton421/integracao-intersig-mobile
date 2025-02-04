"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const path = require('path');
var bodyParser = require('body-parser');
require("dotenv/config");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'Views'));
// Configuração do CORS
const corsOptions = {
    origin: '*', // Permitir todas as origens. Para maior segurança, considere especificar as origens permitidas.
    methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version', 'Authorization'],
    credentials: true, // Permitir credenciais
};
app.use((0, cors_1.default)(corsOptions));
//      app.use(`${versao}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(express_1.default.json());
app.use(routes_1.router);
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        });
    }
    res.status(500).json({
        status: 'error ',
        messsage: 'internal server error.'
    });
});
const PORT_API = process.env.PORT_API; // Porta padrão para HTTPS
app.listen(PORT_API, () => { console.log(`app rodando porta ${PORT_API}  `); });
