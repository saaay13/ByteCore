import { useState } from "react";
import { supabase } from "../supabase"; // Ajusta la ruta si es necesario

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

    // Intentar insertar en Supabase
    const { data, error } = await supabase
      .from("carreras")
      .insert([
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
      setMensaje({ tipo: "error", texto: "Error al registrar la carrera. Intente nuevamente." });
    } else {
      console.log("Carrera registrada:", data);
      setMensaje({ tipo: "exito", texto: "Carrera registrada exitosamente." });
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
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Registrar Carrera</h1>

      {mensaje && (
        <div className={`mb-4 p-3 rounded ${mensaje.tipo === "error" ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"}`}>
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
          className="w-full p-2 border rounded"
          required
        />
        
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        
        <input
          type="number"
          name="kilometros"
          placeholder="Kilómetros del recorrido"
          value={formData.kilometros}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          step="0.01"
          required
        />

        <input
          type="text"
          name="inicio"
          placeholder="Lugar de inicio"
          value={formData.inicio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="llegada"
          placeholder="Lugar de llegada"
          value={formData.llegada}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="slogan"
          placeholder="Slogan"
          value={formData.slogan}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="descripcion"
          placeholder="Descripción de la carrera"
          value={formData.descripcion}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="4"
        ></textarea>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
          Registrar Carrera
        </button>
      </form>
    </div>
  );
}
