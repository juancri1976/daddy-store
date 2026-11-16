"use client";

import Link from "next/link";
import { ShoppingCart, Zap, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function PromoBanner() {
  // Lógica de la Cuenta Regresiva
  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0
  });

  useEffect(() => {
    // Definimos la fecha límite: 30 de noviembre de 2026 a las 23:59:59
    const targetDate = new Date("2026-11-30T23:59:59").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutos: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          segundos: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    // Actualiza inmediatamente y luego cada segundo
    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#E60000] text-white overflow-hidden relative border-y-4 border-black">
      
      {/* 1. FONDO DE RAYOS CONCÉNTRICOS (Estilo Sunburst / Comic) */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          background: 'repeating-conic-gradient(from 0deg, transparent 0deg 15deg, #000 15deg 30deg)',
          backgroundPosition: 'center center'
        }}
      />

      {/* 2. TEXTURAS Y ELEMENTOS FLOTANTES */}
      <div className="absolute top-4 left-4 z-10 opacity-70 animate-bounce delay-700 hidden md:block">
        <Zap className="text-yellow-400 w-12 h-12 drop-shadow-lg" />
      </div>
      <div className="absolute bottom-4 right-8 z-10 opacity-70 animate-pulse hidden md:block">
        <ShoppingCart className="text-white w-16 h-16 drop-shadow-lg" />
      </div>
      <div className="absolute top-1/2 left-8 -translate-y-1/2 z-10 rotate-[-15deg] bg-black text-white font-black px-4 py-2 border-2 border-white shadow-[4px_4px_0px_#fff] hidden lg:block">
        STOCK LIMITADO
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14 flex flex-col md:flex-row items-center justify-center relative z-20 gap-8">
        
        {/* BLOQUE CENTRAL: TIPOGRAFÍA AGRESIVA Y OFERTA */}
        <div className="flex flex-col items-center justify-center w-full relative">
          
          {/* Tag de fecha girado tipo Wondershare */}
          <div className="absolute -left-4 md:left-[10%] top-0 md:top-10 -rotate-90 bg-black text-white text-[10px] md:text-xs font-bold px-3 py-1 tracking-widest uppercase border border-white/20 whitespace-nowrap hidden sm:block">
            HASTA EL 30 DE NOV. DE 2026
          </div>

          <div className="relative group text-center">
            {/* Sombras duras estilo cómic/retro */}
            <h2 className="font-oswald text-6xl md:text-8xl lg:text-[120px] font-black uppercase tracking-tighter leading-[0.85] text-white drop-shadow-[4px_4px_0px_#000] md:drop-shadow-[8px_8px_0px_#000] italic mb-1 transform -skew-x-6 relative z-20">
              PROMO
            </h2>
            <h2 className="font-oswald text-7xl md:text-9xl lg:text-[140px] font-black uppercase tracking-tighter leading-[0.8] text-white drop-shadow-[4px_4px_0px_#000] md:drop-shadow-[8px_8px_0px_#000] italic mb-4 transform -skew-x-6 relative z-20">
              WEB<span className="text-yellow-400 text-5xl md:text-7xl absolute bottom-4 -right-10 md:-right-16 drop-shadow-[3px_3px_0px_#000]">*</span>
            </h2>
            
            {/* Sticker de descuento superpuesto */}
            <div className="absolute -bottom-6 md:-bottom-8 -right-4 md:-right-12 z-30 transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
               <div className="bg-[#00E5FF] text-black font-black text-2xl md:text-4xl px-4 py-2 border-4 border-black shadow-[4px_4px_0px_#000] italic">
                 30% OFF
               </div>
            </div>
          </div>
          
          {/* Subtítulo impactante */}
          <div className="bg-[#00E5FF] text-black border-4 border-black px-6 py-2 shadow-[6px_6px_0px_#000] mt-10 md:mt-12 mb-6 transform -skew-x-3">
             <h3 className="font-oswald text-xl md:text-3xl font-black tracking-tight uppercase">
               ¡APROVECHÁ EL DESCUENTO AHORA!
             </h3>
          </div>

          <p className="font-poppins text-sm md:text-base text-white font-bold mb-8 text-center max-w-lg drop-shadow-md">
            Ahorrá a lo grande. Llevá tu equipo al siguiente nivel con tecnología oficial. Comprá de forma inteligente en DADDY.
          </p>
          
          {/* Botón CTA gigante amarillo y negro */}
          <Link 
            href="/catalogo" 
            className="bg-yellow-400 text-black font-oswald font-black text-xl md:text-2xl uppercase tracking-wider py-4 px-12 md:px-16 rounded-full border-4 border-black hover:bg-white hover:-translate-y-1 hover:shadow-[0_10px_0px_#000] transition-all duration-300 flex items-center gap-3 shadow-[0_6px_0px_#000] relative group overflow-hidden"
          >
            <div className="absolute inset-0 w-8 h-full bg-white/50 -skew-x-12 -translate-x-32 group-hover:animate-[shine_1s_ease-in-out]"></div>
            Comprar ahora &rarr;
          </Link>

          {/* CONTADOR DE URGENCIA (ACTIVO Y EN BLANCO/NEGRO) */}
          <div className="mt-10 flex items-center gap-4 bg-white px-6 py-3 border-4 border-black shadow-[4px_4px_0px_#000] transform -skew-x-3">
             <Clock className="text-black w-6 h-6 animate-pulse" />
             <div className="flex items-center gap-3 font-oswald font-black text-black">
                <div className="flex flex-col items-center">
                   <span className="text-3xl md:text-4xl leading-none">{timeLeft.dias.toString().padStart(2, '0')}</span>
                   <span className="text-[10px] tracking-widest">DÍAS</span>
                </div>
                <span className="text-2xl -mt-4">:</span>
                <div className="flex flex-col items-center">
                   <span className="text-3xl md:text-4xl leading-none">{timeLeft.horas.toString().padStart(2, '0')}</span>
                   <span className="text-[10px] tracking-widest">HRS</span>
                </div>
                <span className="text-2xl -mt-4">:</span>
                <div className="flex flex-col items-center">
                   <span className="text-3xl md:text-4xl leading-none">{timeLeft.minutos.toString().padStart(2, '0')}</span>
                   <span className="text-[10px] tracking-widest">MIN</span>
                </div>
                <span className="text-2xl -mt-4">:</span>
                <div className="flex flex-col items-center">
                   <span className="text-3xl md:text-4xl leading-none text-[#E60000]">{timeLeft.segundos.toString().padStart(2, '0')}</span>
                   <span className="text-[10px] tracking-widest text-[#E60000]">SEG</span>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}