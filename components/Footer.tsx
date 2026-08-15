"use client";
import Link from "next/link";
import { Mail, ShieldCheck, Truck } from "lucide-react";
import { FaInstagram, FaXTwitter, FaFacebook } from "react-icons/fa6"; // NUEVO: Importamos los logos de marcas

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border/50 pt-16 pb-8 mt-24">
      <div className="container mx-auto px-6">
        
        {/* GRILLA PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Columna 1: Marca y Beneficios */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-widest text-foreground">DADDY</span>
            </Link>
            <p className="text-sm text-gray-400 font-light pr-4">
              Luxury Tech Retail. La mejor selección de tecnología de alta gama con envíos a todo el país.
            </p>
            <div className="flex flex-col gap-3 mt-6">
              <div className="flex items-center gap-3 text-sm text-gray-400 font-light">
                <Truck className="w-5 h-5 text-accent" /> Envío asegurado
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400 font-light">
                <ShieldCheck className="w-5 h-5 text-accent" /> Garantía oficial
              </div>
            </div>
          </div>

          {/* Columna 2: Categorías */}
          <div>
            <h4 className="text-foreground font-medium mb-6 tracking-wide">Categorías</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li><Link href="/celulares" className="hover:text-accent transition-colors">Smartphones</Link></li>
              <li><Link href="/audio" className="hover:text-accent transition-colors">Audio Premium</Link></li>
              <li><Link href="/smartwatches" className="hover:text-accent transition-colors">Smartwatches</Link></li>
              <li><Link href="/seguridad" className="hover:text-accent transition-colors">Seguridad y Redes</Link></li>
            </ul>
          </div>

          {/* Columna 3: Soporte */}
          <div>
            <h4 className="text-foreground font-medium mb-6 tracking-wide">Soporte</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li><Link href="/contacto" className="hover:text-accent transition-colors">Contacto</Link></li>
              <li><Link href="/faq" className="hover:text-accent transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link href="/devoluciones" className="hover:text-accent transition-colors">Políticas de Devolución</Link></li>
              <li><Link href="/terminos" className="hover:text-accent transition-colors">Términos y Condiciones</Link></li>
            </ul>
          </div>

          {/* Columna 4: Newsletter */}
          <div>
            <h4 className="text-foreground font-medium mb-6 tracking-wide">Newsletter</h4>
            <p className="text-sm text-gray-400 font-light mb-4">
              Suscribite para recibir accesos anticipados a lanzamientos y descuentos exclusivos.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="w-full bg-background border border-border/50 rounded-lg py-2.5 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <button className="w-full bg-accent text-accent-foreground font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm">
                Suscribirme
              </button>
            </form>
          </div>
        </div>

        {/* LÍNEA DIVISORIA Y COPYRIGHT */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-light">
            &copy; {new Date().getFullYear()} DADDY. Todos los derechos reservados.
          </p>
          
          {/* Redes Sociales usando React Icons */}
          <div className="flex items-center gap-5">
            <a href="#" className="text-gray-500 hover:text-accent transition-colors" aria-label="Instagram">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-accent transition-colors" aria-label="X (Twitter)">
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-accent transition-colors" aria-label="Facebook">
              <FaFacebook className="w-5 h-5" />
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}