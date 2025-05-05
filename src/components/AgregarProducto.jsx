import { useState } from "react";
import { supabase } from "../supabase";

export default function AgregarProducto() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    imagen_url: "",
    imagen2_url: "", 
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("productos").insert([formulario]);

    if (error) {
      setMensaje("❌ Error al agregar producto.");
      console.error(error);
    } else {
      setMensaje("✅ Producto agregado correctamente.");
      setFormulario({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        categoria: "",
        imagen_url: "",
        imagen2_url: "", 
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#1F1D2B] text-gray-300 p-6 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-[#2D2B3A] p-8 rounded-lg shadow-lg w-full max-w-xl space-y-4">
        <h2 className="text-2xl font-bold text-white text-center">Agregar Nuevo Producto</h2>

        {["nombre", "descripcion", "precio", "stock", "categoria", "imagen_url", "imagen2_url"].map((campo) => (
          <input
            key={campo}
            type={campo === "precio" || campo === "stock" ? "number" : "text"}
            name={campo}
            value={formulario[campo]}
            onChange={handleChange}
            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1).replace("_", " ")}
            className="w-full p-2 bg-[#1F1D2B] border border-gray-600 rounded text-white"
            required={campo !== "descripcion"}
            step={campo === "precio" ? "0.01" : undefined}
          />
        ))}

        <button
          type="submit"
          className="w-full bg-[#22c55e] text-white py-2 rounded hover:bg-green-600 transition"
        >
          Agregar Producto
        </button>

        {mensaje && <p className="text-center mt-2 text-sm">{mensaje}</p>}
      </form>
    </div>
  );
}
