"use client";

import { CldUploadWidget } from "next-cloudinary";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Button } from "./button";

// Contraseña temporal - cambiar según necesidad
const TEMP_PASSWORD = process.env.NEXT_PUBLIC_TEMPORAL_UPLOAD_PHOTOS_PASS;

export default function UploadPhotos() {
  const uploadedFilesRef = useRef<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [openWidget, setOpenWidget] = useState<(() => void) | null>(null);

  const handleButtonClick = (open: () => void) => {
    setOpenWidget(() => open);
    setIsModalOpen(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
            toast.success(
              `¡${totalUploaded} foto${totalUploaded > 1 ? "s" : ""} subida${totalUploaded > 1 ? "s" : ""} exitosamente! 📸`
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
