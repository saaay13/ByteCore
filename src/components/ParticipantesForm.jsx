import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function ParticipantesForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    ci: "",
    correo: "",
    carrera_id: ""
  });

  const [carreras, setCarreras] = useState([]);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    fetchCarreras();
  }, []);

  const fetchCarreras = async () => {
    const { data, error } = await supabase
      .from("carreras")
      .select("id, nombre")
      .order("fecha", { ascending: true });

    if (error) {
      console.error("Error al cargar carreras:", error.message);
    } else {
      setCarreras(data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { _, error } = await supabase
      .from("participantes")
      .insert([
        {
          nombre: formData.nombre,
          ci: formData.ci,
          correo: formData.correo,
          carrera_id: formData.carrera_id
        }
      ]);

    if (error) {
      console.error("Error al registrar participante:", error.message);
      setMensaje({ tipo: "error", texto: "❌ Error al registrar participante." });
    } else {
      setMensaje({ tipo: "exito", texto: "✅ Participante registrado correctamente." });
      setFormData({ nombre: "", ci: "", correo: "", carrera_id: "" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#1F1D2B] p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-[#22c55e] mb-4 text-center">Registrar Participante</h2>

      {mensaje && (
        <div
          className={`mb-4 p-3 rounded text-sm font-medium ${
            mensaje.tipo === "error" ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"
          }`}
        >
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-gray-200">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-[#2D2B3A] border border-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#22c55e]"
        />

        <input
          type="text"
          name="ci"
          placeholder="Cédula de Identidad"
          value={formData.ci}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-[#2D2B3A] border border-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#22c55e]"
        />

        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico (opcional)"
          value={formData.correo}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-[#2D2B3A] border border-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#22c55e]"
        />

        <select
          name="carrera_id"
          value={formData.carrera_id}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-[#2D2B3A] border border-gray-700 text-gray-300 outline-none focus:ring-2 focus:ring-[#22c55e]"
        >
          <option value="">-- Selecciona una carrera --</option>
          {carreras.map((carrera) => (
            <option key={carrera.id} value={carrera.id}>
              {carrera.nombre}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full py-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold rounded-lg transition duration-300"
        >
          Registrar Participante
        </button>
      </form>
    </div>
  );
}
