import React, { useState, useEffect } from "react";
import "./Countdown.css";

export default function Countdown() {
  const targetDate = new Date("2025-07-26T17:00:00");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    const days = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0");
    const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0");
    const minutes = String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, "0");

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container">
      {["Días", "Horas", "Minutos", "Segundos"].map((label, index) => {
        const value = Object.values(timeLeft)[index];
        return (
          <div key={label}>
            <span className="countdown-item">{value}</span>
            <br />
            <span className="countdown-label">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
