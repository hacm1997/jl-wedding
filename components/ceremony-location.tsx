"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Calendar,
  Clock,
  Image,
  Map,
  MapPin,
  Navigation,
  X,
} from "lucide-react";
import NextImage from "next/image";
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
  const [hasInteracted, setHasInteracted] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const toggleView = (mode: "map" | "images") => {
    setHasInteracted(true);
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
    // Solo ejecutar el scroll si el usuario ya ha interactuado
    if (!hasInteracted) return;

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
  }, [viewMode, hasInteracted]);

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
      className="relative w-full min-h-screen bg-transparent flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
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

      <div className="relative max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: isInView ? 0.8 : 0.4,
            ease: "easeOut",
          }}
          className="text-center space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-14"
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
            <NextImage
              src="/images/branch.webp"
              width={60}
              height={100}
              alt="Branch Icon"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              delay: isInView ? 0.4 : 0,
              duration: isInView ? 0.8 : 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-amoresa text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal text-sage-dark text-center px-4"
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              delay: isInView ? 0.6 : 0,
              duration: isInView ? 0.6 : 0.4,
            }}
            className="space-y-2 px-4"
          >
            <p className="text-sage-dark text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] font-bold">
              Lugar:{" "}
              <span className="text-sage-dark text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light tracking-wide">
                {venue}
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              delay: isInView ? 0.7 : 0,
              duration: isInView ? 0.6 : 0.4,
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 py-4 sm:py-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center gap-3 sm:gap-4 group"
            >
              <div className="bg-sage-dark/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl group-hover:bg-white/15 transition-all duration-300">
                <Calendar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-sage-dark" />
              </div>
              <div className="text-center space-y-1 text-sage-dark">
                <p className="text-sage-dark/70 text-xs sm:text-sm uppercase tracking-widest">
                  Fecha
                </p>
                <p className="text-sage-dark text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                  {date}
                </p>
              </div>
            </motion.div>

            <div className="hidden sm:block h-16 md:h-20 lg:h-24 w-px bg-sage-dark/30" />

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center gap-3 sm:gap-4 group"
            >
              <div className="bg-sage-dark/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl group-hover:bg-sage-dark/15 transition-all duration-300">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-sage-dark" />
              </div>
              <div className="text-center space-y-1 text-sage-dark">
                <p className="text-sage-dark/70 text-xs sm:text-sm uppercase tracking-widest">
                  Hora
                </p>
                <p className="text-sage-dark text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                  {time}
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              delay: isInView ? 0.8 : 0,
              duration: isInView ? 0.6 : 0.4,
            }}
            className="inline-flex items-center gap-2 sm:gap-3 bg-sage-dark/10 backdrop-blur-sm px-4 sm:px-5 md:px-6 py-3 sm:py-4 rounded-full mx-4"
          >
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0 text-sage-dark" />
            <p className="text-sage-dark text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-light tracking-wide text-center">
              {address} - {compliment}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              delay: isInView ? 0.9 : 0,
              duration: isInView ? 0.6 : 0.4,
            }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-6 sm:pt-8 px-4"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Button
                onClick={() => toggleView("map")}
                size="lg"
                className={`w-full sm:w-auto group relative cursor-pointer ${
                  viewMode === "map"
                    ? "bg-sage-dark text-white shadow-2xl"
                    : "bg-white/90 text-sage-dark hover:bg-white"
                } hover:shadow-2xl hover:bg-white hover:text-sage-dark border-sage-dark transition-all duration-300 font-medium text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 tracking-wide border-1`}
              >
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  {viewMode === "map" ? (
                    <>
                      <X className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-90 duration-300" />
                      Cerrar Mapa
                    </>
                  ) : (
                    <>
                      <Map className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 duration-300" />
                      Ver Mapa
                    </>
                  )}
                </span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Button
                onClick={() => toggleView("images")}
                size="lg"
                className={`w-full sm:w-auto group relative cursor-pointer ${
                  viewMode === "images"
                    ? "bg-sage-dark text-white shadow-2xl"
                    : "bg-white/90 text-sage-dark hover:bg-white"
                } hover:shadow-2xl hover:bg-white hover:text-sage-dark border-sage-dark transition-all duration-300 font-medium text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 tracking-wide border-1`}
              >
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  {viewMode === "images" ? (
                    <>
                      <X className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-90 duration-300" />
                      Cerrar
                    </>
                  ) : (
                    <>
                      <Image className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 duration-300" />
                      Ver Lugar
                    </>
                  )}
                </span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Button
                onClick={openDirections}
                size="lg"
                className="w-full sm:w-auto group cursor-pointer bg-sage-dark hover:border-1  text-white hover:bg-white hover:text-sage-dark hover:border-sage-dark transition-all duration-300 font-medium text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 tracking-wide"
              >
                <Navigation className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
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
                className="pt-6 sm:pt-8 px-4"
              >
                <Card className="overflow-hidden shadow-2xl border-2 sm:border-4 border-white/20 rounded-2xl sm:rounded-3xl backdrop-blur-sm">
                  <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px]">
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
                            className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-sage-dark/30 border-t-sage-dark rounded-full"
                          />
                          <p className="text-sage-dark font-medium text-sm sm:text-base">
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
                      className="absolute bottom-4 hidden sm:block sm:bottom-6 left-1/2 -translate-x-1/2 px-4 w-full sm:w-auto"
                    >
                      <Button
                        onClick={openInGoogleMaps}
                        className="w-full sm:w-auto bg-sage-dark hover:bg-sage-light text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium"
                      >
                        <Navigation className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
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
                className="pt-6 sm:pt-8 px-4"
              >
                <VenueGallery images={venueImages} venueName={venue} />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              delay: isInView ? 1 : 0,
              duration: isInView ? 0.8 : 0.4,
            }}
            className="pt-8 sm:pt-10 md:pt-12 space-y-2 sm:space-y-3 px-4"
          >
            <p className="text-white/90 text-sm sm:text-base md:text-lg font-light tracking-wide">
              Te esperamos para compartir este momento especial
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-white/60 text-xs sm:text-sm">
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/60" />
              <p className="font-light text-center sm:text-left">
                Presiona &quot;Cómo Llegar&quot; para obtener direcciones desde
                tu ubicación
              </p>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/60" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
