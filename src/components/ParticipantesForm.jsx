
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

  // Cargar carreras desde Supabase
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

    const { _, error } = await supabase//_ cambio de data
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
      setMensaje({ tipo: "error", texto: "Error al registrar participante." });
    } else {
      setMensaje({ tipo: "exito", texto: "Participante registrado correctamente." });
      setFormData({ nombre: "", ci: "", correo: "", carrera_id: "" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white  p-6 rounded-lg shadow-lg mt-8">
      <h1 className="text-2xl font-bold  mb-6 text-center">Registrar Participante</h1>

      {mensaje && (
        <div className={`mb-4 p-3 rounded ${mensaje.tipo === "error" ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"}`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="ci"
          placeholder="Cédula de Identidad"
          value={formData.ci}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico (opcional)"
          value={formData.correo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="carrera_id"
          value={formData.carrera_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Selecciona una carrera --</option>
          {carreras.map((carrera) => (
            <option key={carrera.id} value={carrera.id}>
              {carrera.nombre}
            </option>
          ))}
        </select>

        <button type="submit" className="w-full bg-green-900 text-white p-2 rounded hover:bg-green-800">
          Registrar Participante
        </button>
      </form>
    </div>
  );
}