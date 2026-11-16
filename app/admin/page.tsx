"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase"; 
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Repeat, 
  Search, 
  Plus, 
  X, 
  UploadCloud,
  Edit2
} from "lucide-react";

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [iniciandoSesion, setIniciandoSesion] = useState(false);

  const [activeTab, setActiveTab] = useState("ecommerce"); 

  // Estados para los Modales
  const [mostrarModal, setMostrarModal] = useState(false);
  const [guardando, setGuardando] = useState(false);
  
  // ID del producto a editar (null si es nuevo)
  const [productoEditando, setProductoEditando] = useState<string | null>(null);
  
  // Estados para el formulario
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("Smartphones");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [especificaciones, setEspecificaciones] = useState("");
  const [destacado, setDestacado] = useState(false);
  
  const [imagenArchivo, setImagenArchivo] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);

  // Lista de productos cargados
  const [productos, setProductos] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        cargarProductos();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        cargarProductos();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIniciandoSesion(true);
    setLoginError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError("Credenciales incorrectas. Verifica tu correo y contraseña.");
    }
    setIniciandoSesion(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const cargarProductos = async () => {
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .order("creado_en", { ascending: false });
    
    if (!error && data) {
      setProductos(data);
    }
  };

  // --- MANEJO DE IMÁGENES CORREGIDO ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagenArchivo(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  // Función para forzar el clic en el input y resetear su valor para evitar bloqueos
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Limpiamos el valor viejo para forzar el onchange siempre
      fileInputRef.current.click();
    }
  };

  const quitarImagenActual = () => {
    setImagenPreview(null);
    setImagenArchivo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const abrirModalEdicion = (prod: any) => {
    setProductoEditando(prod.id);
    setNombre(prod.nombre);
    setCategoria(prod.categoria);
    setPrecio(prod.precio.toString());
    setStock(prod.stock.toString());
    setEspecificaciones(prod.especificaciones || "");
    setDestacado(prod.destacado || false);
    setImagenPreview(prod.imagen_url || null);
    setImagenArchivo(null); 
    setMostrarModal(true);
  };

  const abrirModalCreacion = () => {
    setProductoEditando(null);
    setNombre("");
    setCategoria("Smartphones");
    setPrecio("");
    setStock("");
    setEspecificaciones("");
    setDestacado(false);
    setImagenPreview(null);
    setImagenArchivo(null);
    setMostrarModal(true);
  };

  const guardarProducto = async () => {
    if (!nombre || !precio) {
      alert("Por favor completá el nombre y el precio.");
      return;
    }

    // Si es producto nuevo, exigimos foto. 
    // Si estamos editando y el preview existe, significa que conserva la foto original.
    if (!productoEditando && !imagenArchivo && !imagenPreview) {
       alert("Seleccioná una imagen para el nuevo producto.");
       return;
    }

    setGuardando(true);
    try {
      let imagenUrl = imagenPreview; // Por defecto guarda la url vieja si no se tocó nada

      // Solo si el usuario subió un archivo físico nuevo al input, intentamos subir al bucket
      if (imagenArchivo) {
        const fileExt = imagenArchivo.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `imagenes/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("productos")
          .upload(filePath, imagenArchivo);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("productos")
          .getPublicUrl(filePath);

        imagenUrl = publicUrlData.publicUrl;
      }

      const datosProducto = {
        nombre,
        categoria,
        precio: parseFloat(precio),
        stock: parseInt(stock) || 0,
        especificaciones,
        destacado,
        imagen_url: imagenUrl, // Puede ser la URL pública nueva, la vieja, o null si el usuario apretó "Quitar"
      };

      if (productoEditando) {
        const { error: updateError } = await supabase
          .from("productos")
          .update(datosProducto)
          .eq("id", productoEditando);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("productos")
          .insert([datosProducto]);

        if (insertError) throw insertError;
      }

      setMostrarModal(false);
      cargarProductos();

    } catch (error: any) {
      console.error("Error completo:", error);
      alert("Error al guardar: " + error.message);
    } finally {
      setGuardando(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans">
        <div className="bg-black p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-800">
          <h1 className="text-3xl font-black text-white mb-2 text-center tracking-widest">DADDY</h1>
          <p className="text-gray-400 text-center mb-8 text-sm">FraluX OS - Acceso Restringido</p>
          {loginError && <div className="bg-red-900/50 text-red-200 border border-red-800 p-3 rounded mb-4 text-center text-sm">{loginError}</div>}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-gray-400 text-sm font-medium mb-1 block">Correo Electrónico</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded bg-gray-900 text-white border border-gray-800 focus:border-white focus:outline-none transition-colors" required
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm font-medium mb-1 block">Contraseña</label>
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded bg-gray-900 text-white border border-gray-800 focus:border-white focus:outline-none transition-colors" required
              />
            </div>
            <button type="submit" disabled={iniciandoSesion} className="bg-white text-black font-bold py-3 px-4 rounded mt-4 hover:bg-gray-200 transition-colors">
              {iniciandoSesion ? "Verificando..." : "INGRESAR AL PANEL"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#F8FAFC] text-gray-800 flex font-sans overflow-hidden">
      
      <aside className="w-64 border-r border-gray-200 bg-white flex flex-col shadow-sm">
        <div className="h-20 flex items-center px-8 border-b border-gray-200">
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
            <Repeat className="w-5 h-5" /> Abonos / MRR
          </button>
          
          <button 
            onClick={() => setActiveTab("ecommerce")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'ecommerce' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Package className="w-5 h-5" /> E-commerce
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
           <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 font-medium rounded-lg transition-colors">
              Cerrar Sesión
           </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        
        <header className="h-20 flex items-center justify-between px-10 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-lg w-96 border border-gray-200">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Buscar..." className="bg-transparent border-none outline-none text-sm w-full text-gray-700" />
          </div>
        </header>

        <div className="p-10">
          
          {activeTab === 'ecommerce' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Inventario E-Commerce</h1>
                  <p className="text-gray-500 mt-1">Gestión de productos físicos de DADDY.</p>
                </div>
                <button 
                  onClick={abrirModalCreacion}
                  className="px-5 py-2.5 bg-gray-900 text-white font-medium rounded-lg shadow-sm hover:bg-black transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Nuevo Producto
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mt-8">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4">Producto</th>
                      <th className="px-6 py-4">Categoría</th>
                      <th className="px-6 py-4">Precio</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4 text-center">Destacado</th>
                      <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {productos.map((prod) => (
                      <tr key={prod.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4 font-semibold text-gray-900 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center">
                            {prod.imagen_url ? (
                               <img src={prod.imagen_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                               <span className="text-[10px] text-gray-400 font-mono">Sin foto</span>
                            )}
                          </div> 
                          {prod.nombre}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{prod.categoria}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">${prod.precio.toLocaleString('es-AR')}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${prod.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {prod.stock} U.
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {prod.destacado ? "⭐" : "-"}
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button 
                             onClick={() => abrirModalEdicion(prod)}
                             className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-end gap-1 ml-auto opacity-70 hover:opacity-100 transition-opacity"
                           >
                              <Edit2 className="w-4 h-4" /> Editar
                           </button>
                        </td>
                      </tr>
                    ))}
                    {productos.length === 0 && (
                      <tr><td colSpan={6} className="text-center py-8 text-gray-500">No hay productos cargados.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      {mostrarModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">
                {productoEditando ? "Editar Producto" : "Agregar Nuevo Producto"}
              </h2>
              <button onClick={() => setMostrarModal(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500" placeholder="Ej. iPhone 15 Pro Max" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select value={categoria} onChange={e => setCategoria(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500">
                    <option>Smartphones</option>
                    <option>Seguridad</option>
                    <option>Audio</option>
                    <option>Accesorios</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio ($)</label>
                  <input type="number" value={precio} onChange={e => setPrecio(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500" placeholder="Ej. 1250000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input type="number" value={stock} onChange={e => setStock(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500" placeholder="Ej. 10" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especificaciones cortas</label>
                <input type="text" value={especificaciones} onChange={e => setEspecificaciones(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500" placeholder="Ej. 256GB / Titanio / Chip A17" />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="destacado" checked={destacado} onChange={e => setDestacado(e.target.checked)} className="w-4 h-4 cursor-pointer" />
                <label htmlFor="destacado" className="text-sm font-medium text-gray-700 cursor-pointer">Mostrar en grilla "Destacados" de la Home</label>
              </div>

              {/* SECCIÓN DE IMAGEN CORREGIDA CON TRIGGER SEGURO */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imagen del Producto</label>
                
                {/* Input oculto conectado a fileInputRef */}
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="hidden" 
                />

                {imagenPreview ? (
                  <div className="relative w-full h-48 bg-gray-50 border border-gray-300 rounded-lg p-2 flex flex-col items-center justify-center overflow-hidden group/img">
                    <img src={imagenPreview} alt="Preview" className="h-32 object-contain mb-2" />
                    <div className="flex gap-2 relative z-10">
                      <button 
                        type="button" 
                        onClick={triggerFileInput}
                        className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-md font-medium hover:bg-black transition-colors shadow-sm"
                      >
                        Cambiar foto
                      </button>
                      <button 
                        type="button" 
                        onClick={quitarImagenActual}
                        className="text-xs bg-white text-red-600 border border-red-200 px-3 py-1.5 rounded-md font-medium hover:bg-red-50 transition-colors shadow-sm"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={triggerFileInput}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center justify-center"
                  >
                    <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Hacé clic para seleccionar una foto</span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG o WebP</span>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setMostrarModal(false)} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors">Cancelar</button>
              <button 
                onClick={guardarProducto} 
                disabled={guardando}
                className="px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-colors disabled:opacity-50"
              >
                {guardando ? "Guardando..." : (productoEditando ? "Actualizar Producto" : "Guardar Producto")}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}