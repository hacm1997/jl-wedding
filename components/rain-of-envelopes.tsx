import { Mail, SeparatorHorizontal } from "lucide-react";

export default function RainOfEnvelops() {
  return (
    <section className="w-full min-h-[40vh] flex items-center justify-center px-4 py-4 bg-white">
      <div className="max-w-3xl w-full text-center flex flex-col items-center gap-6">
        <SeparatorHorizontal className="w-full h-px bg-neutral-200" />
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100">
          <Mail className="w-6 h-6 text-neutral-600" />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl tracking-[0.25em] text-sage-dark ">
          LLUVIA DE SOBRES
        </h2>

        {/* Divider */}
        <div className="w-16 h-px bg-neutral-300" />

        {/* Text */}
        <p className="text-sm sm:text-base md:text-lg text-sage-dark max-w-xl">
          Su presencia es nuestro mejor regalo, pero si desean tener un detalle
          con nosotros, contaremos con lluvia de sobres.
        </p>
      </div>
    </section>
  );
}
