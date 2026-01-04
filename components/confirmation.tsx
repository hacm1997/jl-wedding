"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Button } from "./ui/button";

export default function Confirmation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="bg-white flex flex-col items-center justify-center pt-10 pb-28"
    >
      <motion.div
        initial={{ opacity: 0, rotate: -80, scale: 0.5 }}
        animate={
          isInView
            ? { opacity: 1, rotate: -56, scale: 1 }
            : { opacity: 0, rotate: -80, scale: 0.5 }
        }
        transition={{
          duration: isInView ? 0.8 : 0.4,
          delay: isInView ? 0 : 0,
          ease: "easeOut",
        }}
        className="flex justify-center items-center"
      >
        <Image
          src="/images/branch.webp"
          width={60}
          height={100}
          alt="Branch Icon"
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{
          duration: isInView ? 0.7 : 0.4,
          delay: isInView ? 0.3 : 0,
          ease: "easeOut",
        }}
        className="font-amoresa text-4xl xl:text-5xl 2xl:text-6xl text-sage-dark text-center mt-2"
      >
        Confirmación
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: isInView ? 0.7 : 0.4,
          delay: isInView ? 0.5 : 0,
          ease: "easeOut",
        }}
        className="text-sage-light text-3xl md:text-3xl text-center mt-2 w-11/12 md:w-1/3 pt-5"
      >
        Agradecemos que confirmes tu asistencia antes del{" "}
        <strong>02 de marzo</strong>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 30, scale: 0.9 }
        }
        transition={{
          duration: isInView ? 0.6 : 0.4,
          delay: isInView ? 0.7 : 0,
          ease: "easeOut",
        }}
      >
        <Button className="rounded-none bg-transparent border-black border hover:text-white text-sage-light mt-10 w-auto h-20 md:h-24 text-3xl md:text-4xl px-8 md:px-12 cursor-pointer font-normal">
          CONFIRMAR AQUÍ
        </Button>
      </motion.div>
    </div>
  );
}
