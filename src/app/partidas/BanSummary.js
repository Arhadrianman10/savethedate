import { procesarNombreIcono } from './utilidades.js';


export class BanSummary {
  constructor(campeon) {
    this.campeon = campeon;
    this.games = 0;
    this.imagen = 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/'+procesarNombreIcono(campeon)+'.png';
  }

  sumarBan(ban) {
    this.games++;
  }

  calcularPromedios() {
  }

  calculateKDA() {

  }

  // Otros métodos...
}