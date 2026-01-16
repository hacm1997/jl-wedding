import { Cormorant_Garamond, EB_Garamond } from "next/font/google";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const amoresaRegular = localFont({
  src: "./../public/fonts/Andrey Sharonov - Amoresa Regular.otf",
  variable: "--font-amoresa-regular",
  display: "swap",
});

const amoresaAged = localFont({
  src: "./../public/fonts/Andrey Sharonov - Amoresa Aged.otf",
  variable: "--font-amoresa-aged",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <title>Boda | Juan & Leydiana</title>

        {/* Open Graph — FORZADO */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jl-wedding.vercel.app/" />
        <meta property="og:title" content="Boda | Juan & Leydiana" />
        <meta property="og:description" content="Boda de Juan y Leydiana" />
        <meta
          property="og:image"
          content="https://jl-wedding.vercel.app/images/preview.jpeg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />

        {/* Fallback Twitter (ayuda a WhatsApp) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://jl-wedding.vercel.app/images/preview.jpeg"
        />
      </head>

      <body
        className={`${cormorantGaramond.variable} ${ebGaramond.variable} ${amoresaRegular.variable} ${amoresaAged.variable} antialiased`}
      >
        <ToastContainer position="top-right" style={{ zIndex: 99999 }} />
        {children}
      </body>
    </html>
  );
}
