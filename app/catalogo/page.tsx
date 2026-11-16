"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import { Search, SlidersHorizontal } from "lucide-react";

export default function Catalogo() {
  const [productos, setProductos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const categorias = ["Todos", "Smartphones", "Audio", "Seguridad", "Gaming", "Accesorios"];

  useEffect(() => {
    async function cargarCatalogo() {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("creado_en", { ascending: false });

      if (!error && data) {
        setProductos(data);
      }
      setCargando(false);
    }
    cargarCatalogo();
  }, []);

  const productosFiltrados = productos.filter((prod) => {
    const coincideCategoria = categoriaActiva === "Todos" || prod.categoria === categoriaActiva;
    const coincideBusqueda = prod.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      
      {/* Header del Catálogo (Ajustado para móvil) */}
      <header className="bg-white border-b border-gray-200 py-12 md:py-16 px-4 md:px-6 text-center shadow-sm relative z-10">
        <h1 className="text-3xl md:text-5xl font-black text-black tracking-tighter mb-3 md:mb-4">
          Catálogo Completo
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto font-light text-sm md:text-base">
          Explorá nuestra selección de tecnología premium. Rendimiento, lujo y diseño al alcance de tu mano.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        
        {/* Barra de Herramientas: Filtros y Búsqueda */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 mb-8 md:mb-12">
          
          {/* Pestañas de Categorías (Scroll horizontal en móvil) */}
          <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm min-w-max">
              {categorias.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoriaActiva(cat)}
                  className={`px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                    categoriaActiva === cat 
                      ? 'bg-black text-white shadow-md' 
                      : 'bg-transparent text-gray-500 hover:text-black hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Buscador interno del catálogo (Full width en móvil) */}
          <div className="relative w-full md:w-80 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar modelo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm transition-all shadow-sm"
            />
          </div>
        </div>

        {/* GRILLA DE PRODUCTOS */}
        {cargando ? (
          <div className="flex flex-col items-center justify-center py-20 md:py-32 space-y-4">
            <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            <span className="text-gray-400 font-medium text-xs md:text-sm tracking-widest uppercase">Cargando arsenal...</span>
          </div>
        ) : productosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-in fade-in duration-700 slide-in-from-bottom-8">
            {productosFiltrados.map((prod) => (
              <ProductCard 
                key={prod.id}
                id={prod.id}
                name={prod.nombre} 
                category={prod.categoria} 
                price={prod.precio} 
                specs={prod.especificaciones || "Ver detalles"} 
                imageUrl={prod.imagen_url || "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop"}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 md:py-32 bg-white rounded-3xl border border-gray-200 shadow-sm px-4">
            <SlidersHorizontal className="mx-auto h-10 w-10 md:h-12 md:w-12 text-gray-300 mb-4" />
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-500 text-sm md:text-base">No hay resultados para <span className="font-semibold text-black">"{busqueda}"</span> en la categoría {categoriaActiva}.</p>
            <button 
              onClick={() => {setBusqueda(""); setCategoriaActiva("Todos");}}
              className="mt-6 md:mt-8 bg-gray-100 text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm md:text-base"
            >
              Restablecer filtros
            </button>
          </div>
        )}
        
      </main>
    </div>
  );
}