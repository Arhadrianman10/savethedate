import React, { useState, useEffect } from 'react';

const ProgressBar = ({ gamesTotal }) => {
    // Estado para almacenar el ancho de la barra de progreso
    const [width, setWidth] = useState('0%');
    // Estado para almacenar el máximo de juegos calculado
    const [calculatedMaxGames, setCalculatedMaxGames] = useState(30);

    // Efecto para actualizar el ancho de la barra de progreso y calculatedMaxGames cuando gamesTotal cambia
        useEffect(() => {
            let maxGames = gamesTotal > calculatedMaxGames ? gamesTotal : calculatedMaxGames;
            // Si gamesTotal es menor que 30, establece maxGames a 30.
            if (gamesTotal <= 30) {
                maxGames = 30;
            }
            const nuevoAncho = `${(gamesTotal / maxGames) * 100}%`;
            setWidth(nuevoAncho);
            setCalculatedMaxGames(maxGames);
        }, [gamesTotal, calculatedMaxGames]);

    return (
        <div className="progress">
            <div className="progress-value" style={{ width }}>
                <div className="progress-value-number">{gamesTotal}/{calculatedMaxGames}</div>
            </div>
        </div>
    );
};

export default ProgressBar;