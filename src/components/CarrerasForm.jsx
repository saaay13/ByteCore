import { useState } from "react";
import { supabase } from "../supabase";

export default function CarrerasForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    fecha: "",
    kilometros: "",
    inicio: "",
    llegada: "",
    slogan: "",
    descripcion: ""
  });

  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("carreras").insert([
      {
        nombre: formData.nombre,
        fecha: formData.fecha,
        kilometros: parseFloat(formData.kilometros),
        inicio: formData.inicio,
        llegada: formData.llegada,
        slogan: formData.slogan,
        descripcion: formData.descripcion,
      }
    ]);

    if (error) {
      console.error("Error al registrar carrera:", error.message);
      setMensaje({ tipo: "error", texto: "❌ Error al registrar la carrera. Intente nuevamente." });
    } else {
      setMensaje({ tipo: "exito", texto: "✅ Carrera registrada exitosamente." });
      setFormData({
        nombre: "",
        fecha: "",
        kilometros: "",
        inicio: "",
        llegada: "",
        slogan: "",
        descripcion: ""
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-[#2A2A3D] text-white p-6 rounded-xl shadow-xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-green-400">Registrar Carrera</h1>

      {mensaje && (
        <div className={`mb-4 p-3 rounded text-sm font-medium ${mensaje.tipo === "error" ? "bg-red-600 text-white" : "bg-green-700 text-white"}`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la carrera"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full p-3 bg-[#1F1F2E] border border-gray-600 rounded outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          className="w-full p-3 bg-[#1F1F2E] border border-gray-600 rounded outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="number"
          name="kilometros"
          placeholder="Kilómetros del recorrido"
          value={formData.kilometros}
          onChange={handleChange}
          step="0.01"
          className="w-full p-3 bg-[#1F1F2E] border border-gray-600 rounded outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="text"
          name="inicio"
          placeholder="Lugar de inicio"
          value={formData.inicio}
          onChange={handleChange}
          className="w-full p-3 bg-[#1F1F2E] border border-gray-600 rounded"
        />

        <input
          type="text"
          name="llegada"
          placeholder="Lugar de llegada"
          value={formData.llegada}
          onChange={handleChange}
          className="w-full p-3 bg-[#1F1F2E] border border-gray-600 rounded"
        />

        <input
          type="text"
          name="slogan"
          placeholder="Slogan"
          value={formData.slogan}
          onChange={handleChange}
          className="w-full p-3 bg-[#1F1F2E] border border-gray-600 rounded"
        />

        <textarea
          name="descripcion"
          placeholder="Descripción de la carrera"
          value={formData.descripcion}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 bg-[#1F1F2E] border border-gray-600 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition"
        >
          Registrar Carrera
        </button>
      </form>
    </div>
  );
}
