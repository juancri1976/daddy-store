import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      
      {/* SECCIÓN DE DESTACADOS */}
      <section className="py-24 px-6 container mx-auto">
        <div className="mb-12 flex items-end justify-between border-b border-border/50 pb-4">
          <div>
            <h2 className="text-3xl font-light tracking-wide text-foreground">
              Destacados
            </h2>
            <p className="text-gray-400 font-light mt-2">
              Lo último en tecnología premium.
            </p>
          </div>
          <a href="/catalogo" className="text-sm text-accent hover:underline hidden md:block">
            Ver todo el catálogo
          </a>
        </div>

        {/* GRILLA DE PRODUCTOS (Ahora con imágenes de Unsplash) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard 
            name="iPhone 15 Pro Max" 
            category="Smartphones" 
            price={1250000} 
            specs="256GB / Titanio" 
            imageUrl="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop"
          />
          <ProductCard 
            name="Domo de Seguridad 4K" 
            category="Seguridad" 
            price={80000} 
            specs="Visión Nocturna / IA / WiFi 6" 
            imageUrl="https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=800&auto=format&fit=crop"
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
      </section>
    </main>
  );
}