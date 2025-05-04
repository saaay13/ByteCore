import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function ProductosList({ categoria }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, [categoria]);

  const fetchProductos = async () => {
    let query = supabase.from("productos").select("*");

    if (categoria !== "Todas") {
      query = query.eq("categoria", categoria);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error al obtener productos:", error.message);
    } else {
      setProductos(data);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {productos.map((producto) => (
        <div key={producto.id} className="bg-[#1e1e2e] p-4 rounded-lg text-white">
          <div className="w-full h-40 bg-gray-700 rounded mb-2" />
          <p className="text-lg">{producto.nombre}</p>
          <p className="text-green-400 font-semibold">${producto.precio}</p>
        </div>
      ))}

      {/* Mostrar casillas vacías si no hay productos (como en tu imagen) */}
      {productos.length === 0 &&
        Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#1e1e2e] p-4 rounded-lg border border-gray-600 text-white flex flex-col items-center justify-center h-40"
          >
            <div className="w-20 h-20 bg-gray-700 mb-2" />
            <p>$</p>
          </div>
        ))}
    </div>
  );
}
