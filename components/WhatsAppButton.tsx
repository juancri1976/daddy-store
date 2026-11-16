"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  // ACÁ PONÉ TU NÚMERO DE WHATSAPP (Con código de país, sin el + ni espacios)
  const numeroDeVentas = "5493491415777"; 
  const textoDefault = encodeURIComponent("¡Hola DADDY! Necesito hacer una consulta desde la web.");
  
  const linkContacto = `https://wa.me/${numeroDeVentas}?text=${textoDefault}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end group">
      
      {/* Tooltip Premium (Mensaje Flotante) */}
      <div className="absolute right-16 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none flex items-center">
        <div className="bg-black text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-xl border border-gray-800 whitespace-nowrap tracking-wide">
          ¿Necesitás ayuda?
        </div>
        {/* Triangulito del globo de chat */}
        <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-black ml-[-1px]"></div>
      </div>

      {/* Botón Principal de WhatsApp */}
      <a
        href={linkContacto}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full transition-transform duration-300 hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        {/* Efecto de Latido (Glow) */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full blur-md opacity-60 animate-[pulse_3s_ease-in-out_infinite]"></div>
        
        {/* Ícono sobre el efecto */}
        <MessageCircle size={28} className="fill-current relative z-10" />
      </a>
      
    </div>
  );
}