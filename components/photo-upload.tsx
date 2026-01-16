"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import UploadPhotos from "./ui/UploadPhotos";
import MegaImageUpload from "./ui/mega-upload";

export default function PhotoUpload() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center bg-gold pt-20 pb-30"
    >
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{
          duration: isInView ? 0.7 : 0.4,
          delay: isInView ? 0.3 : 0,
          ease: "easeOut",
        }}
        className="text-center text-white text-4xl font-medium"
      >
        Comparte aquí las fotografías que hayas tomado<br />
         para que podamos atesorarlas para siempre...
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
        className="w-full"
      >
        {/*<UploadPhotos />*/}
        <MegaImageUpload />
      </motion.div>
    </div>
  );
}
