"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const galleryImages = [
  {
    id: 1,
    span: "col-span-2 row-span-2",
    url: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg",
  },
  {
    id: 2,
    span: "col-span-1 row-span-1",
    url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg",
  },
  {
    id: 3,
    span: "col-span-1 row-span-1",
    url: "https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg",
  },
  {
    id: 4,
    span: "col-span-1 row-span-2",
    url: "https://images.pexels.com/photos/1024965/pexels-photo-1024965.jpeg",
  },
  {
    id: 5,
    span: "col-span-2 row-span-1",
    url: "https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg",
  },
  {
    id: 6,
    span: "col-span-1 row-span-1",
    url: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg",
  },
  {
    id: 7,
    span: "col-span-1 row-span-2",
    url: "https://images.pexels.com/photos/1024968/pexels-photo-1024968.jpeg",
  },
  {
    id: 8,
    span: "col-span-2 row-span-1",
    url: "https://images.pexels.com/photos/1024966/pexels-photo-1024966.jpeg",
  },
  {
    id: 9,
    span: "col-span-1 row-span-1",
    url: "https://images.pexels.com/photos/1024969/pexels-photo-1024969.jpeg",
  },
  {
    id: 10,
    span: "col-span-1 row-span-1",
    url: "https://images.pexels.com/photos/1024964/pexels-photo-1024964.jpeg",
  },
];

export default function PhotoGallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + galleryImages.length) % galleryImages.length
      );
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section con el título */}
      <section className="relative h-[40vh] flex items-center bg-cream-light">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-amoresa-aged text-sage-dark text-balance px-6">
          Un amor para recordar...
        </h1>
      </section>

      {/* Galería de fotos */}
      <div className="w-full grid grid-cols-4 auto-rows-[200px] gap-0">
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.id}
            className={`relative overflow-hidden ${image.span} group`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <motion.div
              className="relative w-full h-full cursor-pointer"
              whileHover={{
                scale: 1.02,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={`Galería imagen ${image.id}`}
                fill
                className="object-cover transition-all duration-500 group-hover:brightness-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            {/* Botón cerrar */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Botón anterior */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            {/* Imagen en preview */}
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={
                    galleryImages[selectedImageIndex].url || "/placeholder.svg"
                  }
                  alt={`Imagen ${selectedImageIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
            </motion.div>

            {/* Botón siguiente */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Contador de imágenes */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
              {selectedImageIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
