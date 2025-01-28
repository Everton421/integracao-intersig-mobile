export class TiraCaracteres{

      normalizeString(str:string) {
        if (!str) return str; // Retorna undefined ou null sem alteração
        return str
            .normalize("NFD") // Normaliza para remover acentos
            .replace(/[\u0300-\u036f]/g, "") // Remove acentos
            .replace(/['"]/g, ""); // Remove aspas simples e duplas
    }
}