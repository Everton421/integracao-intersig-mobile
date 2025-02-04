"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiraCaracteres = void 0;
class TiraCaracteres {
    normalizeString(str) {
        if (!str)
            return str; // Retorna undefined ou null sem alteração
        return str
            .normalize("NFD") // Normaliza para remover acentos
            .replace(/[\u0300-\u036f]/g, "") // Remove acentos
            .replace(/['"]/g, ""); // Remove aspas simples e duplas
    }
}
exports.TiraCaracteres = TiraCaracteres;
