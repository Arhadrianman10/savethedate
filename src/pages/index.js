import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Partidas from './components/Partidas';
import UltimosPicks from './components/UltimosPicks';
import Campeones from './components/Campeones';
import Bans from './components/Bans';
import Sanciones from './components/Sanciones';
import Image from 'next/image';

// Importa otros componentes que necesites


function App() {
  const [activeComponent, setActiveComponent] = useState('partidas');
  const [seasons, setSeasons] = useState([]);
  const [season, setSeason] = useState(null); 
  const [gamesTotal, setGamesTotal] = useState(null);
  const [partidasData, setPartidasData] = useState(null);
  const [invocadoresData, setInvocadoresData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); // Iniciar la carga
    const fetchDataSeason = async () => {
      try {
        let url = '/api/partidas?fields=Season__c';
        let partidasResponse = await fetch(url);
        if (!partidasResponse.ok) {
          throw new Error(`HTTP error! status: ${partidasResponse.status}`);
        }
        let partidasData = await partidasResponse.json();

        // Suponiendo que `partidasData` contiene la información relevante
        try {
          const response = await fetch('/api/procesarSeasons', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ seasonsData: partidasData }),
          });
          if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
          }
          const seasonsProcesadas = await response.json();

          setSeasons(seasonsProcesadas); // Actualizar el estado con los datos procesados
        } catch (error) {
          console.error('Error al procesar partidas:', error);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
  
    fetchDataSeason();
  }, []);

  useEffect(() => {
    setIsLoading(true); // Iniciar la carga
  }, [activeComponent]);

  useEffect(() => {
    setIsLoading(true); // Iniciar la carga
    // Obtener los invocadores

    const fetchData = async () => {
			try {
				let url = '/api/partidas';
        if (season !== 'GLOBAL') {
          url += `?season=${season}`;
        }
    
        let partidasResponse = await fetch(url);
        if (!partidasResponse.ok) {
          throw new Error(`HTTP error! status: ${partidasResponse.status}`);
        }
        // Usa la función de estado para actualizar partidasData
        setPartidasData(await partidasResponse.json());

				// Obtiene los invocadores
				let invocadoresResponse = await fetch('/api/invocadores');
        if (!invocadoresResponse.ok) {
          throw new Error(`HTTP error! status: ${invocadoresResponse.status}`);
        }
        // Usa la función de estado para actualizar invocadoresData
        setInvocadoresData(await invocadoresResponse.json());
        // Procesa y asocia los datos
			} catch (error) {
				console.error('Error al obtener los datos 1:', error);
			}
		};

		fetchData();
  
  }, [season]);

  useEffect(() => {
    setSeason(seasons[seasons.length - 2]);
  }, [seasons]);

  useEffect(() => {
    if (partidasData && partidasData.length) {
      setGamesTotal(partidasData.length / 10);
    }
  }, [partidasData]);

  const baseStyle = {
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'overlay',
  };

  function getBackgroundStyle(season) {
    const seasonStyles = {
      'Season 0': `url('/assets/Season0.jpg'), linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8))`,
      'Season 1': `url('/assets/Season1.jpg'), linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8))`,
      'Season 2': `url('/assets/Season2.jpg'), linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8))`,
      'Season 3': `url('/assets/Season3.jpg'), linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8))`,
      'Season 4': `url('/assets/Season4.jpg'), linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8))`,
      'Season 5': `url('/assets/Season5.jpg'), linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8))`,
    };
  
    const backgroundImage = seasonStyles[season] || `url('/assets/GLOBAL.jpg'), linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8))`;
  
    return {
      ...baseStyle,
      backgroundImage: backgroundImage
    };
  }
  
  // Ejemplo de uso
  const backgroundStyle = getBackgroundStyle(season);
  return (
    
      <div style={backgroundStyle}>{/* Aplica el fondo según la temporada */}
        <Header setActiveComponent={setActiveComponent} setSeason={setSeason} selectedSeason={season} gamesTotal={gamesTotal} seasons={seasons}/>
        {activeComponent === 'partidas' && <Partidas partidasData={partidasData} invocadoresData={invocadoresData} season={season} setIsLoading={setIsLoading}/>}
        {activeComponent === 'ultimosPicks' && <UltimosPicks partidasData={partidasData} invocadoresData={invocadoresData} setIsLoading={setIsLoading} />}
        {activeComponent === 'campeones' && <Campeones partidasData={partidasData} invocadoresData={invocadoresData} setIsLoading={setIsLoading}/>}
        {activeComponent === 'bans' && <Bans season={season} setIsLoading={setIsLoading}/>}
        {activeComponent === 'sanciones' && <Sanciones invocadoresData={invocadoresData} season={season} setIsLoading={setIsLoading}/>}
        {/* Añade aquí las condiciones para otros componentes */}

        {/* Mostrar el div de carga si isLoading es true */}
        {isLoading && (
          <div className="loadingScreen">
            <Image src="/assets/LoadingIcon.gif" height='200' width='200' alt="Cargando..."/>
          </div>
        )}
      </div>
    
  );
}

export default App;
