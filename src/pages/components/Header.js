import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <div className="header-container">
      <img
        src="/assets/title.png"
        alt="Save the Date"
        className="header-logo"
      />
      <div className="header-subtitle">Para la boda de</div>
      <div className="header-title">ANA & ADRI</div>
      <div className="header-date-container">
        {/* Columna: Día */}
        <div className="header-day">SÁBADO</div>

        {/* Columna: Fecha */}
        <div>
          <div className="header-month">JULIO</div>
          <div className="header-date">26</div>
          <div className="header-year">2025</div>
        </div>

        {/* Columna: Hora */}
        <div className="header-time">6:00 PM</div>
      </div>
    </div>
  );
}
