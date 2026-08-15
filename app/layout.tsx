import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Usamos una fuente limpia y moderna (Inter viene por defecto)
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DADDY | Luxury Tech Retail",
  description: "Tecnología de alta gama, celulares, Starlink y más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        {/* Nuestro Navbar maestro */}
        <Navbar />
        
                {/* Acá abajo se renderiza el contenido de cada página */}
        {children}
        <Footer />
      </body>
    </html>
  );
}