"use client";

import { useState } from "react";
import Image from "next/image";
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
  Bell,
  TrendingUp,
  BarChart3,
  Star,
  Mail
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("analitica"); 

  return (
    <div className="fixed inset-0 z-50 bg-[#F8FAFC] text-gray-800 flex font-sans overflow-hidden">
      
      {/* SIDEBAR (Panel Lateral Claro) */}
      <aside className="w-64 border-r border-gray-200 bg-white flex flex-col shadow-sm">
        <div className="h-20 flex items-center px-8 border-b border-gray-200">
          {/* LOGO OFICIAL DE FRALUX OS */}
          <Image 
            src="/fraluxos.svg" 
            alt="FraluX OS Logo" 
            width={140} 
            height={40} 
            className="object-contain" 
            priority 
          />
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">Módulos</div>
          
          <button 
            onClick={() => setActiveTab("analitica")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'analitica' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Analítica
          </button>
          
          <button 
            onClick={() => setActiveTab("crm")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'crm' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Users className="w-5 h-5" /> CRM Clientes
          </button>

          <button 
            onClick={() => setActiveTab("abonos")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'abonos' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Repeat className="w-5 h-5" /> Abonos Mensuales
          </button>
          
          <button 
            onClick={() => setActiveTab("ecommerce")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'ecommerce' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Package className="w-5 h-5" /> E-commerce
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
          
          {/* VISTA 1: ANALÍTICA */}
          {activeTab === 'analitica' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Rendimiento del Negocio</h1>
                  <p className="text-gray-500 mt-1">Métricas globales de la tienda online y suscripciones.</p>
                </div>
                <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-4 py-2.5 shadow-sm outline-none">
                  <option>Últimos 30 días</option>
                  <option>Este Trimestre</option>
                  <option>Este Año</option>
                </select>
              </div>

              {/* KPIs Renovados con Color y Efectos */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* Tarjeta 1: Facturación (Verde Esmeralda) */}
                <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-6 rounded-2xl shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150"></div>
                  <span className="text-emerald-700 text-sm font-bold tracking-wide relative z-10 uppercase">Facturación Bruta</span>
                  <div className="text-3xl font-black text-gray-900 mt-2 relative z-10">$12.450.000</div>
                  <span className="text-emerald-600 text-xs mt-2 flex items-center gap-1 font-semibold relative z-10">
                    <TrendingUp className="w-3 h-3" /> +15.2% vs mes anterior
                  </span>
                </div>

                {/* Tarjeta 2: Ticket Promedio (Violeta) */}
                <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 p-6 rounded-2xl shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150"></div>
                  <span className="text-purple-700 text-sm font-bold tracking-wide relative z-10 uppercase">Venta Promedio</span>
                  <div className="text-3xl font-black text-gray-900 mt-2 relative z-10">$345.000</div>
                  <span className="text-purple-600 text-xs mt-2 flex items-center gap-1 font-semibold relative z-10">
                    <TrendingUp className="w-3 h-3" /> +2.1% vs mes anterior
                  </span>
                </div>

                {/* Tarjeta 3: Conversión (Naranja/Ámbar) */}
                <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-100 p-6 rounded-2xl shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150"></div>
                  <span className="text-amber-700 text-sm font-bold tracking-wide relative z-10 uppercase">% Ventas x Visitas</span>
                  <div className="text-3xl font-black text-gray-900 mt-2 relative z-10">3.8%</div>
                  <span className="text-amber-600 text-xs mt-2 font-semibold relative z-10">
                    Estable y optimizada
                  </span>
                </div>

                {/* Tarjeta 4: MRR (Azul) */}
                <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-6 rounded-2xl shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150"></div>
                  <span className="text-blue-800 text-sm font-bold tracking-wide relative z-10 uppercase">Abonos Mensuales</span>
                  <div className="text-3xl font-black text-blue-950 mt-2 relative z-10">$3.450.000</div>
                  <span className="text-blue-600 text-xs mt-2 flex items-center gap-1 font-semibold relative z-10">
                    <Repeat className="w-3 h-3" /> Ingreso mensual fijo
                  </span>
                </div>

              </div>

              {/* === ACÁ ESTÁ EL GRÁFICO NUEVO ANIMADO === */}
              <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm animate-in fade-in duration-700 delay-150">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" /> Evolución de Ingresos (Últimos 12 meses)
                  </h3>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                    2025 - 2026
                  </span>
                </div>

                <div className="flex items-end gap-2 md:gap-4 h-52 mt-4">
                  {[35, 45, 40, 60, 55, 75, 65, 85, 80, 90, 85, 100].map((height, i) => (
                    <div key={i} className="relative flex-1 group h-full flex flex-col justify-end">
                      
                      {/* Tooltip flotante (Aparece en hover) */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 whitespace-nowrap shadow-xl scale-95 group-hover:scale-100">
                        ${(height * 125000).toLocaleString('es-AR')}
                      </div>
                      
                      {/* Pista de fondo de la barra */}
                      <div className="w-full bg-blue-50/50 rounded-t-lg relative overflow-hidden flex-1 max-h-full border-b border-blue-100">
                        {/* Barra de color animada en degradé */}
                        <div
                          className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg transition-all duration-1000 ease-out group-hover:brightness-110"
                          style={{ height: `${height}%` }}
                        ></div>
                      </div>
                      
                      {/* Etiquetas de los meses */}
                      <div className="text-center text-[10px] font-bold text-gray-400 mt-3 uppercase tracking-wider">
                        {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][i]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* VISTA 2: CRM */}
          {activeTab === 'crm' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Base de Clientes (CRM)</h1>
                  <p className="text-gray-500 mt-1">Gestión de relaciones, valor de vida (LTV) y segmentación.</p>
                </div>
                <button className="px-5 py-2.5 bg-gray-900 text-white font-medium rounded-lg shadow-sm hover:bg-black transition-colors">
                  Exportar Datos
                </button>
              </div>

              {/* Tabla CRM */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mt-8">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4">Cliente</th>
                      <th className="px-6 py-4">Contacto</th>
                      <th className="px-6 py-4">Segmento</th>
                      <th className="px-6 py-4">Total Gastado (LTV)</th>
                      <th className="px-6 py-4">Última Compra</th>
                      <th className="px-6 py-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">Ignacio Viale</div>
                        <div className="text-xs text-gray-500 mt-0.5">ID: #CUS-892</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" /> iviale@empresa.com
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                          <Star className="w-3 h-3 fill-current" /> VIP
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">$4.250.000</td>
                      <td className="px-6 py-4 text-gray-500">Hace 2 días</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">Ver Perfil</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">Transportes del Sur SRL</div>
                        <div className="text-xs text-gray-500 mt-0.5">Empresa B2B</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" /> compras@tdsur.com
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                          Corporativo
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">$12.800.000</td>
                      <td className="px-6 py-4 text-gray-500">Suscripción Activa</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">Ver Perfil</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VISTA 3: ABONOS (MRR) */}
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

          {/* VISTA 4: E-COMMERCE */}
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

              {/* Tabla de E-commerce */}
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