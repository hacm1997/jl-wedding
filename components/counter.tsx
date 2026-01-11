"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

export default function Counter() {
  // Fecha objetivo de la boda en hora de Colombia (UTC-5)
  // Formato: "YYYY-MM-DDTHH:mm:ss-05:00" (el -05:00 indica la zona horaria de Colombia)
  const targetDate = new Date("2026-04-04T15:00:00-05:00").getTime();

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

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
      transition={{
        duration: isInView ? 1.5 : 0.4,
        ease: "easeOut",
      }}
      className="font-eb relative flex flex-col items-center w-full mb-10 sm:mb-16 border-t border-cream-light2 shadow-[0_-2px_6px_rgba(0,0,0,0.025)]"
    >
      {/* Contenedor principal con fondo beige y forma redondeada arriba */}
      <div className="bg-cream-light2 w-full px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-24">
        <motion.h3
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{
            duration: isInView ? 0.8 : 0.4,
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          className="font-medium text-sage-dark text-xl sm:text-2xl md:text-5xl text-center mb-6 sm:mb-8"
        >
          FALTAN:
        </motion.h3>

        {/* Grid de números */}
        <div className="grid grid-cols-4 gap-4 sm:gap-6 md:gap-0 w-full pt-8">
          {/* Días */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{
              duration: isInView ? 0.6 : 0.4,
              delay: isInView ? 0.1 : 0,
              ease: "easeOut",
            }}
            className="flex flex-col items-center"
          >
            <motion.div
              key={timeLeft.days}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{
                duration: isInView ? 0.3 : 0.2,
                ease: "easeOut",
              }}
              className="text-sage-dark text-3xl sm:text-4xl md:text-6xl lg:text-8xl"
            >
              {formatNumber(timeLeft.days)}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: isInView ? 0.5 : 0.3,
                delay: isInView ? 0.4 : 0,
              }}
              className="text-sage-dark text-xs sm:text-sm md:text-4xl mt-2"
            >
              DIAS
            </motion.div>
          </motion.div>

          {/* Horas */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{
              duration: isInView ? 0.6 : 0.4,
              delay: isInView ? 0.2 : 0,
              ease: "easeOut",
            }}
            className="flex flex-col items-center"
          >
            <motion.div
              key={timeLeft.hours}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{
                duration: isInView ? 0.3 : 0.2,
                ease: "easeOut",
              }}
              className="text-sage-dark text-3xl sm:text-4xl md:text-5xl lg:text-8xl"
            >
              {formatNumber(timeLeft.hours)}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: isInView ? 0.5 : 0.3,
                delay: isInView ? 0.5 : 0,
              }}
              className="text-sage-dark text-xs sm:text-sm md:text-4xl mt-2"
            >
              HORAS
            </motion.div>
          </motion.div>

          {/* Minutos */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{
              duration: isInView ? 0.6 : 0.4,
              delay: isInView ? 0.3 : 0,
              ease: "easeOut",
            }}
            className="flex flex-col items-center"
          >
            <motion.div
              key={timeLeft.minutes}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{
                duration: isInView ? 0.3 : 0.2,
                ease: "easeOut",
              }}
              className="text-sage-dark text-3xl sm:text-4xl md:text-5xl lg:text-8xl"
            >
              {formatNumber(timeLeft.minutes)}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: isInView ? 0.5 : 0.3,
                delay: isInView ? 0.6 : 0,
              }}
              className="text-sage-dark text-xs sm:text-sm md:text-4xl mt-2"
            >
              MINUTOS
            </motion.div>
          </motion.div>

          {/* Segundos */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{
              duration: isInView ? 0.6 : 0.4,
              delay: isInView ? 0.4 : 0,
              ease: "easeOut",
            }}
            className="flex flex-col items-center"
          >
            <div
              className="text-sage-dark text-3xl sm:text-4xl md:text-5xl lg:text-8xl"
            >
              {formatNumber(timeLeft.seconds)}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: isInView ? 0.5 : 0.3,
                delay: isInView ? 0.7 : 0,
              }}
              className="text-sage-dark text-xs sm:text-sm md:text-4xl mt-2"
            >
              SEGUNDOS
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Figura decorativa con punta abajo */}
      <div className="relative w-full">
        {/* Forma con punta usando clip-path */}
        <div
          className="bg-cream-light2 w-full h-12 sm:h-16 md:h-28"
          style={{
            clipPath: "polygon(0 -1px, 100% -1px, 50% 100%)",
          }}
        ></div>
      </div>
    </motion.div>
  );
}