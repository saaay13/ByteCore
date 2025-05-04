import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function ProductosList({ categoria }) {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

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

  const irADetalle = (id) => {
    navigate(`/producto/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {productos.map((producto) => (
        <div
          key={producto.id}
          onClick={() => irADetalle(producto.id)}
          className="bg-[#1e1e2e] p-4 rounded-lg text-white transition transform hover:scale-105 hover:shadow-xl cursor-pointer"
        >
          {producto.imagen_url ? (
            <img
              src={producto.imagen_url}
              alt={producto.nombre}
              className="w-full h-40 object-cover rounded mb-2"
            />
          ) : (
            <div className="w-full h-40 bg-gray-700 rounded mb-2" />
          )}

          <h3 className="text-xl font-semibold">{producto.nombre}</h3>
          <p className="text-green-400 font-semibold mb-1">${producto.precio}</p>
          <p className="text-sm text-gray-400">Stock: {producto.stock}</p>
        </div>
      ))}
    </div>
  );
}
