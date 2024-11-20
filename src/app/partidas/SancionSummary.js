import { procesarNombreIcono } from './utilidades.js';


export class SancionSummary {
  constructor(invocador) {
    this.invocador = invocador.Name;
    this.rank = invocador.Ranking__c;
    this.sancionLeve = 0;
    this.sancionGrave = 0;
    this.sancionMuyGrave = 0;
    this.imagen = 'https://ddragon.leagueoflegends.com/cdn/13.20.1/img/profileicon/'+invocador.IconCode__c+'.png';

  }

  sumarSancion(sancion) {
    switch (sancion.Sancion__c) {
      case 'Sancion_Leve':
          this.sancionLeve++;
          break;
      case 'Sancion_Grave':
          this.sancionGrave++;
          break;
      case 'Sancion_Muy_Grave':
          this.sancionMuyGrave++;
          break;
    }
  }

  calcularPromedios() {

  }


  // Otros métodos...
}