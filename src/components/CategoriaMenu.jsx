import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import ProductosList from "./ProductosList";

export default function CategoriaMenu() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    const { data, error } = await supabase
      .from("productos")
      .select("categoria");

    if (error) {
      console.error("Error al obtener categorías:", error.message);
    } else {
      const unicas = [...new Set(data.map((item) => item.categoria).filter(Boolean))];
      setCategorias(["Todas", ...unicas]);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Productos</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            className={`px-4 py-2 rounded-full ${
              categoriaActiva === cat
                ? "bg-blue-600 text-white"
                : "bg-[#2d2d44] text-white hover:bg-[#3b3b5c]"
            } transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <ProductosList categoria={categoriaActiva} />
      </div>
    </div>
  );
}
