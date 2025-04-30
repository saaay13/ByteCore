
import { useState } from "react";
import { supabase } from "../supabase";

export default function DonacionesForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    monto: ""
  });

  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { _, error } = await supabase
      .from("donaciones")
      .insert([
        {
          nombre: formData.nombre,
          monto: parseFloat(formData.monto)
        }
      ]);

    if (error) {
      console.error("Error al registrar donación:", error.message);
      setMensaje({ tipo: "error", texto: "Hubo un error al registrar la donación." });
    } else {
      setMensaje({ tipo: "exito", texto: "¡Donación registrada con éxito!" });
      setFormData({ nombre: "", monto: "" });
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Registrar Donación</h1>

      {mensaje && (
        <div className={`mb-4 p-3 rounded ${mensaje.tipo === "error" ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"}`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del donante"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="monto"
          placeholder="Monto donado (Bs)"
          value={formData.monto}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          step="0.01"
          required
        />

        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-800">
          Guardar Donación
        </button>
      </form>
    </div>
  );
}