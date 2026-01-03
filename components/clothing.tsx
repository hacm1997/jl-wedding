"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";

export default function Clothing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="bg-white flex justify-center items-center py-8 md:py-10 md:pb-24"
    >
      <div>
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
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{
            duration: isInView ? 0.7 : 0.4,
            delay: isInView ? 0 : 0,
            ease: "easeOut",
          }}
          className="font-amoresa text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-sage-dark text-center -mt-2"
        >
          Vestimenta
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: isInView ? 0.6 : 0.4,
            delay: isInView ? 0.2 : 0,
            ease: "easeOut",
          }}
          className="text-sage-dark text-3xl lg:text-4xl font-semibold pt-2 sm:pt-3 md:pt-4 pb-6 sm:pb-7 md:pb-8 text-center"
        >
          Traje formal
        </motion.p>

        {/* Sección de colores reservados */}
        <section className="flex flex-col items-center justify-center pt-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: isInView ? 0.6 : 0.4,
              delay: isInView ? 0.4 : 0,
              ease: "easeOut",
            }}
            className="text-sage-light text-3xl lg:text-4xl"
          >
            Colores reservados:
          </motion.p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-center gap-4 sm:gap-0 pt-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
              }
              transition={{
                duration: isInView ? 0.5 : 0.3,
                delay: isInView ? 0.6 : 0,
                ease: "easeOut",
              }}
              className="flex flex-col items-center justify-center gap-2"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  duration: isInView ? 0.4 : 0.3,
                  delay: isInView ? 0.7 : 0,
                  ease: "easeOut",
                }}
                className="w-20 h-20 bg-sage-light rounded-full"
              ></motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: isInView ? 0.4 : 0.3,
                  delay: isInView ? 0.9 : 0,
                }}
                className="text-sage-light text-lg lg:text-xl"
              >
                Verde Musgo
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
              }
              transition={{
                duration: isInView ? 0.5 : 0.3,
                delay: isInView ? 0.7 : 0,
                ease: "easeOut",
              }}
              className="flex flex-col items-center justify-center gap-2"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  duration: isInView ? 0.4 : 0.3,
                  delay: isInView ? 0.8 : 0,
                  ease: "easeOut",
                }}
                className="w-20 h-20 bg-sage-dark rounded-full"
              ></motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: isInView ? 0.4 : 0.3,
                  delay: isInView ? 1 : 0,
                }}
                className="text-sage-light text-lg lg:text-xl"
              >
                Verde Salvia
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
              }
              transition={{
                duration: isInView ? 0.5 : 0.3,
                delay: isInView ? 0.8 : 0,
                ease: "easeOut",
              }}
              className="flex flex-col items-center justify-center gap-2"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  duration: isInView ? 0.4 : 0.3,
                  delay: isInView ? 0.9 : 0,
                  ease: "easeOut",
                }}
                className="w-20 h-20 bg-terracotta rounded-full"
              ></motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: isInView ? 0.4 : 0.3,
                  delay: isInView ? 1.1 : 0,
                }}
                className="text-sage-light text-lg lg:text-xl"
              >
                Topo Claro
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
              }
              transition={{
                duration: isInView ? 0.5 : 0.3,
                delay: isInView ? 0.9 : 0,
                ease: "easeOut",
              }}
              className="flex flex-col items-center justify-center gap-2"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  duration: isInView ? 0.4 : 0.3,
                  delay: isInView ? 1 : 0,
                  ease: "easeOut",
                }}
                className="w-20 h-20 bg-gold rounded-full"
              ></motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: isInView ? 0.4 : 0.3,
                  delay: isInView ? 1.2 : 0,
                }}
                className="text-sage-light text-lg lg:text-xl"
              >
                Mostaza Dorada
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Sección de Nota importante */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: isInView ? 0.6 : 0.4,
            delay: isInView ? 1.3 : 0,
            ease: "easeOut",
          }}
          className="pt-16 pb-8 md:pb-0"
        >
          <p className="text-center text-sage-light text-2xl lg:text-3xl">
            *<span className="font-bold">Blanco</span> reservado para la novia*
          </p>
        </motion.div>
      </div>
    </div>
  );
}
