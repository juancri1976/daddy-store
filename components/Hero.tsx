import Link from "next/link";
import Image from "next/image"; 
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-[#F4F4F5]">
      
      {/* Resplandor de fondo vinculado a la campaña activa (ahora más sutil para fondo claro) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-accent/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 py-12">
        
        {/* BLOQUE DE TEXTO */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black">
            El futuro en <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-gray-600">
              tus manos.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-xl font-light mx-auto md:mx-0">
            Descubrí la nueva línea de smartphones y smartwatches premium. Rendimiento extremo, diseño absoluto.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Link 
              href="/catalogo" 
              className="group flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-full hover:opacity-90 transition-all shadow-lg"
            >
              Comprar ahora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/lanzamientos" 
              className="px-8 py-4 border border-gray-300 text-gray-800 font-medium rounded-full hover:bg-gray-200 transition-all"
            >
              Ver lanzamientos
            </Link>
          </div>
        </div>

        {/* IMAGEN DEL PRODUCTO */}
        <div className="flex-1 w-full flex justify-center md:justify-end relative">
          <div className="relative w-72 h-96 md:w-96 md:h-[500px] animate-float">
            <Image 
              src="/hero_spiral.png"
              alt="Producto Destacado"
              fill
              className="object-contain drop-shadow-2xl" 
              priority 
            />
          </div>
        </div>

      </div>
    </section>
  );
}