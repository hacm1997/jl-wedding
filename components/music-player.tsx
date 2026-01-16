"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { weddingConfig } from "../config";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStartedRef = useRef(false);
  const startedRef = useRef(false);

  // 🔹 Autoplay elegante al hacer scroll (solo una vez)
  useEffect(() => {
    if (!weddingConfig.musica.autoplay) return;

    const unlockAudio = async () => {
      if (startedRef.current || !audioRef.current) return;

      try {
        await audioRef.current.play();
        setIsPlaying(true);
        startedRef.current = true;
        cleanup();
      } catch {
        // Si falla, simplemente no hacemos nada
      }
    };

    const cleanup = () => {
      document.removeEventListener("pointerdown", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
    };

    document.addEventListener("pointerdown", unlockAudio, { once: true });
    document.addEventListener("keydown", unlockAudio, { once: true });

    return cleanup;
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
        startedRef.current = true;
      }
      setIsPlaying(!isPlaying);
    } catch {
      console.log("Reproducción no permitida");
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingConfig.musica.archivo}
        loop
        preload="auto"
        className="hidden"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          delay: 2.5,
          duration: 1,
          type: "spring",
          stiffness: 200,
        }}
        className="fixed top-6 right-6 z-50"
      >
        <Button
          onClick={toggleMusic}
          variant="outline"
          size="icon"
          title={isPlaying ? "Pausar música" : "Reproducir música"}
          className="
            w-14 h-14 rounded-full
            bg-white
            border-2 border-sage-dark
            hover:bg-green-50
            shadow-lg
            transition-all
          "
        >
          {isPlaying ? (
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Music className="w-5 h-5 text-sage-dark" />
            </motion.div>
          ) : (
            <VolumeX className="w-5 h-5 text-sage-dark" />
          )}
        </Button>
      </motion.div>
    </>
  );
}
