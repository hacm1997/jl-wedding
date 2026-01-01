import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google";
import localFont from "next/font/local";
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
  title: "Juan & Leydiana",
  description: "Boda de Juan y Leydiana",
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
        {children}
      </body>
    </html>
  );
}
