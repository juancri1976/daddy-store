import { ShoppingCart } from "lucide-react";
import Link from "next/link"; // Importamos Link de Next.js

interface ProductCardProps {
  name: string;
  category: string;
  price: number;
  specs: string;
  imageUrl: string;
}

export default function ProductCard({ name, category, price, specs, imageUrl }: ProductCardProps) {
  // Generamos un enlace amigable (ej: "iPhone 15 Pro Max" -> "iphone-15-pro-max")
  const productSlug = name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="group flex flex-col bg-surface border border-border/50 rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300">
      
      {/* ÁREA DE IMAGEN (Ahora es un link) */}
      <Link href={`/producto/${productSlug}`} className="relative h-64 w-full bg-[#1A1A1A] flex items-center justify-center overflow-hidden block">
        <img 
          src={imageUrl} 
          alt={name} 
          className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent z-10"></div>
      </Link>

      {/* ÁREA DE INFORMACIÓN */}
      <div className="p-6 flex flex-col flex-grow relative z-20">
        <span className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">
          {category}
        </span>
        
        {/* EL TÍTULO TAMBIÉN ES UN LINK */}
        <Link href={`/producto/${productSlug}`}>
          <h3 className="text-lg font-medium text-foreground leading-tight mb-1 hover:text-accent transition-colors">
            {name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-400 font-light mb-4">
          {specs}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
          <span className="text-xl font-semibold text-foreground">
            ${price.toLocaleString("es-AR")}
          </span>
          
          {/* Este botón lo dejamos para "Añadir al carrito rápido" */}
          <Link 
            href="/checkout"
            className="p-2 rounded-full bg-background border border-border text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
            aria-label="Comprar directo"
          >
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </div>
      </div>
      
    </div>
  );
}