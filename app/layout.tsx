import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Boda | Juan & Leydiana",
  description: "Boda de Juan y Leydiana",
  openGraph: {
    title: "Boda | Juan & Leydiana",
    description: "Boda de Juan y Leydiana",
    url: "https://jl-wedding.vercel.app",
    siteName: "Boda | Juan & Leydiana",
    images: [
      {
        url: "https://jl-wedding.vercel.app/images/preview.jpg",
        width: 1080,
        height: 1920,
        alt: "Preview vertical",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boda | Juan & Leydiana",
    description: "Boda de Juan y Leydiana",
    images: ["https://jl-wedding.vercel.app/images/preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${cormorantGaramond.variable} ${ebGaramond.variable} ${amoresaRegular.variable} ${amoresaAged.variable} antialiased`}
      >
        <ToastContainer position="top-right" style={{ zIndex: 99999 }} />
        {children}
      </body>
    </html>
  );
}
