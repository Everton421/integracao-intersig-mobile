  
  export class DateService{


  formatarDataHora   ( data:any  ):string {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');
    return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}

converterData(data: string): string {
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia}`;
}
  obterDataAtual() {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();
    return `${ano}-${mes}-${dia}`;
}

obterDataHoraAtual(): string {
  const dataAtual = new Date();
 return this.formatarDataHora(dataAtual)
}


}