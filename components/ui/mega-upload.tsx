"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "./button";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const TEMP_PASSWORD = process.env.NEXT_PUBLIC_TEMPORAL_UPLOAD_PHOTOS_PASS;

// 4 de abril de 2026, 3 pm (UTC-5)
const TARGET_DATE = new Date("2026-04-04T15:00:00-05:00").getTime();

const MAX_PHOTOS_PER_PERIOD = 20;
const EXPIRATION_HOURS = 8;
const STORAGE_KEY = "wedding_photos_upload_count";

interface PhotoUploadData {
  count: number;
  timestamp: number;
}

interface FilePreview {
  file: File;
  preview: string;
}

export default function MegaImageUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<FilePreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [fileName, setFileName] = useState("Ninguna foto seleccionada");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isDatePassed, setIsDatePassed] = useState(false);

  // referencia al input para poder disparar el click tras contraseña correcta
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // ref para mantener las previews actuales para limpieza
  const previewsRef = useRef<FilePreview[]>([]);
  // ref para el contenedor del slider
  const sliderRef = useRef<HTMLDivElement | null>(null);

  /* ---------- helpers de localStorage ---------- */

  const getPhotoUploadData = (): PhotoUploadData | null => {
    if (typeof window === "undefined") return null;

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;

      const parsed: PhotoUploadData = JSON.parse(data);
      const now = Date.now();
      const expirationTime = EXPIRATION_HOURS * 60 * 60 * 1000;

      if (now - parsed.timestamp >= expirationTime) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      return parsed;
    } catch {
      return null;
    }
  };

  const getCurrentPhotoCount = (): number => {
    const data = getPhotoUploadData();
    return data ? data.count : 0;
  };

  const incrementPhotoCount = (count: number): void => {
    if (typeof window === "undefined") return;

    try {
      const data = getPhotoUploadData();
      const now = Date.now();
      const newCount = (data ? data.count : 0) + count;

      const newData: PhotoUploadData = {
        count: newCount,
        timestamp: data ? data.timestamp : now,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch {
      // ignorar
    }
  };

  const checkPhotoLimit = (): boolean => {
    const currentCount = getCurrentPhotoCount();
    return currentCount >= MAX_PHOTOS_PER_PERIOD;
  };

  const getRemainingPhotos = (): number => {
    const currentCount = getCurrentPhotoCount();
    return Math.max(0, MAX_PHOTOS_PER_PERIOD - currentCount);
  };

  /* ---------- fecha objetivo ---------- */

  useEffect(() => {
    const checkDate = () => {
      const now = Date.now();
      setIsDatePassed(now >= TARGET_DATE);
    };

    checkDate();
    const interval = setInterval(checkDate, 60000);
    return () => clearInterval(interval);
  }, []);

  /* ---------- apertura del selector ---------- */

  const openFileSelectorWithLimitCheck = () => {
    if (checkPhotoLimit()) {
      toast.error(
        `Ya excediste tu límite de ${MAX_PHOTOS_PER_PERIOD} cargas de fotos en el día. Por favor, intenta de nuevo en ${EXPIRATION_HOURS} horas.`
      );
      return;
    }

    fileInputRef.current?.click();
  };

  const handleChoosePhotosClick = () => {
    if (isDatePassed) {
      // fecha ya pasó → abrir selector directamente (con límite)
      openFileSelectorWithLimitCheck();
    } else {
      // antes de la fecha → pedir contraseña
      setIsModalOpen(true);
      setPassword("");
    }
  };

  /* ---------- input de archivos ---------- */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const currentCount = getCurrentPhotoCount();
    const totalAfterSelection = currentCount + files.length + selectedFiles.length;

    // Validar límite considerando fotos ya subidas y las que ya están seleccionadas
    if (totalAfterSelection > MAX_PHOTOS_PER_PERIOD) {
      const remaining = MAX_PHOTOS_PER_PERIOD - currentCount - files.length;
      if (remaining <= 0) {
        toast.error(
          `Ya alcanzaste tu límite de ${MAX_PHOTOS_PER_PERIOD} fotos. No puedes agregar más fotos en este período.`
        );
        // Limpiar el input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      } else {
        toast.warning(
          `Solo puedes agregar ${remaining} foto${remaining > 1 ? "s" : ""} más. Se seleccionarán solo las primeras ${remaining}.`
        );
        // Limitar a las fotos que se pueden agregar
        selectedFiles.splice(remaining);
      }
    }

    // Crear previews para las nuevas imágenes
    const newPreviews: FilePreview[] = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    // Combinar con las previews existentes
    const updatedFiles = [...files, ...selectedFiles];
    const updatedPreviews = [...previews, ...newPreviews];

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    previewsRef.current = updatedPreviews;
    setFileName(
      updatedFiles.length > 0
        ? `${updatedFiles.length} foto${
            updatedFiles.length > 1 ? "s" : ""
          } seleccionada${updatedFiles.length > 1 ? "s" : ""}`
        : "Ninguna foto seleccionada"
    );

    // Limpiar el input para permitir seleccionar más fotos
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    // Revocar URL del preview para liberar memoria
    URL.revokeObjectURL(previews[index].preview);

    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    previewsRef.current = updatedPreviews;
    setFileName(
      updatedFiles.length > 0
        ? `${updatedFiles.length} foto${
            updatedFiles.length > 1 ? "s" : ""
          } seleccionada${updatedFiles.length > 1 ? "s" : ""}`
        : "Ninguna foto seleccionada"
    );
  };

  // Limpiar previews al desmontar
  useEffect(() => {
    return () => {
      // Limpiar todas las previews al desmontar el componente
      previewsRef.current.forEach((preview) => {
        URL.revokeObjectURL(preview.preview);
      });
    };
  }, []);

  /* ---------- modal de contraseña ---------- */

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (checkPhotoLimit()) {
      toast.error(
        `Ya excediste tu límite de ${MAX_PHOTOS_PER_PERIOD} cargas de fotos en el día. Por favor, intenta de nuevo en ${EXPIRATION_HOURS} horas.`
      );
      setPassword("");
      return;
    }

    if (password === TEMP_PASSWORD) {
      setIsModalOpen(false);
      setPassword("");
      // ahora sí abrimos el selector de archivos
      fileInputRef.current?.click();
    } else {
      toast.error("Contraseña incorrecta. Por favor, intenta de nuevo.");
      setPassword("");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPassword("");
  };

  /* ---------- submit a MEGA ---------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    setLoading(true);

    try {
      const res = await fetch("/api/upload-mega", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
      toast.success(`Subiste ${files.length} fotos correctamente!`);
      incrementPhotoCount(files.length);
      
      // Limpiar previews
      previews.forEach((preview) => {
        URL.revokeObjectURL(preview.preview);
      });
      
      setFiles([]);
      setPreviews([]);
      previewsRef.current = [];
      setFileName("Ninguna foto seleccionada");
    } catch (error) {
      console.error("Error al subir tus fotos:", error);
      toast.error("Error al subir tus fotos. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- render ---------- */

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center pt-4 w-full"
      >
        {/* Input oculto */}
        <input
          ref={fileInputRef}
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          multiple
          max={MAX_PHOTOS_PER_PERIOD}
        />

        {/* Botón "Elegir fotos" + texto debajo */}
        <button
          type="button"
          onClick={handleChoosePhotosClick}
          className="flex flex-col items-center justify-center cursor-pointer pt-4 w-[90%] md:w-[38%]"
        >
        <div className="flex flex-col items-center justify-center border-4 border-dotted py-10 w-full">
          <Image src="/images/cam-add.png" alt="Camera" width={100} height={100} />
          <span className="text-xs md:text-2xl text-white mb-1 leading-1.5 pt-6">
            Presiona aquí y<br />
            <span className="text-xl md:text-3xl font-semibold">Selecciona tus fotos</span>
          </span>
          <span className="text-xs md:text-2xl font-bold text-white/90 pt-10">
            *{fileName}*
          </span>
          {(() => {
            const remaining = getRemainingPhotos() - files.length;
            return remaining > 0 ? (
              <span className="text-xs md:text-lg text-white/80 pt-4">
                Puedes agregar {remaining} foto{remaining !== 1 ? "s" : ""} más
              </span>
            ) : null;
          })()}
        </div>
        </button>

        {/* Preview de imágenes en miniatura - Slider */}
        {previews.length > 0 && (
          <div className="w-[90%] md:w-[38%] mt-6 relative">
            {/* Botón izquierdo - solo en desktop cuando hay más de 4 fotos */}
            {previews.length > 4 && (
              <button
                type="button"
                onClick={() => {
                  if (sliderRef.current) {
                    const scrollAmount = sliderRef.current.clientWidth;
                    sliderRef.current.scrollBy({
                      left: -scrollAmount,
                      behavior: "smooth",
                    });
                  }
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all hidden md:flex items-center justify-center"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Contenedor del slider */}
            <div
              ref={sliderRef}
              className="flex gap-2 md:gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory preview-slider"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
                minHeight: "150px",
              }}
            >
              {previews.map((preview, index) => (
                <div
                  key={index}
                  className="relative group aspect-square rounded-lg overflow-hidden border-2 border-white/30 shrink-0 snap-center preview-item"
                >
                  <Image
                    src={preview.preview}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    aria-label="Eliminar foto"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Botón derecho - solo en desktop cuando hay más de 4 fotos */}
            {previews.length > 4 && (
              <button
                type="button"
                onClick={() => {
                  if (sliderRef.current) {
                    const scrollAmount = sliderRef.current.clientWidth;
                    sliderRef.current.scrollBy({
                      left: scrollAmount,
                      behavior: "smooth",
                    });
                  }
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all hidden md:flex items-center justify-center"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        <Button
          type="submit"
          disabled={files.length === 0 || loading}
          className="rounded-none bg-amber-50 text-gold mt-12 w-auto h-24 md:h-28 text-3xl md:text-5xl px-8 md:px-10 cursor-pointer font-normal"
        >
          {loading ? "SUBIENDO..." : "SUBIR"}
        </Button>
      </form>

      {/* Modal de loading */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl p-8 md:p-10 w-full max-w-md mx-4 relative"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                    Subiendo fotos...
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Por favor espera mientras subimos tus fotos
                  </p>
                </div>

                {/* Spinner animado */}
                <div className="flex justify-center">
                  <motion.div
                    className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de contraseña */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-md mx-4 relative"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                    Ingresa la contraseña
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Por favor, ingresa la contraseña para continuar.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-base"
                    placeholder="Ingresa la contraseña"
                    autoFocus
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeModal}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gold hover:bg-gold/90 text-white"
                  >
                    Continuar
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
