"use client";

import { CldUploadWidget } from "next-cloudinary";
import { toast } from "react-toastify";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Button } from "./button";

// Contraseña temporal - cambiar según necesidad
const TEMP_PASSWORD = process.env.NEXT_PUBLIC_TEMPORAL_UPLOAD_PHOTOS_PASS;

// Fecha objetivo de la boda (debe coincidir con counter.tsx)
// Formato: "YYYY-MM-DDTHH:mm:ss-05:00" (zona horaria de Colombia UTC-5)
const TARGET_DATE = new Date("2026-04-04T15:00:00-05:00").getTime();

// Límite de fotos y duración del contador
const MAX_PHOTOS_PER_PERIOD = 20;
const EXPIRATION_HOURS = 8;
const STORAGE_KEY = "wedding_photos_upload_count";

// Interfaz para el objeto guardado en localStorage
interface PhotoUploadData {
  count: number;
  timestamp: number;
}

export default function UploadPhotos() {
  const uploadedFilesRef = useRef<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [openWidget, setOpenWidget] = useState<(() => void) | null>(null);
  const [isDatePassed, setIsDatePassed] = useState(false);

  // Funciones para manejar el contador de fotos en localStorage
  const getPhotoUploadData = (): PhotoUploadData | null => {
    if (typeof window === "undefined") return null;
    
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;
      
      const parsed: PhotoUploadData = JSON.parse(data);
      const now = new Date().getTime();
      const expirationTime = EXPIRATION_HOURS * 60 * 60 * 1000; // 8 horas en milisegundos
      
      // Si ha pasado más de 8 horas, eliminar el registro
      if (now - parsed.timestamp >= expirationTime) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      
      return parsed;
    } catch (error) {
      console.error("Error al leer localStorage:", error);
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
      const now = new Date().getTime();
      const newCount = (data ? data.count : 0) + count;
      
      const newData: PhotoUploadData = {
        count: newCount,
        timestamp: data ? data.timestamp : now, // Mantener el timestamp original si existe
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (error) {
      console.error("Error al guardar en localStorage:", error);
    }
  };

  const checkPhotoLimit = (): boolean => {
    const currentCount = getCurrentPhotoCount();
    return currentCount >= MAX_PHOTOS_PER_PERIOD;
  };

  // Verificar si la fecha objetivo ya pasó
  useEffect(() => {
    const checkDate = () => {
      const now = new Date().getTime();
      setIsDatePassed(now >= TARGET_DATE);
    };

    checkDate();
    // Verificar cada minuto para actualizar el estado cuando llegue la fecha
    const interval = setInterval(checkDate, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = (open: () => void) => {
    // Verificar si el usuario ha excedido el límite de fotos
    if (checkPhotoLimit()) {
      toast.error(
        `Ya excediste tu límite de ${MAX_PHOTOS_PER_PERIOD} cargas de fotos en el día. Por favor, intenta de nuevo en ${EXPIRATION_HOURS} horas.`
      );
      return;
    }

    // Si la fecha ya pasó, abrir directamente el widget sin modal
    if (isDatePassed) {
      open();
    } else {
      // Si aún no ha llegado la fecha, mostrar el modal de contraseña
      setOpenWidget(() => open);
      setIsModalOpen(true);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar límite antes de abrir el widget
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
      if (openWidget) {
        openWidget();
      }
    } else {
      toast.error("Contraseña incorrecta. Por favor, intenta de nuevo.");
      setPassword("");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPassword("");
    setOpenWidget(null);
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
        options={{
          multiple: true,
          maxFiles: 3,
          resourceType: "image",
          clientAllowedFormats: ["jpg", "png", "webp", "heic"],
          maxFileSize: 5_000_000,
          // folder: Organiza las imágenes en la carpeta "wedding/uploads"
          // Las nuevas imágenes subidas tendrán este folder en sus metadatos
          folder: "wedding/uploads",
        }}
        onOpen={() => {
          // Resetear el array cuando se abre el widget
          uploadedFilesRef.current = [];
        }}
        onQueuesEnd={(result) => {
          // Este callback se ejecuta cuando todas las subidas están completas
          const totalUploaded = uploadedFilesRef.current.length;
          if (totalUploaded > 0) {
            // Incrementar el contador de fotos subidas
            incrementPhotoCount(totalUploaded);
            
            // Obtener el nuevo contador para mostrar información al usuario
            const newCount = getCurrentPhotoCount();
            const remaining = MAX_PHOTOS_PER_PERIOD - newCount;
            
            toast.success(
              `¡${totalUploaded} foto${totalUploaded > 1 ? "s" : ""} subida${totalUploaded > 1 ? "s" : ""} exitosamente! 📸${remaining > 0 ? ` (${remaining} carga${remaining > 1 ? "s" : ""} restante${remaining > 1 ? "s" : ""})` : ""}`
            );
            
            // Disparar evento personalizado para notificar que se subieron nuevas imágenes
            /*window.dispatchEvent(new CustomEvent('cloudinary:imagesUploaded', {
              detail: { count: totalUploaded }
            }));*/
            
            uploadedFilesRef.current = [];
          }
        }}
        onSuccess={(result) => {
          const info = result.info as any;
          // Guardar la información de la foto subida
          if (info) {
            uploadedFilesRef.current.push(info);
          }
        }}
        onError={(error) => {
          console.error("Error al subir imagen:", error);
          toast.error("Error al subir la foto. Por favor, intenta de nuevo.");
        }}
      >
        {({ open }) => (
          <Button
            onClick={() => handleButtonClick(open)}
            className="rounded-none bg-amber-50 text-gold mt-12 w-auto h-24 md:h-28 text-3xl md:text-5xl px-8 md:px-10 cursor-pointer font-normal"
          >
            SUBE TU FOTO AQUÍ
          </Button>
        )}
      </CldUploadWidget>

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
              {/* Botón cerrar */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Formulario */}
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
