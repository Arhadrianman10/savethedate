// utilidades.js
import { PartidaSummary } from './PartidaSummary';
import { CampeonSummary } from './CampeonSummary';
import { BanSummary } from './BanSummary';
import { SancionSummary } from './SancionSummary';

export const procesarPartidas = (partidas, invocadores, season) => {
  let resumenPartidas = {};

  partidas.forEach(partida => {
    const invocador = partida.INVOCADOR__c;
    const invocadorData = invocadores.find(inv => inv.Name === invocador);
  


    if (!resumenPartidas[invocador]) {
      resumenPartidas[invocador] = new PartidaSummary(invocadorData);
    }
    // Convertir el conjunto a un array y actualizar el estado
    resumenPartidas[invocador].sumarPartida(partida);
  });


  // Calcular promedios y ratios para cada invocador
  Object.values(resumenPartidas).forEach(resumen => resumen.calcularPromedios());

  let resumenesOrdenados = Object.values(resumenPartidas)
  .sort((a, b) => {
    // Compara por winRatio, luego games, luego kda, y finalmente por invocador
    if (a.winRatio !== b.winRatio) return b.winRatio - a.winRatio;
    if (a.games !== b.games) return b.games - a.games;
    if (a.kda !== b.kda) return b.kda - a.kda;
    return a.invocador.localeCompare(b.invocador);
  });
  let contadorOrden = 1;
  // Asigna el índice de orden a cada resumen
  resumenesOrdenados.forEach((resumen, index) => {
    if (resumen.games < partidas.length/30 && season !== 'GLOBAL') { 
      resumen.orden = 99;
    } else {
      resumen.orden = contadorOrden++;
    }
  });

  return resumenesOrdenados;

};

export const procesarSeasons = (partidasData) => {
  const seasonSet = new Set(); // Crear un conjunto para almacenar temporadas únicas

  // Iterar sobre cada grupo de partidas
  partidasData.forEach(group => {
    // Si el grupo tiene un campo '_id' con 'Season__c', añadirlo al conjunto
    if (group._id && group._id.Season__c) {
      seasonSet.add(group._id.Season__c);
    }

    // También iterar sobre los 'uniqueValues' para extraer las temporadas
    group.uniqueValues.forEach(partida => {
      if (partida.Season__c) {
        seasonSet.add(partida.Season__c);
      }
    });
  });

  // El resto del procesamiento es igual
  const seasonsArray = Array.from(seasonSet).filter(season => season !== 'GLOBAL');

  // Ordenar el array por el número de temporada
  seasonsArray.sort((a, b) => {
    const numA = isNaN(a.replace('Season ', '')) ? Infinity : Number(a.replace('Season ', ''));
    const numB = isNaN(b.replace('Season ', '')) ? Infinity : Number(b.replace('Season ', ''));
    return numA - numB;
  });

  seasonsArray.push('GLOBAL');
  return seasonsArray;
};


export const procesarUltimosPicks = (partidas, invocadores) => {
  let resumenPartidas = {};

  partidas.forEach(partida => {
    const invocador = partida.INVOCADOR__c;

    // Si el invocador no está en el resumen o si la partida actual es más reciente, actualizar
    if (!resumenPartidas[invocador] || partida.GAME__c > resumenPartidas[invocador].ultimaPartida) {
      resumenPartidas[invocador] = {
        name: partida.INVOCADOR__c,
        ultimoCampeon: partida.CAMPEON__c,
        ultimaPartida: partida.GAME__c
      };
    }
  });

  return Object.values(resumenPartidas).map( resumen => {
    // Asegurarse de que 'invocador' está definido y corresponde al que necesitas
    const invocador = resumen.name;
    const invocadorData = invocadores.find(inv => inv.Name === invocador);

    return {
      invocador: invocadorData.Name,
      rank: invocadorData.Ranking__c,
      iconInv: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/' + invocadorData.IconCode__c + '.png',
      iconChamp: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/' + procesarNombreIcono(resumen.ultimoCampeon) + '.png',
      ultimoCampeon: resumen.ultimoCampeon,
      ultimaPartida: resumen.ultimaPartida
    };
  });
  
  
};

