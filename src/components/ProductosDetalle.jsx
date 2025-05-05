import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabase";
import Opiniones from "./Opinion";
import { FiArrowRight } from "react-icons/fi";

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [relacionados, setRelacionados] = useState([]);
  const [cantidadesRelacionadas, setCantidadesRelacionadas] = useState({});
  const [mensajeAgregado, setMensajeAgregado] = useState(false); // ✅ nuevo estado

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
          .select("id, nombre, imagen_url, precio, stock")
          .eq("categoria", producto.categoria)
          .neq("id", producto.id)
          .limit(4);

        if (error) {
          console.error("Error al obtener productos relacionados:", error.message);
        } else {
          setRelacionados(data);
          const cantidadesIniciales = data.reduce((acc, item) => {
            acc[item.id] = 1;
            return acc;
          }, {});
          setCantidadesRelacionadas(cantidadesIniciales);
        }
      }
    };

    fetchRelacionados();
  }, [producto]);

  const agregarAlCarrito = () => {
    const item = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad,
      total: (producto.precio * cantidad).toFixed(2),
      stock: producto.stock,
      imagen_url: producto.imagen_url,
    };

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex((item) => item.id === producto.id);

    if (index !== -1) {
      carrito[index].cantidad += cantidad;
    } else {
      carrito.push(item);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // ✅ Mostrar mensaje temporal
    setMensajeAgregado(true);
    setTimeout(() => setMensajeAgregado(false), 2500);
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
                alt={`${producto.nombre}`}
                className="w-full rounded-lg shadow-xl object-cover"
              />
            )}
            {producto.imagen2_url && (
              <img
                src={producto.imagen2_url}
                alt={`${producto.nombre} secundaria`}
                className="w-full mt-4 rounded-lg shadow-xl object-cover"
              />
            )}
          </div>

          <div className="flex-1 space-y-4">
            <p className="text-xl">
              <span className="font-semibold text-gray-400">Precio unitario: </span>
              <span className="text-green-400 font-bold text-2xl">${producto.precio}</span>
            </p>
            <p className="text-lg text-gray-400">Stock disponible: {producto.stock}</p>
            <p className="text-lg text-gray-400">Categoría: {producto.categoria}</p>
            <p className="text-lg text-gray-300 whitespace-pre-wrap">{producto.descripcion}</p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <label className="text-lg text-gray-400" htmlFor="cantidad">Cantidad:</label>
                <input
                  id="cantidad"
                  type="number"
                  min="1"
                  max={producto.stock}
                  value={cantidad}
                  onChange={(e) =>
                    setCantidad(Math.max(1, Math.min(producto.stock, parseInt(e.target.value) || 1)))
                  }
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

              {/* ✅ Mostrar mensaje temporal debajo del botón */}
              {mensajeAgregado && (
                <p className="text-green-400 mt-2 animate-fade-in">
                  Producto agregado al carrito.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Relacionados */}
      <div className="md:col-span-1 space-y-4">
        <h3 className="text-2xl font-semibold text-[#22c55e] border-b border-gray-700 pb-2">Relacionados</h3>
        {relacionados.length === 0 ? (
          <p className="text-gray-400 text-sm">No hay productos relacionados.</p>
        ) : (
          relacionados.map((rel) => (
            <Link
              key={rel.id}
              to={`/producto/${rel.id}`}
              className="flex items-center gap-5 p-4 border border-gray-700 rounded-md hover:translate-x-1 transition-transform duration-200"
            >
              {rel.imagen_url && (
                <img
                  src={rel.imagen_url}
                  alt={rel.nombre}
                  className="w-20 h-20 object-cover rounded-md border border-gray-600"
                />
              )}
              <div>
                <p className="text-white font-semibold">{rel.nombre}</p>
                <p className="text-gray-400 text-sm">${rel.precio?.toFixed(2)}</p>
              </div>
              <FiArrowRight className="text-gray-500 text-xl" />
            </Link>
          ))
        )}
      </div>

      {/* Opiniones */}
      <div className="md:col-span-4">
        <h3 className="text-2xl font-semibold text-[#22c55e] border-b border-gray-700 pb-2">Opiniones</h3>
        <Opiniones productoId={producto.id} productoNombre={producto.nombre} />
      </div>
    </div>
  );
}
