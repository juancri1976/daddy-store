import { ShoppingCart } from "lucide-react";
import Link from "next/link"; 

interface ProductCardProps {
  name: string;
  category: string;
  price: number;
  specs: string;
  imageUrl: string;
}

export default function ProductCard({ name, category, price, specs, imageUrl }: ProductCardProps) {
  const productSlug = name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-xl transition-all duration-300">
      
      {/* ÁREA DE IMAGEN (Ahora clara) */}
      <Link href={`/producto/${productSlug}`} className="relative h-64 w-full bg-gray-100 flex items-center justify-center overflow-hidden block">
        <img 
          src={imageUrl} 
          alt={name} 
          className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-200/80 via-transparent to-transparent z-10"></div>
      </Link>

      {/* ÁREA DE INFORMACIÓN */}
      <div className="p-6 flex flex-col flex-grow relative z-20">
        <span className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-2">
          {category}
        </span>
        
        {/* TÍTULO: Negro, compacto (como el Hero) y tamaño adaptado */}
        <Link href={`/producto/${productSlug}`}>
          <h3 className="text-lg font-bold tracking-tighter text-black leading-tight mb-1 hover:text-accent transition-colors">
            {name}
          </h3>
        </Link>
        
        {/* SUBTÍTULOS: Gris */}
        <p className="text-sm text-gray-500 font-light mb-4">
          {specs}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xl font-bold text-black">
            ${price.toLocaleString("es-AR")}
          </span>
          
          <Link 
            href="/checkout"
            className="p-2 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:bg-accent hover:text-white hover:border-accent transition-colors"
            aria-label="Comprar directo"
          >
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </div>
      </div>
      
    </div>
  );
}