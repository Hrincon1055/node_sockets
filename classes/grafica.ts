export class GraficaData {
  private meses: string[] = ['enero', 'febrero', 'marzo', 'abril'];
  private valores: number[] = [1, 2, 3, 4];
  constructor() {}
  public getDataGrafica(): {
    data: number[];
    label: string;
  }[] {
    return [
      {
        data: this.valores,
        label: 'Ventas',
      },
    ];
  }
  public incrementarValor(
    mes: string,
    valor: number
  ): {
    data: number[];
    label: string;
  }[] {
    mes = mes.toLowerCase().trim();
    for (const i in this.meses) {
      if (this.meses[i] === mes) {
        this.valores[i] += valor;
      }
    }
    return this.getDataGrafica();
  }
}
