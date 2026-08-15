import Link from "next/link";
import Image from "next/image"; // NUEVO: Importamos el optimizador de imágenes
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      
      {/* Resplandor de fondo vinculado a la campaña activa */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 py-12">
        
        {/* BLOQUE DE TEXTO */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground">
            El futuro en <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">
              tus manos.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-xl font-light mx-auto md:mx-0">
            Descubrí la nueva línea de smartphones y smartwatches premium. Rendimiento extremo, diseño absoluto.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Link 
              href="/catalogo" 
              className="group flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-full hover:opacity-90 transition-all"
            >
              Comprar ahora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/lanzamientos" 
              className="px-8 py-4 border border-border text-foreground rounded-full hover:bg-surface transition-all"
            >
              Ver lanzamientos
            </Link>
          </div>
        </div>

        {/* IMAGEN DEL PRODUCTO (Con efecto flotante) */}
        <div className="flex-1 w-full flex justify-center md:justify-end relative">
          <div className="relative w-72 h-96 md:w-96 md:h-[500px] animate-float">
            
            {/* LA MAGIA SUCEDE ACÁ: Imagen optimizada flotando */}
            <Image 
              src="/hero_spiral.png" /* CAMBIÁ ESTO por el nombre exacto de tu archivo en la carpeta public */
              alt="Producto Destacado"
              fill /* Hace que la imagen ocupe todo el espacio del contenedor de forma automática */
              className="object-contain drop-shadow-2xl" /* object-contain evita que se estire/deforme */
              priority /* Le dice a Next.js: "Esta es la foto principal, cargala a la velocidad de la luz" */
            />
            
          </div>
        </div>

      </div>
    </section>
  );
}