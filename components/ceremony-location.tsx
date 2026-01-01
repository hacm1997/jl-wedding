"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ImageIcon,
  Map,
  MapPin,
  Navigation,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { VenueGallery } from "./venue-gallery";

interface CeremonyLocationProps {
  title?: string;
  venue?: string;
  date?: string;
  time?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  compliment?: string;
  venueImages?: string[];
}

export function CeremonyLocation({
  title = "Ceremonia",
  venue = "Iglesia Centro de Fe y Esperanza",
  date = "Sábado 04 Abril",
  time = "05:00 PM",
  address = "Cartagena, Colombia",
  compliment = "Carrera 46 #30-180 - Barrio Armenia",
  coordinates = { lat: 10.4070307, lng: -75.5093954 },
  venueImages = [],
}: CeremonyLocationProps) {
  const [showMap, setShowMap] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false);

  const [viewMode, setViewMode] = useState<"none" | "map" | "images">("none");

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const toggleView = (mode: "map" | "images") => {
    if (viewMode === mode) {
      setViewMode("none");
      setShowMap(false);
    } else {
      if (mode === "map") {
        setIsMapLoading(true);
        setTimeout(() => setIsMapLoading(false), 800);
        setShowMap(true);
      } else {
        setShowMap(false);
      }
      setViewMode(mode);
    }
  };

  useEffect(() => {
    if (viewMode !== "none" && mapContainerRef.current) {
      setTimeout(() => {
        mapContainerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    } else if (viewMode === "none" && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [viewMode]);

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
    window.open(url, "_blank");
  };

  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
    window.open(url, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-sage-dark flex items-center justify-center px-4 py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-10 md:space-y-12 lg:space-y-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="flex justify-center mb-6"
          >
            <svg
              width="100"
              height="50"
              viewBox="0 0 100 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-90"
            >
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                cx="50"
                cy="25"
                r="5"
                fill="white"
                opacity="0.95"
              />
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                cx="40"
                cy="22"
                r="4.5"
                fill="white"
                opacity="0.85"
              />
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                cx="60"
                cy="22"
                r="4.5"
                fill="white"
                opacity="0.85"
              />
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                cx="32"
                cy="27"
                r="4"
                fill="white"
                opacity="0.75"
              />
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                cx="68"
                cy="27"
                r="4"
                fill="white"
                opacity="0.75"
              />
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                cx="26"
                cy="34"
                r="3.5"
                fill="white"
                opacity="0.65"
              />
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                cx="74"
                cy="34"
                r="3.5"
                fill="white"
                opacity="0.65"
              />
              <motion.ellipse
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                cx="50"
                cy="30"
                rx="2.5"
                ry="4"
                fill="white"
                opacity="0.6"
              />
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif italic text-white text-6xl md:text-7xl lg:text-8xl font-normal tracking-wide drop-shadow-sm"
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-2"
          >
            <p className="text-white/70 text-xl md:text-2xl lg:text-3xl uppercase tracking-[0.3em] font-light">
              Lugar:{" "}
              <span className="text-white text-xl md:text-2xl lg:text-3xl font-light tracking-wide">
                {venue}
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 py-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center gap-4 group"
            >
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl group-hover:bg-white/15 transition-all duration-300">
                <Calendar className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-white/70 text-sm uppercase tracking-widest">
                  Fecha
                </p>
                <p className="text-white text-5xl md:text-6xl lg:text-7xl">
                  {date}
                </p>
              </div>
            </motion.div>

            <div className="hidden md:block h-24 w-px bg-white/30" />

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center gap-4 group"
            >
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl group-hover:bg-white/15 transition-all duration-300">
                <Clock className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-white/70 text-sm uppercase tracking-widest">
                  Hora
                </p>
                <p className="text-white text-5xl md:text-6xl lg:text-7xl">
                  {time}
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-full"
          >
            <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white flex-shrink-0" />
            <p className="text-white text-base md:text-lg lg:text-xl font-light tracking-wide">
              {address} - {compliment}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => toggleView("map")}
                size="lg"
                className={`group relative ${
                  viewMode === "map"
                    ? "bg-white text-[#718355] shadow-2xl"
                    : "bg-white/90 text-[#718355] hover:bg-white"
                } hover:shadow-2xl transition-all duration-300 font-medium text-base md:text-lg px-10 py-7 tracking-wide shadow-xl border-0`}
              >
                <span className="flex items-center gap-3">
                  {viewMode === "map" ? (
                    <>
                      <X className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
                      Cerrar Mapa
                    </>
                  ) : (
                    <>
                      <Map className="w-5 h-5 transition-transform group-hover:scale-110 duration-300" />
                      Ver Mapa
                    </>
                  )}
                </span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => toggleView("images")}
                size="lg"
                className={`group relative ${
                  viewMode === "images"
                    ? "bg-white text-[#718355] shadow-2xl"
                    : "bg-white/90 text-[#718355] hover:bg-white"
                } hover:shadow-2xl transition-all duration-300 font-medium text-base md:text-lg px-10 py-7 tracking-wide shadow-xl border-0`}
              >
                <span className="flex items-center gap-3">
                  {viewMode === "images" ? (
                    <>
                      <X className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
                      Cerrar
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-5 h-5 transition-transform group-hover:scale-110 duration-300" />
                      Ver Lugar
                    </>
                  )}
                </span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={openDirections}
                size="lg"
                className="group cursor-pointer bg-transparent border-2 border-white text-white hover:bg-white hover:text-sage-dark transition-all duration-300 font-medium text-base md:text-lg px-10 py-7 tracking-wide shadow-xl"
              >
                <Navigation className="w-5 h-5 mr-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
                Cómo Llegar
              </Button>
            </motion.div>
          </motion.div>

          <AnimatePresence mode="wait">
            {showMap && (
              <motion.div
                ref={mapContainerRef}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="pt-8"
              >
                <Card className="overflow-hidden shadow-2xl border-4 border-white/20 rounded-3xl backdrop-blur-sm">
                  <div className="relative w-full h-[450px] md:h-[550px] lg:h-[650px]">
                    {isMapLoading && (
                      <div className="absolute inset-0 bg-white/95 flex items-center justify-center z-10">
                        <div className="flex flex-col items-center gap-4">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                            className="w-12 h-12 border-4 border-sage-dark/30 border-t-sage-dark rounded-full"
                          />
                          <p className="text-sage-dark font-medium">
                            Cargando mapa...
                          </p>
                        </div>
                      </div>
                    )}
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=${
                        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
                        "AIzaSyA22lp9o1XlQvGIMQwggvC1noqobB0AnQU"
                      }&q=${coordinates.lat},${
                        coordinates.lng
                      }&zoom=16&maptype=roadmap`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mapa de ubicación de la ceremonia"
                      className="w-full h-full"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute bottom-6 left-1/2 -translate-x-1/2"
                    >
                      <Button
                        onClick={openInGoogleMaps}
                        className="bg-sage-dark hover:bg-sage-light text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-6 text-base font-medium"
                      >
                        <Navigation className="w-5 h-5 mr-2" />
                        Abrir en Google Maps
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            )}

            {viewMode === "images" && (
              <motion.div
                ref={mapContainerRef}
                key="images-view"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="pt-8"
              >
                <VenueGallery images={venueImages} venueName={venue} />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="pt-10 md:pt-12 space-y-3"
          >
            <p className="text-white/90 text-base md:text-lg font-light tracking-wide">
              Te esperamos para compartir este momento especial
            </p>
            <div className="flex items-center justify-center gap-2 text-white/60 text-xs md:text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <p className="font-light">
                Presiona &quot;Cómo Llegar&quot; para obtener direcciones desde
                tu ubicación
              </p>
              <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
