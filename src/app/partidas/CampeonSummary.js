import { procesarNombreIcono } from './utilidades.js';


export class CampeonSummary {
  constructor(invocador, campeon, orden = 0) {
    this.invocador = invocador.Name;
    this.campeon = campeon;
    this.victorias = 0;
    this.derrotas = 0;
    this.games = 0;
    this.killsMedia = 0;
    this.deathsMedia = 0;
    this.assistsMedia = 0;
    this.kills = 0;
    this.deaths = 0;
    this.assists = 0;
    this.imagen = 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/'+procesarNombreIcono(campeon)+'.png';
    this.rank = invocador.Ranking__c;
    this.orden = orden;
  }

  sumarPartida(partida) {
    if (partida.RESULTADO__c === 'WIN') {
      this.victorias++;
    } else if (partida.RESULTADO__c === 'LOSE') {
      this.derrotas++;
    }
    this.games++;
    // Sumar otros datos de la partida si es necesario...
    this.kills += partida.KILLS__c;
    this.deaths += partida.DEATHS__c;
    this.assists += partida.ASSISTS__c;
  }

  calcularPromedios() {
    this.winRatio = this.victorias / (this.victorias + this.derrotas);
    this.kda = this.calculateKDA();
    this.killsMedia = this.kills/this.games;
    this.deathsMedia = this.deaths/this.games;
    this.assistsMedia = this.assists/this.games;
    
  }

  calculateKDA() {
    if (this.deaths === 0) {
        return this.kills + this.assists; 
    } else {
        return (this.kills + this.assists) / this.deaths;
    }
  }

  // Otros métodos...
}