import React, { useState, useEffect } from 'react';

export default function FooterPolaroids() {
  const polaroids = [
    '/assets/Polaroid1.jpg',
    '/assets/Polaroid2.jpg',
    '/assets/Polaroid3.jpg',
    '/assets/Polaroid4.jpg',
    '/assets/Polaroid5.jpg',
    '/assets/Polaroid6.jpg',
  ];

  const [positions, setPositions] = useState([]);

  // Generar posiciones únicas para las Polaroids
  useEffect(() => {
    const newPositions = [];
    const isOverlapping = (x, y) => {
      return newPositions.some(([px, py]) => {
        const dx = px - x;
        const dy = py - y;
        return Math.sqrt(dx * dx + dy * dy) < 15; // Separación mínima de 15% de la pantalla
      });
    };

    while (newPositions.length < polaroids.length) {
      const top = Math.random() * 70 + 5; // Rango: 5% - 75% de altura
      const side = Math.random() > 0.5 ? 'left' : 'right'; // Lado izquierdo o derecho
      const sideOffset = Math.random() * 20; // Rango: 0% - 20% desde el borde lateral

      if (!isOverlapping(sideOffset, top)) {
        newPositions.push([sideOffset, top, side]);
      }
    }

    setPositions(newPositions);
  }, [polaroids.length]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {positions.map(([sideOffset, top, side], index) => (
        <img
          key={index}
          src={polaroids[index]}
          alt={`Polaroid ${index + 1}`}
          style={{
            position: 'absolute',
            top: `${top}%`,
            [side]: `${sideOffset}%`,
            width: '120px',
            transform: `rotate(${Math.random() * 20 - 10}deg)`, // Rotación aleatoria
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = `rotate(${Math.random() * 20 - 10}deg) scale(1.1)`;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = `rotate(${Math.random() * 20 - 10}deg) scale(1)`;
          }}
        />
      ))}
    </div>
  );
}
