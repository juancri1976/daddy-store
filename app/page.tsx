"use client";

import { useEffect, useState } from "react";
//import Navbar from "@/components/Navbar"; // <-- IMPORTACIÓN CLAVE DEL NAVBAR ACTUALIZADO
import PromoBanner from "@/components/PromoBanner";
//import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import Hero from "@/components/Hero";

export default function Home() {
  const [productosDestacados, setProductosDestacados] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDestacados() {
      try {
        const { data, error } = await supabase
          .from("productos")
          .select("*")
          .eq("destacado", true)
          .limit(4);

        if (error) throw error;
        
        if (data) {
          setProductosDestacados(data);
        }
      } catch (error) {
        console.error("Error al cargar destacados:", error);
      } finally {
        setCargando(false);
      }
    }

    cargarDestacados();
  }, []);

  return (
    <main className="flex flex-col">
      {/* 1. RENDERIZAMOS EL NAVBAR ACTUALIZADO (El que tiene la lupa) */}

      {/* 2. INYECTAMOS EL BANNER PUBLICITARIO ACÁ */}
      <PromoBanner />

      {/* 2. RENDERIZAMOS EL HERO */}
      
      
            {/* SECCIÓN DE DESTACADOS DINÁMICA */}
      <section className="bg-[#F4F4F5] py-24">
        <div className="container mx-auto px-6">
          
          <div className="mb-12 flex items-end justify-between border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-black">
                Destacados
              </h2>
              <p className="text-gray-500 font-light mt-2">
                Lo último en tecnología premium.
              </p>
            </div>
            <a href="/catalogo" className="text-sm font-medium text-accent hover:underline hidden md:block">
              Ver todo el catálogo
            </a>
          </div>

          {cargando ? (
            <div className="text-center py-12 text-gray-400">Cargando destacados...</div>
          ) : productosDestacados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productosDestacados.map((prod) => (
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
            <div className="text-center py-12 text-gray-500 bg-white border border-gray-200 rounded-xl">
              Aún no hay productos marcados como destacados. Ingresá al Panel Admin para destacarlos.
            </div>
          )}
          
        </div>
      </section>

      {/* SECCIÓN DE PROMOCIONES (Estilo Editorial / Campañas) */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* TARJETA 1: TELÉFONOS */}
            <div className="flex flex-col border border-gray-300 group cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <div className="relative w-full h-[220px] bg-gray-100 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=800&auto=format&fit=crop" 
                  alt="Promoción Teléfonos" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-5 text-[11px] font-bold text-gray-700">
                  <span className="border border-gray-400 px-2 py-1">Semana de la manzana</span>
                  <span className="border border-gray-400 px-2 py-1">Solo hasta el 2 de noviembre.</span>
                </div>
                <h3 className="font-black italic text-2xl md:text-3xl text-black mb-3 tracking-tighter leading-none">
                  Prepárate para más
                </h3>
                <p className="text-gray-500 text-sm mb-8 flex-grow leading-relaxed">
                  En exclusiva para nuestros clientes: Descubre fantásticas ofertas en la línea de smartphones de alta gama. Rendimiento absoluto al mejor precio con nuestros servicios de búsqueda.
                </p>
                <div className="flex justify-end mt-auto">
                  <button className="flex items-center gap-2 border-2 border-black px-4 py-2 font-bold text-sm text-black group-hover:bg-black group-hover:text-white transition-colors">
                    <span className="text-lg leading-none font-light">&gt;</span> En relación con la campaña
                  </button>
                </div>
              </div>
            </div>

            {/* TARJETA 2: SEGURIDAD */}
            <div className="flex flex-col border border-gray-300 group cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <div className="relative w-full h-[220px] bg-gray-100 overflow-hidden">
                <img 
                  src="/cctv.png"
                  alt="Promoción Seguridad" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-5 text-[11px] font-bold text-gray-700">
                  <span className="border border-gray-400 px-2 py-1">Oferta</span>
                  <span className="border border-gray-400 px-2 py-1">Solo hasta el 2 de noviembre.</span>
                </div>
                <h3 className="font-black italic text-2xl md:text-3xl text-black mb-3 tracking-tighter leading-none">
                  Seguridad 24hs.
                </h3>
                <p className="text-gray-500 text-sm mb-8 flex-grow leading-relaxed">
                  Instalación de Camaras de Seguridad en alta definición. Monitoreá tu propiedad las 24hs, en tiempo real y desde tu teléfono, estés donde estés.
                </p>
                <div className="flex justify-end mt-auto">
                  <button className="flex items-center gap-2 border-2 border-black px-4 py-2 font-bold text-sm text-black group-hover:bg-black group-hover:text-white transition-colors">
                    <span className="text-lg leading-none font-light">&gt;</span> Contactanos
                  </button>
                </div>
              </div>
            </div>

            {/* TARJETA 3: ACCESORIOS Y AUDIO */}
            <div className="flex flex-col border border-gray-300 group cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <div className="relative w-full h-[220px] bg-gray-100 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop" 
                  alt="Promoción Audio" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-5 text-[11px] font-bold text-gray-700">
                  <span className="border border-gray-400 px-2 py-1">Solo hasta el 31 de octubre.</span>
                </div>
                <h3 className="font-black italic text-2xl md:text-3xl text-black mb-3 tracking-tighter leading-none">
                  Semana de los gigantes del audio
                </h3>
                <p className="text-gray-500 text-sm mb-8 flex-grow leading-relaxed">
                  Disfruta de un sonido de primera calidad: hasta un 50 % de descuento sobre el precio de venta recomendado en auriculares premium.
                </p>
                <div className="flex justify-end mt-auto">
                  <button className="flex items-center gap-2 border-2 border-black px-4 py-2 font-bold text-sm text-black group-hover:bg-black group-hover:text-white transition-colors">
                    <span className="text-lg leading-none font-light">&gt;</span> Descúbrelo ahora
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
    </main>
  );
}