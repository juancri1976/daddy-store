"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  // Estado para controlar si la barra de búsqueda está abierta o cerrada
  const [busquedaActiva, setBusquedaActiva] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md transition-all">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/daddyx.png"
            alt="Daddy Logo"
            width={240} 
            height={80} 
            className="object-contain" 
            priority 
          />
        </Link>

        {/* MENÚ DE NAVEGACIÓN (Desktop) */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <Link href="/celulares" className="hover:text-accent transition-colors">
            CELULARES
          </Link>
          <Link href="/audio" className="hover:text-accent transition-colors">
            AUDIO
          </Link>
          <Link href="/smartwatches" className="hover:text-accent transition-colors">
            SEGURIDAD
          </Link>
          <Link href="/gaming" className="hover:text-accent transition-colors">
            GAMING
          </Link>
          <Link href="/accesorios" className="hover:text-accent transition-colors">
            ACCESORIOS
          </Link>
        </nav>

        {/* ICONOS DE ACCIÓN */}
        <div className="flex items-center gap-6">
          
          {/* BUSCADOR COLLAPSABLE */}
          <div className="flex items-center">
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out flex items-center ${
                busquedaActiva ? 'w-48 opacity-100 mr-2' : 'w-0 opacity-0'
              }`}
            >
              <input 
                type="text" 
                placeholder="Buscar modelo..." 
                className="w-full bg-transparent border-b border-gray-400 text-sm text-foreground focus:outline-none focus:border-accent py-1"
                autoFocus={busquedaActiva}
              />
            </div>
            <button 
              onClick={() => setBusquedaActiva(!busquedaActiva)}
              className={`transition-colors cursor-pointer ${busquedaActiva ? 'text-accent' : 'text-gray-400 hover:text-accent'}`} 
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
          
          {/* USUARIO */}
          <button className="text-gray-400 hover:text-accent transition-colors cursor-pointer" aria-label="Usuario">
            <User className="w-5 h-5" />
          </button>
          
          {/* EL CARRITO APUNTANDO AL CHECKOUT */}
          <Link href="/checkout" className="text-gray-400 hover:text-accent transition-colors relative cursor-pointer" aria-label="Carrito">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              1
            </span>
          </Link>
        </div>
        
      </div>
    </header>
  );
}