"use client";

import { motion } from "motion/react";

export default function Banner() {
  return (
    <div className="bg-cream-light flex justify-center items-center py-8 sm:py-10 md:py-16">
      <div className="py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 flex flex-col items-center max-w-4xl w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[32px] text-sage-dark text-center"
        >
          ¡Nos vamos a casar!
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-amoresa text-sage-dark text-[40px] sm:text-6xl md:text-7xl lg:text-8xl pt-6 sm:pt-8 md:pt-10 text-center"
        >
          Juan & Leydiana
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="w-[1.6px] h-8 sm:h-14 md:h-16 bg-sage-light my-2 sm:my-5 md:my-6"
        ></motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
          className="text-sage-light text-base sm:text-lg md:text-xl lg:text-2xl text-center px-4 sm:px-6 md:px-8 leading-relaxed"
        >
          "Más valen dos que uno, porque obtienen mejor recompensa de su
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          trabajo. Si uno de ellos cae, el otro lo levanta"
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          className="font-eb text-sage-dark text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium pt-2 sm:pt-3 md:pt-4 pb-6 sm:pb-7 md:pb-8 text-center"
        >
          Eclesiástes <span className="font-primary font-semibold">4:9-10</span>
        </motion.p>
      </div>
    </div>
  );
}
