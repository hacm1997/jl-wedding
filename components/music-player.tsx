"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { weddingConfig } from "../config";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Intentar reproducir automáticamente si está configurado
    if (weddingConfig.musica.autoplay && audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Autoplay bloqueado por el navegador");
      });
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          console.log("Reproducción no permitida");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingConfig.musica.archivo}
        loop
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
          className="rounded-full w-14 h-14 border-primary/30 hover:border-primary hover:bg-primary/10 bg-background/80 backdrop-blur-md shadow-lg transition-all duration-300"
          title={isPlaying ? "Pausar canción" : "Reproducir nuestra canción"}
        >
          {isPlaying ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              <Music className="w-5 h-5 text-accent" />
            </motion.div>
          ) : (
            <VolumeX className="w-5 h-5 text-foreground/50" />
          )}
        </Button>
      </motion.div>
    </>
  );
}
