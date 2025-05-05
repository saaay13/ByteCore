import { useEffect, useState } from "react";
import { FiSmile } from "react-icons/fi";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [productosPorCategoria, setProductosPorCategoria] = useState({});
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Obtener productos de la base de datos
    const fetchProductos = async () => {
      const { data, error } = await supabase.from("productos").select("*");

      if (error) {
        console.error("Error al obtener productos:", error); // Error al obtener productos
      } else {
        // Agrupar productos por categoría
        const agrupados = data.reduce((acc, producto) => {
          const categoria = producto.categoria || "Sin categoría"; // Si no tiene categoría, se asigna "Sin categoría"
          if (!acc[categoria]) acc[categoria] = []; // Crear arreglo si no existe
          acc[categoria].push(producto); // Añadir producto a la categoría
          return acc;
        }, {});
        setProductosPorCategoria(agrupados); // Actualizar estado con productos agrupados
      }
    };

    // Obtener datos del usuario actual
    const getUsuario = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) setUsuario(data.user); // Guardar datos del usuario en el estado
    };

    fetchProductos(); // Llamar a la función que obtiene los productos
    getUsuario(); // Llamar a la función que obtiene los datos del usuario
  }, []); // Efecto solo al montar el componente

  return (
    <div className="min-h-screen bg-[#1F1D2B] text-gray-300 p-6 flex flex-col items-center">
      {/* Bienvenida: Imagen de fondo y mensaje de bienvenida */}
      <div
        className="relative w-full max-w-5xl rounded-xl overflow-hidden shadow-lg border border-gray-700"
        style={{
          backgroundImage: "url('/img/fondo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 p-20 text-center">
          <FiSmile className="text-[#22c55e] text-6xl mb-6 animate-bounce" />
          <h1 className="text-5xl font-bold text-gray-100 mb-4">¡Bienvenido a ByteCore!</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Has iniciado sesión correctamente. Explora los productos disponibles organizados por categoría y accede a todas las funcionalidades de la plataforma.
          </p>
        </div>
      </div>

      {/* Botón Agregar Producto: Mostrar solo para un usuario específico */}
      {usuario?.email === "77875506s@gmail.com" && (
        <div className="mt-8 text-center">
          <Link
            to="/agregar"
            className="inline-block bg-[#22c55e] text-white font-bold py-2 px-6 rounded-full hover:bg-green-600 transition"
          >
            Agregar Producto
          </Link>
        </div>
      )}

      {/* Mostrar productos por categoría: Agrupación de productos */}
      <div className="mt-16 w-full px-4 space-y-20">
        {Object.entries(productosPorCategoria).map(([categoria, productos]) => (
          <div key={categoria} className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">{categoria}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
              {productos.map((producto) => (
                <div
                  key={producto.id}
                  className="bg-[#2D2B3A] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 w-72"
                >
                  <Link to={`/producto/${producto.id}`} className="block">
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
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
