export default function Banner() {
  return (
    <div className="bg-cream-light flex justify-center items-center mt-8 sm:mt-12 md:mt-14">
      <div className="py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 flex flex-col items-center max-w-4xl w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-sage-dark text-center">
          ¡Nos vamos a casar!
        </h1>
        <h2 className="font-amoresa text-sage-dark text-4xl sm:text-6xl md:text-7xl lg:text-8xl pt-6 sm:pt-8 md:pt-10 text-center">
          Juan & Leydiana
        </h2>
        <div className="w-px h-8 sm:h-14 md:h-16 bg-sage-light my-2 sm:my-5 md:my-6"></div>

        <p className="text-sage-light text-base sm:text-lg md:text-xl lg:text-2xl text-center px-4 sm:px-6 md:px-8 leading-relaxed">
          "Más valen dos que uno, porque obtienen mejor recompensa de su
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          trabajo. Si uno de ellos cae, el otro lo levanta"
        </p>

        <p className="font-eb text-sage-dark text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium pt-2 sm:pt-3 md:pt-4 pb-6 sm:pb-7 md:pb-8 text-center">
          Eclesiástes <span className="font-primary font-semibold">4:9-10</span>
        </p>
      </div>
    </div>
  );
}
