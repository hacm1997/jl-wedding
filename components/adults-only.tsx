import { SeparatorHorizontal } from "lucide-react";

export function AdultsOnlyNotice() {
  return (
    <div className="w-full flex justify-center px-4">
      <div className="relative max-w-2xl text-center text-white/90">
        {/* Línea superior */}
        <SeparatorHorizontal className="w-full h-px bg-white/40" />

        {/* Texto */}
        <p className="flex flex-wrap justify-center items-center gap-x-2 text-base italic leading-relaxed sm:text-lg md:text-xl text-white/90 text-center">
          <span>
            Para esta ocasión aunque amamos a los pequeños, esta invitación es
            solo para
          </span>

          <strong className="font-semibold text-white text-lg sm:text-xl md:text-2xl not-italic">
            adultos
          </strong>
        </p>

        {/* Línea inferior */}
        <SeparatorHorizontal className="w-full h-px bg-white/40" />
      </div>
    </div>
  );
}
