"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateService = void 0;
class DateService {
    formatarDataHora(data) {
        data = new Date(data);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        const segundos = String(data.getSeconds()).padStart(2, '0');
        return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    }
    formatarData(data) {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        const segundos = String(data.getSeconds()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    }
    obterHora(data) {
        data = new Date(data);
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        const segundos = String(data.getSeconds()).padStart(2, '0');
        return `${horas}:${minutos}:${segundos}`;
    }
    obterHoraAtual() {
        let data = new Date();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        const segundos = String(data.getSeconds()).padStart(2, '0');
        return `${horas}:${minutos}:${segundos}`;
    }
    converterData(data) {
        const [dia, mes, ano] = data.split('/');
        return `${ano}-${mes}-${dia}`;
    }
    obterDataAtual() {
        const dataAtual = new Date();
        return this.formatarData(dataAtual);
    }
    obterDataHoraAtual() {
        const dataAtual = new Date();
        return this.formatarDataHora(dataAtual);
    }
}
exports.DateService = DateService;
