import { useEffect, useState } from "react";
import { FiSmile } from "react-icons/fi";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [productosPorCategoria, setProductosPorCategoria] = useState({});
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase.from("productos").select("*");

      if (error) {
        console.error("Error al obtener productos:", error);
      } else {
        const agrupados = data.reduce((acc, producto) => {
          const categoria = producto.categoria || "Sin categoría";
          if (!acc[categoria]) acc[categoria] = [];
          acc[categoria].push(producto);
          return acc;
        }, {});
        setProductosPorCategoria(agrupados);
      }
    };

    const getUsuario = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) setUsuario(data.user);
    };

    fetchProductos();
    getUsuario();
  }, []);

  return (
    <div className="min-h-screen bg-[#1F1D2B] text-gray-300 p-6 flex flex-col items-center">
      {/* Bienvenida */}
      <div className="bg-[#2D2B3A] shadow-xl rounded-2xl p-10 w-full max-w-3xl text-center border border-gray-700">
        <FiSmile className="text-[#22c55e] text-6xl mb-4 animate-bounce" />
        <h1 className="text-4xl font-extrabold text-white mb-4">
          ¡Bienvenido al ByteCore!
        </h1>
        <p className="text-gray-400 text-lg">
          Has iniciado sesión correctamente. Aquí puedes ver productos por categoría y acceder a otras funcionalidades.
        </p>
      </div>

      {/* Botón solo para el usuario autorizado */}
      {usuario?.email === "77875506s@gmail.com" && (
        <div className="mt-8 mb-4 flex justify-center">
          <Link
            to="/agregar"
            className="bg-[#22c55e] text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            ➕ Agregar Producto
          </Link>
        </div>
      )}

      {/* Mostrar productos por categoría */}
      <div className="mt-16 w-full px-4 space-y-20">
        {Object.entries(productosPorCategoria).map(([categoria, productos]) => (
          <div key={categoria} className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">{categoria}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
              {productos.map((producto) => (
                <div key={producto.id} className="bg-[#2D2B3A] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition w-72">
                  <div className="w-full h-40 flex items-center justify-center bg-[#1F1D2B] rounded-md">
                    <img
                      src={producto.imagen_url}
                      alt={producto.nombre}
                      className="max-h-full object-contain"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold text-white">{producto.nombre}</h3>
                    <p className="text-lg font-bold text-[#22c55e] mt-2">${producto.precio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
