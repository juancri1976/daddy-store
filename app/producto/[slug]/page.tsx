"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import Image from "next/image";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  ShoppingCart, 
  Store, 
  Truck, 
  Plus, 
  MessageCircle,
  Eye
} from "lucide-react";

export default function DetalleProducto() {
  const params = useParams();
  const [producto, setProducto] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  // Estados interactivos
  const [metodoEntrega, setMetodoEntrega] = useState<"local" | "domicilio">("domicilio");
  const [sumarProtector, setSumarProtector] = useState(false);
  const precioProtector = 25000; // Precio simulado del protector

  useEffect(() => {
    async function cargarProducto() {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("id", params.slug)
        .single();

      if (error || !data) {
        setError(true);
      } else {
        setProducto(data);
      }
      setCargando(false);
    }

    if (params.slug) {
      cargarProducto();
    }
  }, [params.slug]);

  // Funciones de acción
  const consultarExperto = () => {
    const numeroDeVentas = "5491100000000"; // <-- ACÁ PONÉ TU NÚMERO DE WHATSAPP
    const texto = encodeURIComponent(
      `¡Hola DADDY! Tengo algunas preguntas sobre el ${producto?.nombre}. ¿Me pueden asesorar?`
    );
    window.open(`https://wa.me/${numeroDeVentas}?text=${texto}`, "_blank");
  };

  const agregarAlCarrito = () => {
    // Aquí irá la lógica de Zustand en el futuro
    alert(`Se agregó ${producto.nombre} al carrito. \nProtector: ${sumarProtector ? 'Sí' : 'No'}\nEntrega: ${metodoEntrega}`);
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 font-medium animate-pulse">Cargando detalles...</p>
        </div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500 font-medium">Producto no encontrado o fuera de catálogo.</p>
        </div>
      </div>
    );
  }

  // Cálculo de precio final
  const precioTotal = producto.precio + (sumarProtector ? precioProtector : 0);

  // Fechas simuladas para el envío
  const fechaHoy = new Date();
  const fechaEntrega1 = new Date(fechaHoy);
  fechaEntrega1.setDate(fechaHoy.getDate() + 3);
  const fechaEntrega2 = new Date(fechaHoy);
  fechaEntrega2.setDate(fechaHoy.getDate() + 4);
  const formatearFecha = (fecha: Date) => fecha.toLocaleDateString('es-AR', { day: 'numeric', month: 'long' });

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white pb-20">
      
      
      <main className="max-w-7xl mx-auto px-6 mt-12 md:mt-20">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          
          {/* COLUMNA IZQUIERDA: IMAGEN */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="w-full aspect-square bg-[#F4F4F5] rounded-3xl overflow-hidden flex items-center justify-center p-8 relative border border-gray-200 sticky top-24">
              {producto.imagen_url ? (
                <img 
                  src={producto.imagen_url} 
                  alt={producto.nombre}
                  className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse rounded-2xl flex items-center justify-center text-gray-400 font-medium text-sm">
                  Sin imagen disponible
                </div>
              )}
            </div>
          </div>

          {/* COLUMNA DERECHA: INFORMACIÓN Y CHECKOUT */}
          <div className="w-full md:w-1/2 flex flex-col">
            
            {/* Cabecera del producto */}
            <div className="mb-6 border-b border-gray-200 pb-6">
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3 block">
                {producto.categoria}
              </span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight mb-2">
                {producto.nombre}
              </h1>
              
              {/* Badge de "Visto con frecuencia" */}
              <div className="flex items-center gap-1.5 text-orange-600 text-xs font-medium mb-4">
                <Eye className="w-4 h-4" />
                <span>Este artículo es visto con frecuencia.</span>
              </div>

              <div className="flex flex-col mt-4">
                <p className="text-4xl font-light text-black tracking-tight">
                  ${precioTotal.toLocaleString('es-AR')}
                </p>
                <span className="text-sm text-gray-500 mt-1">IVA incluido. Envío gratuito.</span>
              </div>
            </div>

            {/* Opciones de Entrega */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Opciones de entrega</h3>
              <div className="flex flex-col gap-3">
                <label 
                  className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${metodoEntrega === 'domicilio' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}
                  onClick={() => setMetodoEntrega('domicilio')}
                >
                  <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${metodoEntrega === 'domicilio' ? 'border-black' : 'border-gray-300'}`}>
                    {metodoEntrega === 'domicilio' && <div className="w-2.5 h-2.5 bg-black rounded-full"></div>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Truck className="w-4 h-4 text-gray-600" />
                      <span className="font-semibold text-gray-900">Entrega a domicilio</span>
                    </div>
                    <p className="text-sm text-gray-500">Llega entre el {formatearFecha(fechaEntrega1)} y el {formatearFecha(fechaEntrega2)}</p>
                  </div>
                </label>

                <label 
                  className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${metodoEntrega === 'local' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}
                  onClick={() => setMetodoEntrega('local')}
                >
                  <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${metodoEntrega === 'local' ? 'border-black' : 'border-gray-300'}`}>
                    {metodoEntrega === 'local' && <div className="w-2.5 h-2.5 bg-black rounded-full"></div>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Store className="w-4 h-4 text-gray-600" />
                      <span className="font-semibold text-gray-900">Retira en Local DADDY</span>
                    </div>
                    <p className="text-sm text-gray-500">Disponible a partir de hoy, 18:00 hs.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Upselling (Protector) */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Complementos</h3>
              <div 
                className={`flex items-center justify-between p-4 border rounded-xl transition-colors cursor-pointer ${sumarProtector ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => setSumarProtector(!sumarProtector)}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-6 h-6 rounded border ${sumarProtector ? 'bg-black border-black text-white' : 'border-gray-300 bg-white'}`}>
                    {sumarProtector && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">Protector de pantalla premium</span>
                      <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Popular</span>
                    </div>
                    <p className="text-sm text-gray-500 text-left">Con aplicación incluida en tienda.</p>
                  </div>
                </div>
                <span className="font-medium text-gray-900">+ ${precioProtector.toLocaleString('es-AR')}</span>
              </div>
            </div>

            {/* Especificaciones Rápidas */}
            <div className="bg-[#F4F4F5] p-6 rounded-2xl mb-8 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-black font-semibold">Disponibilidad:</strong> {producto.stock > 0 ? `${producto.stock} en stock` : 'Sin stock'}.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-black font-semibold">Garantía DADDY:</strong> 12 meses de cobertura oficial.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-black font-semibold">Especificaciones:</strong> {producto.especificaciones || 'No detalladas.'}
                </p>
              </div>
            </div>

            {/* BOTÓN DE CHECKOUT */}
            <div className="mt-auto mb-6">
              <button 
                onClick={agregarAlCarrito}
                disabled={producto.stock === 0}
                className="w-full flex items-center justify-center gap-3 bg-black text-white py-5 rounded-xl font-bold text-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                {producto.stock > 0 ? 'AGREGAR AL CARRITO' : 'SIN STOCK'}
              </button>
            </div>

            {/* Contacto Experto */}
            <div className="border-t border-gray-200 pt-6 text-center">
              <h4 className="font-bold text-gray-900 mb-2">¡Consulta con un experto!</h4>
              <p className="text-sm text-gray-500 mb-4">¿Tiene alguna pregunta sobre este producto? Nuestros asesores están disponibles en directo.</p>
              <button 
                onClick={consultarExperto}
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-900 font-bold py-3 px-6 rounded-xl hover:border-black transition-colors text-sm w-full md:w-auto mx-auto"
              >
                <MessageCircle className="w-5 h-5" />
                Contactar por WhatsApp
              </button>
            </div>
            
          </div>
        </div>
      </main>

      {/* SECCIÓN DE RECOMENDADOS (Mockups Estáticos por ahora) */}
      <section className="bg-[#F4F4F5] mt-24 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-black mb-8 border-b border-gray-200 pb-4">
            Completá tu ecosistema
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card Recomendado 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow cursor-pointer group flex flex-col h-full">
              <div className="w-full h-40 bg-gray-50 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=400&auto=format&fit=crop" alt="Auriculares" className="h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <span className="text-xs text-gray-400 font-bold uppercase mb-1">Audio</span>
              <h3 className="font-bold text-gray-900 mb-1 leading-tight">Auriculares Premium Noise Cancelling</h3>
              <p className="text-gray-900 font-medium mt-auto">$ 450.000</p>
            </div>

            {/* Card Recomendado 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow cursor-pointer group flex flex-col h-full">
              <div className="w-full h-40 bg-gray-50 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&auto=format&fit=crop" alt="Cargador" className="h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <span className="text-xs text-gray-400 font-bold uppercase mb-1">Accesorios</span>
              <h3 className="font-bold text-gray-900 mb-1 leading-tight">Cargador Rápido 35W Dual Port</h3>
              <p className="text-gray-900 font-medium mt-auto">$ 85.000</p>
            </div>
            
            {/* Espacios vacíos para mantener la grilla */}
            <div className="hidden lg:block"></div>
            <div className="hidden lg:block"></div>

          </div>
        </div>
      </section>

    </div>
  );
}