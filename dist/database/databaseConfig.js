"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conn_sistema = exports.db_integracao_mobile = exports.db_publico = exports.db_vendas = exports.db_estoque = exports.db_financeiro = exports.conn_mobie = exports.databaseMobile = exports.db_mobile = void 0;
require("dotenv/config");
const mysql_1 = __importDefault(require("mysql"));
/**----------------------------------------------------------------------- */
exports.db_mobile = process.env.DB_MOBILE;
const hostname = process.env.HOST_MOBILE;
const portdb = process.env.PORT_DB_MOBILE;
const username = process.env.USER_MOBILE;
const dbpassword = process.env.PASSWORD_MOBILE;
exports.databaseMobile = `\`${process.env.DB_MOBILE}\``;
//  export const db_publico = process.env.DB_PUBLICO;
//  export const db_vendas = process.env.DB_VENDAS;
//  export const db_estoque = process.env.DB_ESTOQUE;
//  export const db_financeiro = process.env.DB_FINANCEIRO;
let port;
if (portdb !== undefined) {
    port = parseInt(portdb);
}
exports.conn_mobie = mysql_1.default.createPool({
    connectionLimit: 10,
    host: hostname,
    user: username,
    port: port,
    password: dbpassword,
});
/*---------------------------------------------------------------------*/
// conexao sistema
const userSistema = process.env.USER_SISTEMA;
const passwordSitema = process.env.PASSWORD_SISTEMA;
const hostnameSistema = process.env.HOST_SISTEMA;
let port_sistema = process.env.PORT_DB_SISTEMA;
exports.db_financeiro = process.env.DB_FINANCEIRO;
exports.db_estoque = process.env.DB_ESTOQUE;
exports.db_vendas = process.env.DB_VENDAS;
exports.db_publico = process.env.DB_PUBLICO;
exports.db_integracao_mobile = process.env.DB_INTEGRACAO;
if (port_sistema !== undefined) {
    port_sistema = parseInt(port_sistema);
}
exports.conn_sistema = mysql_1.default.createPool({
    connectionLimit: 10,
    host: hostnameSistema,
    user: userSistema,
    port: port_sistema,
    password: passwordSitema,
});
