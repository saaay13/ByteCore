import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase"; // Asegúrate de que esta ruta sea correcta
import Opiniones from "./Opinion"; // Asegúrate de que la ruta sea correcta

export default function ProductoDetalle() {
  const { id } = useParams(); // Obtienes el ID del producto desde la URL
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [relacionados, setRelacionados] = useState([]);

  useEffect(() => {
    const fetchProducto = async () => {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error al obtener producto:", error.message);
      } else {
        setProducto(data);
      }
    };

    fetchProducto();
  }, [id]);

  useEffect(() => {
    const fetchRelacionados = async () => {
      if (producto?.categoria) {
        const { data, error } = await supabase
          .from("productos")
          .select("id, nombre, imagen_url")
          .eq("categoria", producto.categoria)
          .neq("id", producto.id)
          .limit(4);

        if (error) {
          console.error("Error al obtener productos relacionados:", error.message);
        } else {
          setRelacionados(data);
        }
      }
    };

    fetchRelacionados();
  }, [producto]);

  const handleCantidadChange = (e) => {
    const val = Math.max(1, Math.min(producto.stock, parseInt(e.target.value) || 1));
    setCantidad(val);
  };

  const agregarAlCarrito = () => {
    const item = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad,
      total: (producto.precio * cantidad).toFixed(2),
    };
    console.log("Agregado al carrito:", item);
    alert("Producto agregado al carrito.");
  };

  if (!producto) {
    return <p className="text-white p-6">Cargando...</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto text-white grid md:grid-cols-4 gap-8">
      <div className="md:col-span-3">
        <h2 className="text-4xl font-bold mb-6 text-center text-[#22c55e]">
          {producto.nombre}
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {producto.imagen_url && (
              <img
                src={producto.imagen_url}
                alt={`${producto.nombre} - Imagen principal`}
                className="w-full rounded-lg shadow-lg object-cover"
              />
            )}
          </div>

          <div className="flex-1 space-y-4">
            <p className="text-xl">
              <span className="font-semibold text-gray-400">Precio unitario: </span>
              <span className="text-green-400 font-bold text-2xl">
                ${producto.precio}
              </span>
            </p>

            <p className="text-lg">
              <span className="font-semibold text-gray-400">Stock disponible: </span>
              {producto.stock}
            </p>

            <p className="text-lg">
              <span className="font-semibold text-gray-400">Categoría: </span>
              {producto.categoria || "Sin categoría"}
            </p>

            <p className="text-lg text-gray-300 whitespace-pre-wrap">
              {producto.descripcion || "Sin descripción disponible."}
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <label className="text-lg text-gray-400" htmlFor="cantidad">Cantidad:</label>
                <input
                  id="cantidad"
                  type="number"
                  min="1"
                  max={producto.stock}
                  value={cantidad}
                  onChange={handleCantidadChange}
                  className="w-20 p-1 rounded bg-gray-800 border border-gray-600 text-center"
                />
              </div>

              <p className="text-xl text-gray-300">
                <span className="font-semibold">Total:</span>{" "}
                <span className="text-green-400 font-bold text-2xl">
                  ${(producto.precio * cantidad).toFixed(2)}
                </span>
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={agregarAlCarrito}
                className="bg-[#22c55e] text-black font-semibold px-4 py-2 rounded hover:bg-[#1faa52] transition"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-1 space-y-4">
        <h3 className="text-2xl font-semibold text-[#22c55e] border-b border-gray-700 pb-2">
          Relacionados
        </h3>
        {relacionados.length === 0 ? (
          <p className="text-gray-400 text-sm">No hay productos relacionados.</p>
        ) : (
          relacionados.map((rel) => (
            <div key={rel.id} className="block bg-gray-800 rounded-lg overflow-hidden">
              {rel.imagen_url && (
                <img
                  src={rel.imagen_url}
                  alt={rel.nombre}
                  className="w-full h-32 object-cover"
                />
              )}
              <div className="p-2">
                <p className="text-white font-medium truncate">{rel.nombre}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="md:col-span-1 mt-8">
        <h3 className="text-2xl font-semibold text-[#22c55e] border-b border-gray-700 pb-2">
          Opiniones
        </h3>
        <Opiniones productoId={producto.id} productoNombre={producto.nombre} />
      </div>
    </div>
  );
}
