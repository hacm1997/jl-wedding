"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "./button";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

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

export default function MegaImageUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [fileName, setFileName] = useState("Ninguna foto seleccionada");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isDatePassed, setIsDatePassed] = useState(false);

  // referencia al input para poder disparar el click tras contraseña correcta
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    const newFiles = Array.from(e.target.files || []);
    setFiles(newFiles);
    setFileName(
      newFiles.length > 0
        ? `${newFiles.length} foto${
            newFiles.length > 1 ? "s" : ""
          } seleccionada${newFiles.length > 1 ? "s" : ""}`
        : "Ninguna foto seleccionada"
    );
  };

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
      setFiles([]);
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
        className="flex flex-col items-center justify-center"
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
        />

        {/* Botón "Elegir fotos" + texto debajo */}
        <button
          type="button"
          onClick={handleChoosePhotosClick}
          className="flex flex-col items-center justify-center cursor-pointer pt-4"
        >
          <span className="text-base md:text-2xl text-white mb-1 underline underline-offset-6">
            Elegir fotos
          </span>
          <span className="text-xs md:text-xl font-bold text-white/90">
            {fileName}
          </span>
        </button>

        <Button
          type="submit"
          disabled={files.length === 0 || loading}
          className="rounded-none bg-amber-50 text-gold mt-12 w-auto h-24 md:h-28 text-3xl md:text-5xl px-8 md:px-10 cursor-pointer font-normal"
        >
          {loading ? "SUBIENDO..." : "SUBE TU FOTO AQUÍ"}
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
