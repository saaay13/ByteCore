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

  const generarReporte = async () => {
    try {
      const { data, error } = await supabase
        .from('historial_compras')
        .select('id, nombre_completo, telefono, direccion, tipo_entrega, metodo_pago, productos, total, fecha')
        .order('fecha', { ascending: false });

      if (error) {
        throw new Error('Error al obtener el historial de compras');
      }

      let reporte = 'Historial de Compras\n\n';
      data.forEach((compra) => {
        reporte += `Nombre: ${compra.nombre_completo}\n`;
        reporte += `Teléfono: ${compra.telefono}\n`;
        reporte += `Dirección: ${compra.direccion}\n`;
        reporte += `Tipo de Entrega: ${compra.tipo_entrega}\n`;
        reporte += `Método de Pago: ${compra.metodo_pago}\n`;
        reporte += `Total: $${compra.total}\n`;
        reporte += `Fecha: ${new Date(compra.fecha).toLocaleDateString()}\n`;
        reporte += '\n---\n';
      });

      const blob = new Blob([reporte], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'reporte_historial_compras.txt';
      link.click();
    } catch (error) {
      console.error('Error generando el reporte:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1F1D2B] text-gray-300 p-6 flex flex-col items-center">
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

      {usuario?.email === "77875506s@gmail.com" && (
        <>
          <div className="mt-8 text-center">
            <Link
              to="/agregar"
              className="inline-block bg-[#22c55e] text-white font-bold py-2 px-6 rounded-full hover:bg-green-600 transition"
            >
              Agregar Producto
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/reporte" // Esta es la ruta donde se encuentra el archivo Reporte.jsx
              className="inline-block bg-yellow-500 text-white font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition"
            >
              Generar Reporte
            </Link>
          </div>
        </>
      )}

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