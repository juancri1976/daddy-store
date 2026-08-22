import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      
      {/* SECCIÓN DE DESTACADOS (Ahora en Modo Claro) */}
      <section className="bg-[#F4F4F5] py-24">
        <div className="container mx-auto px-6">
          
          {/* ENCABEZADO DE SECCIÓN */}
          <div className="mb-12 flex items-end justify-between border-b border-gray-200 pb-4">
            <div>
              {/* TÍTULO: Negro, compacto y misma fuente que el Hero */}
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-black">
                Destacados
              </h2>
              {/* SUBTÍTULO: Gris medio para generar contraste */}
              <p className="text-gray-500 font-light mt-2">
                Lo último en tecnología premium.
              </p>
            </div>
            <a href="/catalogo" className="text-sm font-medium text-accent hover:underline hidden md:block">
              Ver todo el catálogo
            </a>
          </div>

          {/* GRILLA DE PRODUCTOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard 
              name="iPhone 15 Pro Max" 
              category="Smartphones" 
              price={1250000} 
              specs="256GB / Titanio" 
              imageUrl="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop"
            />
            <ProductCard 
              name="Cámara de Seguridad 4K" 
              category="Seguridad" 
              price={280000} 
              specs="Visión Nocturna / IA / WiFi 6" 
              imageUrl="https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=800&auto=format&fit=crop"
            />
            <ProductCard 
              name="Parlante Pro USB-C" 
              category="Audio" 
              price={185000} 
              specs="Sonido 360° / Batería 24hs" 
              imageUrl="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop"
            />
            <ProductCard 
              name="Auriculares Premium" 
              category="Audio" 
              price={450000} 
              specs="Cancelación de ruido activa" 
              imageUrl="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop"
            />
          </div>
          
        </div>
      </section>
    </main>
  );
}