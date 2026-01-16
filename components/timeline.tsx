"use client";

import { motion, useInView } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

interface TimelineYear {
  year: string;
  description: string;
  photos: string[];
}

const timelineData: TimelineYear[] = [
  {
    year: "2020",
    description: "Nos encontramos sin buscarnos...",
    photos: [
      "/images/2020/2020_1.jpg",
      "/images/2020/2020_2.jpg",
      "/images/2020/2020_3.jpg",
      "/images/2020/2020_4.jpg",
      "/images/2020/2020_5.jpg",
      "/images/2020/2020_6.jpg",
    ],
  },
  {
    year: "2021",
    description: "Nuestro primer viaje juntos...",
    photos: [
      "/images/2021/2021_1.jpg",
      "/images/2021/2021_2.jpg",
      "/images/2021/2021_3.jpg",
      "/images/2021/2021_4.jpg",
      "/images/2021/2021_5.jpg",
    ],
  },
  {
    year: "2022",
    description: "Comenzamos a soñar juntos...",
    photos: [
      "/images/2022/2022_1.jpg",
      "/images/2022/2022_2.jpg",
      "/images/2022/2022_3.jpg",
      "/images/2022/2022_4.jpg",
      "/images/2022/2022_5.jpg",
      "/images/2022/2022_6.jpg",
    ],
  },
  {
    year: "2023",
    description: "El año de los grandes pasos...",
    photos: [
      "/images/2023/2023_1.jpg",
      "/images/2023/2023_2.jpg",
      "/images/2023/2023_3.jpg",
      "/images/2023/2023_4.jpg",
      "/images/2023/2023_5.jpg",
    ],
  },
  {
    year: "2024",
    description: "La gran pregunta...",
    photos: [
      "/images/2024/2024_1.jpg",
      "/images/2024/2024_2.jpg",
      "/images/2024/2024_3.jpg",
      "/images/2024/2024_4.jpg",
      "/images/2024/2024_5.jpg",
      "/images/2024/2024_6.jpg",
    ],
  },
  {
    year: "2025",
    description: "Un sí que cambió todo....",
    photos: [
      "/images/2025/2025_1.jpg",
      "/images/2025/2025_2.jpg",
      "/images/2025/2025_3.jpg",
      "/images/2025/2025_4.jpg",
      "/images/2025/2025_5.jpg",
      "/images/2025/2025_6.jpg",
    ],
  },
];

// Componente para el efecto de escritura a máquina
function TypewriterText({ 
  text, 
  className,
  speed = 100 
}: { 
  text: string; 
  className?: string;
  speed?: number;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;
    
    setDisplayedText("");
    setIsComplete(false);
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(typeInterval);
      }
    }, speed);

    return () => clearInterval(typeInterval);
  }, [text, speed, isInView]);

  return (
    <h2 ref={ref} className={className}>
      {displayedText}
      {!isComplete && isInView && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-0.5 h-[0.9em] bg-sage-light ml-1 align-middle"
        >
          |
        </motion.span>
      )}
    </h2>
  );
}

export function TimelineSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const scrollToYear = (index: number) => {
    if (containerRef.current) {
      const yearWidth = containerRef.current.scrollWidth / timelineData.length;
      containerRef.current.scrollTo({
        left: yearWidth * index,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    if (activeIndex < timelineData.length - 1) {
      scrollToYear(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToYear(activeIndex - 1);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-[#FAF8F6] overflow-hidden"
    >
      <div className="max-w-9xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: isInView ? 0.8 : 0.4,
            delay: isInView ? 0 : 0,
            ease: "easeOut",
          }}
          className="mb-12 md:mb-16"
        >
          <TypewriterText
            text="Un amor para recordar..."
            className="font-amoresa-aged text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal text-sage-light mb-8 text-center"
          />
        </motion.div>

        <div className="relative">
          <div
            ref={containerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-8 md:gap-12 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {timelineData.map((item, itemIndex) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: itemIndex * 0.1,
                  ease: "easeOut",
                }}
                className="shrink-0 w-full snap-center"
              >
                <div className="space-y-6">
                  {/* Year Header */}
                  <div className="text-center mb-8">
                    <h3 className="font-serif text-5xl md:text-7xl text-sage-light mb-2">
                      {item.year}
                    </h3>
                    <p className="font-sans text-base md:text-lg text-sage-dark italic">
                      {item.description}
                    </p>
                  </div>

                  {/* Photo Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
                    {item.photos.map((photo, photoIndex) => (
                      <motion.div
                        key={photoIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: photoIndex * 0.08,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                        whileHover={{
                          scale: 1.05,
                          zIndex: 10,
                          rotate: photoIndex % 2 === 0 ? 2 : -2,
                        }}
                        className="aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                      >
                        <div className="relative w-full h-full overflow-hidden">
                          <Image
                            src={photo || "/placeholder.svg"}
                            alt={`Recuerdo ${item.year} - ${photoIndex + 1}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <section className="hidden md:block sm:block">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 md:p-4 transition-all disabled:opacity-30 disabled:cursor-not-allowed z-10"
              aria-label="Año anterior"
            >
              <ChevronLeft className="w-6 h-6 text-[#8B7E74]" />
            </button>

            <button
              onClick={handleNext}
              disabled={activeIndex === timelineData.length - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 md:p-4 transition-all disabled:opacity-30 disabled:cursor-not-allowed z-10"
              aria-label="Siguiente año"
            >
              <ChevronRight className="w-6 h-6 text-[#8B7E74]" />
            </button>
          </section>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {timelineData.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToYear(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? "w-8 bg-[#8B7E74]" : "w-2 bg-[#D4C9C1]"
              }`}
              aria-label={`Ir al año ${timelineData[index].year}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
