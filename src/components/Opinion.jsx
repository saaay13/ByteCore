import { useState, useEffect } from "react";
import { supabase } from "../supabase"; // Asegúrate de que esta ruta sea correcta

export default function Opiniones({ productoNombre, productoId }) {
  const [opiniones, setOpiniones] = useState([]);
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(5);
  const [mensaje, setMensaje] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Obtener opiniones de la base de datos
  useEffect(() => {
    const fetchOpiniones = async () => {
      const { data, error } = await supabase
        .from("opiniones")
        .select("comentario, calificacion, creado_en, perfil_id")
        .eq("producto_id", productoId);

      if (error) {
        console.error("Error al obtener opiniones:", error.message);
      } else {
        setOpiniones(data);
      }
    };

    fetchOpiniones();
  }, [productoId]);

  // Función para guardar la opinión
  const handleGuardarOpinion = async () => {
    if (!comentario) {
      setMensaje("Por favor, ingresa un comentario.");
      return;
    }

    const { user } = supabase.auth.session();
    if (!user) {
      setMensaje("Por favor, inicia sesión para dejar una opinión.");
      return;
    }

    setIsSubmitting(true);

    // Insertar la opinión en la base de datos
    try {
      const { data, error } = await supabase
        .from("opiniones")
        .insert([{
          producto_id: productoId,
          perfil_id: user.id, // El perfil_id corresponde al ID del usuario autenticado
          comentario,
          calificacion,
        }]);

      if (error) throw error;

      // Actualizar el estado con la nueva opinión
      setMensaje("¡Tu opinión ha sido enviada con éxito!");
      setComentario(""); // Limpiar comentario
      setCalificacion(5); // Restablecer calificación
      setOpiniones([...opiniones, { comentario, calificacion, perfil_id: user.id, creado_en: new Date().toISOString() }]); // Agregar nueva opinión
    } catch (error) {
      setMensaje("Error al guardar la opinión: " + error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-[#22c55e]">Deja una opinión sobre {productoNombre}</h3>

      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Escribe tu comentario..."
        className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
        rows="4"
      />

      <div className="mt-4">
        <label className="text-lg text-gray-400">Calificación:</label>
        <div className="flex gap-2">
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCalificacion(index + 1)}
              className={`text-2xl ${calificacion > index ? "text-yellow-400" : "text-gray-400"}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleGuardarOpinion}
        disabled={isSubmitting}
        className={`mt-4 w-full py-2 bg-[#22c55e] text-white font-semibold rounded hover:bg-[#1faa52] transition ${isSubmitting ? "opacity-50" : ""}`}
      >
        {isSubmitting ? "Enviando..." : "Guardar Opinión"}
      </button>

      {mensaje && <p className="mt-2 text-gray-300">{mensaje}</p>}

      <div>
        <h4 className="text-xl font-semibold text-[#22c55e]">Opiniones anteriores:</h4>
        {opiniones.length === 0 ? (
          <p className="text-gray-400 text-sm">No hay opiniones aún.</p>
        ) : (
          opiniones.map((opinion, index) => (
            <div key={index} className="border-b border-gray-700 pb-4 mb-4">
              <p className="text-lg">{opinion.comentario}</p>
              <span className="text-yellow-400">{"★".repeat(opinion.calificacion)}</span>
              <p className="text-sm text-gray-400">{new Date(opinion.creado_en).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
