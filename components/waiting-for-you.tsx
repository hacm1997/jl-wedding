"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
// import CloudinaryGalleryExample from "./cloudinary-gallery-example";

export default function WaitingForYou() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="bg-cream-light2 flex flex-col items-center justify-center pt-10 pb-20"
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
        className="font-amoresa text-sage-light text-[40px] sm:text-6xl md:text-7xl lg:text-[90px] pt-6 sm:pt-8 md:pt-6 text-center"
      >
        Te esperamos
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: isInView ? 0.7 : 0.4,
          delay: isInView ? 0.5 : 0,
          ease: "easeOut",
        }}
        className="text-sage-light text-3xl md:text-3xl text-center mt-2 w-11/12 sm:w-[80%] md:w-[42%] pt-5"
      >
        Nada nos haría más felices que compartir este día tan especial rodeados
        de las personas que amamos
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: isInView ? 0.7 : 0.4,
          delay: isInView ? 0.8 : 0,
          ease: "easeOut",
        }}
        className="flex justify-center items-center -ml-10 ga-3 sm:gap-4 font-amoresa text-sage-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl pt-10 sm:pt-16"
      >
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{
            duration: isInView ? 0.6 : 0.4,
            delay: isInView ? 1 : 0,
            ease: "easeOut",
          }}
        >
          J
        </motion.span>
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={
            isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }
          }
          transition={{
            duration: isInView ? 0.6 : 0.4,
            delay: isInView ? 1.2 : 0,
            ease: "easeOut",
          }}
          className="w-[1.6px] h-14 md:h-20 lg:h-28 bg-sage-light ml-8"
        ></motion.div>
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{
            duration: isInView ? 0.6 : 0.4,
            delay: isInView ? 1 : 0,
            ease: "easeOut",
          }}
          className="pl-3 md:pl-0"
        >
          L
        </motion.span>
      </motion.div>

      {/* <CloudinaryGalleryExample folder="wedding/uploads" /> */}
    </div>
  );
}