export const procesarNombreIcono = (nombreIcono) => {
  if (nombreIcono) {
      nombreIcono = nombreIcono.replaceAll(/['" ]/g, '');
      nombreIcono = nombreIcono.replace('ChoGath', 'Chogath');
      nombreIcono = nombreIcono.replace('LeBlanc', 'Leblanc');
      nombreIcono = nombreIcono.replace('Dr.Mundo', 'DrMundo');
      nombreIcono = nombreIcono.replace('KaiSa', 'Kaisa');
      nombreIcono = nombreIcono.replace('BelVeth', 'Belveth');
      nombreIcono = nombreIcono.replace('RenataGlasc', 'Renata');

  }
  return nombreIcono;
};


export const procesarCampeones = (partidas, invocadores) => {
  let resumenPartidas = {};

  partidas.forEach(partida => {
    const campeon = partida.CAMPEON__c;
    const invocador = partida.INVOCADOR__c;
    const invocadorData = invocadores.find(inv => inv.Name === invocador);


    if (!resumenPartidas[campeon]) {
      resumenPartidas[campeon] = new CampeonSummary(invocadorData, campeon);
    }
  
    resumenPartidas[campeon].sumarPartida(partida);
  });


  // Calcular promedios y ratios para cada campeon
  Object.values(resumenPartidas).forEach(resumen => resumen.calcularPromedios());

  let resumenesOrdenados = Object.values(resumenPartidas)
  .sort((a, b) => {
    // Compara por winRatio, luego games, luego kda, y finalmente por campeon
    if (a.winRatio !== b.winRatio) return b.winRatio - a.winRatio;
    if (a.games !== b.games) return b.games - a.games;
    if (a.kda !== b.kda) return b.kda - a.kda;
    return a.campeon.localeCompare(b.campeon);
  });
  let contadorOrden = 1;
  // Asigna el índice de orden a cada resumen
  resumenesOrdenados.forEach((resumen, index) => {
    resumen.orden = contadorOrden++;
  });

  return resumenesOrdenados;

};

export const procesarBans = (bans) => {

  let resumenBans = {};

  bans.forEach(ban => {

    const campeon = ban.CAMPEON__c;

    if (!resumenBans[campeon]) {
      resumenBans[campeon] = new BanSummary(campeon);
    }
  
    resumenBans[campeon].sumarBan(ban);
  });


  // Calcular promedios y ratios para cada campeon
  Object.values(resumenBans).forEach(resumen => resumen.calcularPromedios());

  let resumenesOrdenados = Object.values(resumenBans)
  .sort((a, b) => {
    if (a.games !== b.games) return b.games - a.games;
    return a.campeon.localeCompare(b.campeon);
  });

  return resumenesOrdenados;

};


export const procesarSanciones = (invocadores,sanciones) => {
  let resumenSanciones = {};
  sanciones.forEach(sancion => {
    const invocador = sancion.INVOCADOR__c;
    const invocadorData = invocadores.find(inv => inv.Name === invocador);

    if (!resumenSanciones[invocador]) {
      resumenSanciones[invocador] = new SancionSummary(invocadorData);
    }

    resumenSanciones[invocador].sumarSancion(sancion);

  });

  // Calcular promedios y ratios para cada campeon
  Object.values(resumenSanciones).forEach(resumen => resumen.calcularPromedios());

  let resumenesOrdenados = Object.values(resumenSanciones)
  .sort((a, b) => {
    if (a.sancionLeve !== b.sancionLeve) return b.sancionLeve - a.sancionLeve;
    if (a.sancionGrave !== b.sancionGrave) return b.sancionGrave - a.sancionGrave;
    if (a.sancionMuyGrave !== b.sancionMuyGrave) return b.sancionMuyGrave - a.sancionMuyGrave;
    return a.invocador.localeCompare(b.invocador);
  });

  return resumenesOrdenados;

};





