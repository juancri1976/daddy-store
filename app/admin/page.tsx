"use client";

import { useState } from "react";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Activity, 
  Zap, 
  Server,
  Power,
  Repeat,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Search,
  Bell
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("abonos"); // 'ecommerce' o 'abonos'

  return (
    // Fondo claro grisáceo muy sutil
    <div className="fixed inset-0 z-50 bg-[#F8FAFC] text-gray-800 flex font-sans overflow-hidden">
      
      {/* SIDEBAR (Panel Lateral Claro) */}
      <aside className="w-64 border-r border-gray-200 bg-white flex flex-col shadow-sm">
        <div className="h-20 flex items-center px-8 border-b border-gray-200">
          <span className="text-xl font-bold tracking-widest text-gray-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            FRALUX<span className="text-gray-400 font-light">OS</span>
          </span>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">Módulos</div>
          
          <button 
            onClick={() => setActiveTab("abonos")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'abonos' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Repeat className="w-5 h-5" /> Abonos / MRR
          </button>
          
          <button 
            onClick={() => setActiveTab("ecommerce")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'ecommerce' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Package className="w-5 h-5" /> E-commerce
          </button>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Analítica
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            <Users className="w-5 h-5" /> CRM Clientes
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 font-medium rounded-lg transition-colors">
            <Power className="w-5 h-5" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        
        {/* Cabecera Superior */}
        <header className="h-20 flex items-center justify-between px-10 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-lg w-96 border border-gray-200">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Buscar clientes, patentes o facturas..." className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400" />
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-500 flex items-center gap-2">
              <Server className="w-4 h-4" /> Local Demo
            </span>
            <button className="relative text-gray-400 hover:text-gray-600">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
              A
            </div>
          </div>
        </header>

        {/* Contenido Dinámico */}
        <div className="p-10">
          
          {/* VISTA 1: ABONOS (MRR) */}
          {activeTab === 'abonos' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Control de Suscripciones</h1>
                  <p className="text-gray-500 mt-1">Gestión de cobros recurrentes (MRR) por servicios y monitoreo.</p>
                </div>
                <button className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
                  + Nuevo Abono
                </button>
              </div>

              {/* Métricas MRR */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                  <span className="text-gray-500 text-sm font-medium">Ingreso Recurrente Mensual</span>
                  <div className="text-3xl font-bold text-gray-900 mt-2">$3.450.000</div>
                  <span className="text-green-600 text-xs mt-2 flex items-center gap-1 font-medium"><Activity className="w-3 h-3" /> Fijo asegurado</span>
                </div>
                <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                  <span className="text-gray-500 text-sm font-medium">Abonos Activos</span>
                  <div className="text-3xl font-bold text-gray-900 mt-2">128</div>
                  <span className="text-gray-400 text-xs mt-2 font-medium">Servicios en curso</span>
                </div>
                <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm border-l-4 border-l-red-500">
                  <span className="text-gray-500 text-sm font-medium">Morosidad Actual</span>
                  <div className="text-3xl font-bold text-gray-900 mt-2">$145.000</div>
                  <span className="text-red-500 text-xs mt-2 font-medium">4 clientes atrasados</span>
                </div>
              </div>

              {/* Tabla de Abonos */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4">Cliente / Empresa</th>
                      <th className="px-6 py-4">Servicio</th>
                      <th className="px-6 py-4">Identificador</th>
                      <th className="px-6 py-4">Monto Mensual</th>
                      <th className="px-6 py-4">Estado</th>
                      <th className="px-6 py-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900">Transportes del Sur SRL</td>
                      <td className="px-6 py-4 text-gray-600">Rastreo GPS Flota</td>
                      <td className="px-6 py-4 text-gray-500">5 Vehículos</td>
                      <td className="px-6 py-4 font-medium text-gray-900">$75.000</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          <CheckCircle2 className="w-3 h-3" /> Al Día
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">Ver Detalle</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors bg-orange-50/30">
                      <td className="px-6 py-4 font-semibold text-gray-900">María Gómez</td>
                      <td className="px-6 py-4 text-gray-600">Monitoreo Cámaras 24/7</td>
                      <td className="px-6 py-4 text-gray-500">Av. San Martín 450</td>
                      <td className="px-6 py-4 font-medium text-gray-900">$25.000</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                          <AlertCircle className="w-3 h-3" /> Vencido
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-orange-600 font-medium border border-orange-200 px-3 py-1 rounded-md bg-white hover:bg-orange-50">Notificar Cobro</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors bg-red-50/30">
                      <td className="px-6 py-4 font-semibold text-gray-900">Ferretería Industrial</td>
                      <td className="px-6 py-4 text-gray-600">CCTV + Control Acceso</td>
                      <td className="px-6 py-4 text-gray-500">Galpón Norte</td>
                      <td className="px-6 py-4 font-medium text-gray-900">$45.000</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                          <XCircle className="w-3 h-3" /> Suspendido
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-red-600 font-medium">Reactivar</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VISTA 2: E-COMMERCE */}
          {activeTab === 'ecommerce' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Inventario E-Commerce</h1>
                  <p className="text-gray-500 mt-1">Gestión de productos físicos, stock y campañas de la tienda.</p>
                </div>
                <button className="px-5 py-2.5 bg-gray-900 text-white font-medium rounded-lg shadow-sm hover:bg-black transition-colors">
                  + Nuevo Producto
                </button>
              </div>

              {/* Tabla de E-commerce adaptada al modo claro */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mt-8">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4">Producto</th>
                      <th className="px-6 py-4">Categoría</th>
                      <th className="px-6 py-4">Precio</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg border border-gray-200"></div> iPhone 15 Pro Max
                      </td>
                      <td className="px-6 py-4 text-gray-600">Smartphones</td>
                      <td className="px-6 py-4 font-medium text-gray-900">$1.250.000</td>
                      <td className="px-6 py-4"><span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">8 Unidades</span></td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">Editar</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}