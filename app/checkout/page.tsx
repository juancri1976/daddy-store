"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, ShieldCheck, Truck, CheckCircle, Loader2 } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulamos el tiempo de conexión con la pasarela de pago (2.5 segundos)
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2500);
  };

  // PANTALLA DE ÉXITO (Se muestra después de "pagar")
  if (isSuccess) {
    return (
      <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-surface border border-border/50 p-10 rounded-2xl text-center space-y-6">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          <h2 className="text-3xl font-bold text-foreground">¡Pago Exitoso!</h2>
          <p className="text-gray-400 font-light">
            Tu orden <span className="text-white font-medium">#DDY-8429</span> ha sido procesada. Recibirás un correo con los detalles del envío.
          </p>
          <div className="pt-6 border-t border-border/50">
            <Link 
              href="/" 
              className="inline-block w-full py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // PANTALLA DE CHECKOUT NORMAL
  return (
    <main className="container mx-auto px-6 py-12 min-h-[calc(100vh-5rem)]">
      <h1 className="text-3xl font-bold tracking-wide text-foreground mb-8">Finalizar Compra</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* FORMULARIO DE DATOS */}
        <div className="flex-1 space-y-8">
          <section className="bg-surface p-8 rounded-2xl border border-border/50">
            <h2 className="text-xl font-medium text-foreground mb-6 flex items-center gap-2">
              <Truck className="w-5 h-5 text-accent" /> Datos de Envío
            </h2>
            <form id="checkout-form" onSubmit={handlePayment} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre" required className="w-full bg-background border border-border/50 rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent transition-colors" />
                <input type="text" placeholder="Apellido" required className="w-full bg-background border border-border/50 rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent transition-colors" />
              </div>
              <input type="email" placeholder="Correo Electrónico" required className="w-full bg-background border border-border/50 rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent transition-colors" />
              <input type="text" placeholder="Dirección completa" required className="w-full bg-background border border-border/50 rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent transition-colors" />
            </form>
          </section>

          <section className="bg-surface p-8 rounded-2xl border border-border/50">
            <h2 className="text-xl font-medium text-foreground mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-accent" /> Pago Seguro
            </h2>
            <div className="space-y-4">
              <input type="text" placeholder="Número de Tarjeta" required form="checkout-form" className="w-full bg-background border border-border/50 rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent transition-colors" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/AA" required form="checkout-form" className="w-full bg-background border border-border/50 rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent transition-colors" />
                <input type="text" placeholder="CVC" required form="checkout-form" className="w-full bg-background border border-border/50 rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent transition-colors" />
              </div>
            </div>
          </section>
        </div>

        {/* RESUMEN DEL PEDIDO */}
        <div className="w-full lg:w-96 space-y-6">
          <div className="bg-surface p-8 rounded-2xl border border-border/50 sticky top-28">
            <h2 className="text-xl font-medium text-foreground mb-6">Resumen</h2>
            
            {/* Producto Simulado */}
            <div className="flex gap-4 items-center mb-6 pb-6 border-b border-border/50">
              <div className="w-16 h-16 bg-background rounded-lg flex items-center justify-center overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop" alt="iPhone" className="object-cover w-full h-full" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">iPhone 15 Pro Max</h3>
                <p className="text-xs text-gray-400">256GB / Titanio</p>
                <p className="text-sm font-semibold mt-1">$1.250.000</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-400 mb-6">
              <div className="flex justify-between"><span>Subtotal</span><span>$1.250.000</span></div>
              <div className="flex justify-between"><span>Envío (Asegurado)</span><span className="text-green-400">Gratis</span></div>
              <div className="flex justify-between pt-3 border-t border-border/50 text-foreground text-lg font-semibold">
                <span>Total</span><span>$1.250.000</span>
              </div>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Procesando...
                </>
              ) : (
                "Pagar Ahora"
              )}
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4" /> Pagos encriptados de extremo a extremo
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}