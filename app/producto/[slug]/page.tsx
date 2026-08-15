import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Zap, Star } from "lucide-react";

// NUEVO: Agregamos "async" y definimos params como una Promesa
export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // NUEVO: Esperamos (await) a que Next.js nos entregue la URL resuelta
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Ahora sí, convertimos el slug de forma segura
  const productName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        
        {/* BREADCRUMBS (Migas de pan) */}
        <div className="text-sm text-gray-500 mb-8 flex items-center gap-2 font-light">
          <Link href="/" className="hover:text-accent transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-accent transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-gray-300">{productName}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* GALERÍA DE IMÁGENES (Izquierda) */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square bg-surface border border-border/50 rounded-3xl overflow-hidden flex items-center justify-center group">
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              {/* Imagen genérica premium para la demo */}
              <img 
                src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop" 
                alt={productName}
                className="w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Miniaturas simuladas */}
            <div className="flex gap-4 mt-4">
              <div className="w-24 h-24 bg-surface border-2 border-accent rounded-xl overflow-hidden cursor-pointer">
                <img src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover opacity-100" />
              </div>
              <div className="w-24 h-24 bg-surface border border-border/50 rounded-xl overflow-hidden cursor-pointer hover:border-gray-500 transition-colors">
                <div className="w-full h-full bg-[#111] flex items-center justify-center text-gray-600 text-xs">FOTO 2</div>
              </div>
              <div className="w-24 h-24 bg-surface border border-border/50 rounded-xl overflow-hidden cursor-pointer hover:border-gray-500 transition-colors">
                <div className="w-full h-full bg-[#111] flex items-center justify-center text-gray-600 text-xs">FOTO 3</div>
              </div>
            </div>
          </div>

          {/* DETALLES DEL PRODUCTO (Derecha) */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase rounded-full">
                  Lanzamiento
                </span>
                <div className="flex text-yellow-500 items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
                {productName}
              </h1>
              <p className="text-3xl font-light text-foreground mb-6">
                $1.250.000 <span className="text-sm text-gray-500 font-normal tracking-wide">ARS</span>
              </p>
              <p className="text-gray-400 font-light text-lg leading-relaxed">
                Rendimiento de última generación envuelto en un diseño espectacular. Equipado con el nuevo chip neuronal y sistema de cámaras profesionales para llevar tu creatividad al máximo nivel.
              </p>
            </div>

            {/* Especificaciones Rápidas */}
            <div className="grid grid-cols-2 gap-4 py-6 border-y border-border/50">
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-widest">Almacenamiento</p>
                <p className="text-white font-medium">256 GB / 512 GB</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-widest">Procesador</p>
                <p className="text-white font-medium flex items-center gap-2"><Zap className="w-4 h-4 text-accent" /> Chip A17 Pro</p>
              </div>
            </div>

            {/* Acciones de Compra */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/checkout" 
                className="flex-1 py-4 bg-accent text-accent-foreground font-semibold rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                Comprar Ahora
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="flex-1 py-4 border border-border text-foreground font-semibold rounded-full hover:bg-surface transition-colors">
                Agregar al carrito
              </button>
            </div>

            {/* Garantías */}
            <div className="flex flex-col gap-3 mt-8 p-6 bg-surface/50 rounded-2xl border border-border/50 text-sm text-gray-400 font-light">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-accent" /> Envío gratis asegurado a todo el país.
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-accent" /> Garantía oficial de 12 meses directa.
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}