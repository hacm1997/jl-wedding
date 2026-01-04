"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import UploadPhotos from "./ui/UploadPhotos";

export default function PhotoUpload() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center bg-gold pt-20 pb-30"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        animate={
          isInView
            ? { opacity: 1, scale: 1, rotate: 0 }
            : { opacity: 0, scale: 0.5, rotate: -20 }
        }
        transition={{
          duration: isInView ? 0.7 : 0.4,
          delay: isInView ? 0 : 0,
          ease: "easeOut",
        }}
      >
        <Image src="/images/cam.png" alt="Cam" width={80} height={80} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{
          duration: isInView ? 0.7 : 0.4,
          delay: isInView ? 0.3 : 0,
          ease: "easeOut",
        }}
        className="text-center text-white text-4xl pt-12 font-medium"
      >
        Te invitamos a capturar y compartir los momentos
        <br />
        más especiales de nuestra celebración...
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
          delay: isInView ? 0.6 : 0,
          ease: "easeOut",
        }}
      >
        <UploadPhotos />
      </motion.div>
    </div>
  );
}
