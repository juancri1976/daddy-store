"use client";

import { 
  LayoutDashboard, 
  Package, 
  Palette, 
  Users, 
  Settings, 
  Activity, 
  Zap, 
  Server,
  Power
} from "lucide-react";

export default function AdminDashboard() {
  return (
    // El z-50 y fixed inset-0 hacen que este panel cubra la web pública
    <div className="fixed inset-0 z-50 bg-[#050505] text-gray-300 flex font-sans overflow-hidden">
      
      {/* SIDEBAR (Panel Lateral) */}
      <aside className="w-64 border-r border-white/10 bg-[#0a0a0a] flex flex-col">
        <div className="h-20 flex items-center px-8 border-b border-white/10">
          <span className="text-xl font-bold tracking-widest text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            FRALUX<span className="text-gray-600 font-light">OS</span>
          </span>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 text-white rounded-lg border border-white/10 transition-colors">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Package className="w-4 h-4" /> Productos
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Palette className="w-4 h-4" /> Campañas
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Users className="w-4 h-4" /> Clientes
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
            <Power className="w-4 h-4" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        
        {/* Cabecera Superior */}
        <header className="h-20 flex items-center justify-between px-10 border-b border-white/10 bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-semibold text-white tracking-wide">DADDY - Centro de Control</h1>
            <p className="text-xs text-green-400 flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Sistema Operativo en Línea
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 flex items-center gap-2">
              <Server className="w-4 h-4" /> Supabase: Desconectado
            </span>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold border border-white/20">
              A
            </div>
          </div>
        </header>

        {/* Contenido */}
        <div className="p-10 space-y-10">
          
          {/* MÉTRICAS (Widgets) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111111] border border-white/10 p-6 rounded-2xl flex flex-col">
              <span className="text-gray-500 text-sm font-medium mb-4">Ventas del mes</span>
              <span className="text-4xl font-bold text-white">$4.520.000</span>
              <span className="text-green-400 text-xs mt-2 flex items-center gap-1"><Activity className="w-3 h-3" /> +12% vs mes anterior</span>
            </div>
            <div className="bg-[#111111] border border-white/10 p-6 rounded-2xl flex flex-col">
              <span className="text-gray-500 text-sm font-medium mb-4">Órdenes Activas</span>
              <span className="text-4xl font-bold text-white">24</span>
              <span className="text-gray-400 text-xs mt-2">4 pendientes de despacho</span>
            </div>
            <div className="bg-[#111111] border border-white/10 p-6 rounded-2xl flex flex-col">
              <span className="text-gray-500 text-sm font-medium mb-4">Stock Crítico</span>
              <span className="text-4xl font-bold text-red-400">3</span>
              <span className="text-gray-400 text-xs mt-2">Productos por agotarse</span>
            </div>
          </div>

          {/* MOTOR DE CAMPAÑAS (Lo que vamos a conectar a Supabase) */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-accent" /> Motor de Campañas Activo
            </h2>
            <div className="bg-[#111111] border border-white/10 p-1 rounded-xl inline-flex w-full md:w-auto">
              <button className="px-6 py-3 bg-white/10 text-white rounded-lg shadow-sm text-sm font-medium border border-white/10">
                ⚪ Plata (Clásico)
              </button>
              <button className="px-6 py-3 text-gray-500 hover:text-white transition-colors text-sm font-medium">
                🟣 Cyber Monday
              </button>
              <button className="px-6 py-3 text-gray-500 hover:text-white transition-colors text-sm font-medium">
                🔥 Hot Sale
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 ml-2">Al cambiar la campaña, todo el Frontend mutará de color al instante.</p>
          </div>

          {/* GESTOR DE PRODUCTOS (Tabla) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-accent" /> Inventario Tecnológico
              </h2>
              <button className="px-4 py-2 bg-accent text-accent-foreground font-medium rounded-lg text-sm hover:opacity-90 transition-opacity">
                + Nuevo Producto
              </button>
            </div>
            
            <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-white/5 text-gray-300 font-medium">
                  <tr>
                    <th className="px-6 py-4">Producto</th>
                    <th className="px-6 py-4">Categoría</th>
                    <th className="px-6 py-4">Precio</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-lg"></div> iPhone 15 Pro Max
                    </td>
                    <td className="px-6 py-4">Smartphones</td>
                    <td className="px-6 py-4">$1.250.000</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-xs">8 Unidades</span></td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-500 hover:text-white transition-colors">Editar</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-lg"></div> Cámara de Seguridad 4K
                    </td>
                    <td className="px-6 py-4">Seguridad</td>
                    <td className="px-6 py-4">$280.000</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-red-500/10 text-red-400 rounded-full text-xs">1 Unidad</span></td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-500 hover:text-white transition-colors">Editar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}