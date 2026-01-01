"use client";

import { useState, useEffect } from "react";

export default function Counter() {
  // Fecha objetivo de la boda - ajusta esta fecha según necesites
  const targetDate = new Date("2026-04-04T18:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="font-eb relative flex flex-col items-center w-full my-8 sm:my-12 md:my-14">
      {/* Contenedor principal con fondo beige y forma redondeada arriba */}
      <div className="bg-cream-light sm:rounded-t-3xl w-full max-w-4xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-24">
        <h3 className="font-medium text-sage-dark text-xl sm:text-2xl md:text-5xl text-center mb-6 sm:mb-8">
          FALTAN:
        </h3>

        {/* Grid de números */}
        <div className="grid grid-cols-4 gap-4 sm:gap-6 md:gap-0 w-full pt-4">
          {/* Días */}
          <div className="flex flex-col items-center">
            <div className="text-sage-dark text-3xl sm:text-4xl md:text-6xl lg:text-8xl">
              {formatNumber(timeLeft.days)}
            </div>
            <div className="text-sage-dark text-xs sm:text-sm md:text-4xl mt-2">
              DIAS
            </div>
          </div>

          {/* Horas */}
          <div className="flex flex-col items-center">
            <div className="text-sage-dark text-3xl sm:text-4xl md:text-5xl lg:text-8xl">
              {formatNumber(timeLeft.hours)}
            </div>
            <div className="text-sage-dark text-xs sm:text-sm md:text-4xl mt-2">
              HORAS
            </div>
          </div>

          {/* Minutos */}
          <div className="flex flex-col items-center">
            <div className="text-sage-dark text-3xl sm:text-4xl md:text-5xl lg:text-8xl">
              {formatNumber(timeLeft.minutes)}
            </div>
            <div className="text-sage-dark text-xs sm:text-sm md:text-4xl mt-2">
              MINUTOS
            </div>
          </div>

          {/* Segundos */}
          <div className="flex flex-col items-center">
            <div className="text-sage-dark text-3xl sm:text-4xl md:text-5xl lg:text-8xl">
              {formatNumber(timeLeft.seconds)}
            </div>
            <div className="text-sage-dark text-xs sm:text-sm md:text-4xl mt-2">
              SEGUNDOS
            </div>
          </div>
        </div>
      </div>

      {/* Figura decorativa con punta abajo */}
      <div className="relative w-full max-w-4xl">
        {/* Forma con punta usando clip-path */}
        <div
          className="bg-cream-light w-full h-12 sm:h-16 md:h-20"
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
          }}
        ></div>
      </div>
    </div>
  );
}