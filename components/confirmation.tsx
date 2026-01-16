"use client";

import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Minus,
  Plus,
  XCircle,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  buscarFamiliaPorCodigo,
  confirmarAsistencia,
  Familia,
  rechazarInvitacion,
} from "../lib/supabase";
import { AdultsOnlyNotice } from "./adults-only";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Estado =
  | "cargando"
  | "encontrado"
  | "no-encontrado"
  | "confirmando"
  | "exito"
  | "rechazado"
  | "error";

export function Confirmation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const searchParams = useSearchParams();
  const familyCode = searchParams.get("code") || searchParams.get("c");

  // Inicializar estado basado en si hay código o no
  const [status, setStatus] = useState<Estado>(() =>
    familyCode ? "cargando" : "no-encontrado"
  );
  const [family, setFamily] = useState<Familia | null>(null);
  const [attendeeCount, setAttendeeCount] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [linkExpired, setLinkExpired] = useState(false);

  // Buscar familia al cargar
  useEffect(() => {
    if (!familyCode) return;

    const searchFamily = async () => {
      const result = await buscarFamiliaPorCodigo(familyCode);

      if (result) {
        setFamily(result);
        setAttendeeCount(result.cupos);

        // Verificar si el link está vencido
        if (!result.link_activo) {
          setLinkExpired(true);
          setStatus(result.estado === "confirmed" ? "exito" : "rechazado");
          return;
        }

        // Determinar estado basado en la respuesta
        if (result.estado === "confirmed") {
          setStatus("exito");
        } else if (result.estado === "rejected") {
          setStatus("rechazado");
        } else {
          setStatus("encontrado");
        }
      } else {
        setStatus("no-encontrado");
      }
    };

    searchFamily();
  }, [familyCode]);

  const handleConfirm = async () => {
    if (!family) return;

    setStatus("confirmando");
    const result = await confirmarAsistencia(family.codigo, attendeeCount);

    setStatus(result.success ? "exito" : "error");
  };

  const handleReject = async () => {
    if (!family) return;

    setStatus("confirmando");
    const result = await rechazarInvitacion(family.codigo);

    setStatus(result.success ? "rechazado" : "error");
  };

  const incrementCount = () => {
    if (family && attendeeCount < family.cupos) {
      setAttendeeCount((prev) => prev + 1);
    }
  };

  const decrementCount = () => {
    if (attendeeCount > 1) {
      setAttendeeCount((prev) => prev - 1);
    }
  };

  const resetToFound = () => {
    setStatus("encontrado");
    setShowForm(false);
  };

  return (
    <div
      ref={ref}
      className="bg-sage-dark flex flex-col items-center justify-center pt-10 pb-28"
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
        <Image
          src="/images/branch.webp"
          width={60}
          height={100}
          alt="Branch Icon"
        />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{
          duration: isInView ? 0.7 : 0.4,
          delay: isInView ? 0.3 : 0,
          ease: "easeOut",
        }}
        className="font-amoresa text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal text-white text-center mt-2"
      >
        Confirmación
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: isInView ? 0.7 : 0.4,
          delay: isInView ? 0.5 : 0,
          ease: "easeOut",
        }}
        className="text-white text-3xl md:text-3xl text-center mt-2 w-11/12 md:w-1/3 pt-5"
      >
        Agradecemos que confirmes tu asistencia antes del{" "}
        <strong>02 de marzo</strong>
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: isInView ? 0.7 : 0.4,
          delay: isInView ? 0.5 : 0,
          ease: "easeOut",
        }}
        className="pt-5"
      >
        <AdultsOnlyNotice />
      </motion.div>
      {/* Estado: Cargando */}
      {status === "cargando" && (
        <div className="mt-10">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
          <p className="text-white text-lg mt-4">Buscando tu invitación...</p>
        </div>
      )}

      {/* Estado: No encontrado */}
      {status === "no-encontrado" && (
        <div className="mt-10 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-white mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-white mb-2">
            Invitación no encontrada
          </h3>
          <p className="text-white text-lg">
            {familyCode
              ? "El código de invitación no es válido. Por favor verifica el enlace."
              : "Necesitas un enlace de invitación válido para confirmar tu asistencia."}
          </p>
          <p className="text-white text-sm mt-4">
            Si crees que es un error, contacta a los novios.
          </p>
        </div>
      )}

      {/* Estado: Encontrado - Botón inicial */}
      {status === "encontrado" && family && !showForm && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 30, scale: 0.9 }
          }
          transition={{
            duration: isInView ? 0.6 : 0.4,
            delay: isInView ? 0.7 : 0,
            ease: "easeOut",
          }}
        >
          <Button
            onClick={() => setShowForm(true)}
            className="rounded-none bg-transparent border-black border hover:bg-white hover:text-black text-white mt-10 w-auto h-20 md:h-24 text-3xl md:text-4xl px-8 md:px-12 cursor-pointer font-normal transition-all duration-300"
          >
            CONFIRMAR AQUÍ
          </Button>
        </motion.div>
      )}

      {/* Estado: Formulario */}
      {status === "encontrado" && family && showForm && (
        <div className="mt-10 w-11/12 md:w-2/3 lg:w-1/2 max-w-2xl">
          <Card className="border-sage-light/20">
            {/* Header */}
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl text-sage-dark">
                Invitación para
              </CardTitle>
              <p className="text-3xl text-sage-dark">{family.nombre}</p>
            </CardHeader>

            {/* Contenido */}
            <CardContent className="space-y-6">
              {/* Cupos */}
              <div className="text-center p-4 bg-sage-light/5 rounded-lg">
                <p className="text-sage-dark text-lg mb-1">Cupos disponibles</p>
                <p className="text-4xl font-amoresa text-sage-dark">
                  {family.cupos} personas
                </p>
              </div>

              {/* Selector */}
              <div className="space-y-4">
                <label className="text-sage-dark text-xl text-center block">
                  ¿Cuántas personas asistirán?
                </label>
                <div className="flex items-center justify-center gap-6">
                  <Button
                    onClick={decrementCount}
                    disabled={attendeeCount <= 1}
                    variant="outline"
                    size="icon"
                    className="w-12 h-12 rounded-full border-white/30 hover:bg-white/10 cursor-pointer"
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <span className="text-5xl font-amoresa text-sage-dark w-20 text-center">
                    {attendeeCount}
                  </span>
                  <Button
                    onClick={incrementCount}
                    disabled={attendeeCount >= family.cupos}
                    variant="outline"
                    size="icon"
                    className="w-12 h-12 rounded-full border-white/30 hover:bg-white/10 cursor-pointer"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-center text-sm text-sage-dark">
                  Máximo {family.cupos} personas
                </p>
              </div>

              {/* Botones */}
              <div className="flex flex-col gap-3 pt-4">
                <Button
                  onClick={handleReject}
                  variant="outline"
                  className="w-full border-white/30 text-sage-dark hover:bg-red-50 hover:text-red-600 hover:border-red-200 h-12 text-lg cursor-pointer"
                >
                  No podré asistir
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={attendeeCount === 0}
                  className="w-full bg-sage-dark hover:bg-sage-dark/80 text-black h-14 text-xl cursor-pointer"
                >
                  Confirmar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Estado: Confirmando */}
      {status === "confirmando" && (
        <div className="mt-10 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-sage-dark mx-auto" />
          <p className="text-sage-dark text-lg mt-4">
            Registrando tu respuesta...
          </p>
        </div>
      )}

      {/* Estado: Éxito */}
      {status === "exito" && (
        <div className="mt-10 text-center max-w-md">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-3xl font-amoresa text-sage-dark mb-2">
            ¡Gracias!
          </h3>
          <p className="text-sage-dark text-xl mb-4">
            Tu asistencia ha sido confirmada
          </p>
          {family && (
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="text-sage-dark text-lg">
                {attendeeCount} {attendeeCount === 1 ? "persona" : "personas"}{" "}
                de {family.nombre}
              </p>
            </div>
          )}
          <p className="text-sage-dark text-2xl font-amoresa mt-6">
            ¡Te esperamos!
          </p>
        </div>
      )}

      {/* Estado: Rechazado */}
      {status === "rechazado" && (
        <div className="mt-10 text-center max-w-md">
          <h3 className="text-2xl font-semibold text-sage-dark mb-2">
            Respuesta registrada
          </h3>
          <p className="text-sage-dark text-lg mb-2">
            Lamentamos que no puedas asistir.
          </p>
          <p className="text-sage-dark text-sm">
            Si cambias de opinión, puedes volver a usar este enlace.
          </p>
        </div>
      )}

      {/* Estado: Error */}
      {status === "error" && (
        <div className="mt-10 text-center max-w-md">
          <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-sage-dark mb-2">Error</h3>
          <p className="text-sage-dark text-lg mb-4">
            Hubo un problema al registrar tu respuesta. Por favor intenta de
            nuevo.
          </p>
          <Button
            onClick={resetToFound}
            variant="outline"
            className="border-white/30 text-sage-dark hover:bg-white/10 cursor-pointer"
          >
            Intentar de nuevo
          </Button>
        </div>
      )}

      {linkExpired && status === "encontrado" && (
        <div className="mt-6 text-center max-w-md">
          <AlertCircle className="w-10 h-10 text-amber-600 mx-auto mb-3" />
          <h4 className="text-xl font-semibold text-sage-dark mb-2">
            Enlace ya utilizado
          </h4>
          <p className="text-sage-dark text-sm">
            Este enlace de confirmación ya fue usado anteriormente.
          </p>
        </div>
      )}
    </div>
  );
}
