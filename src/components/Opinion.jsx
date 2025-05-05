import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabase";

export default function Opiniones({ productoNombre, productoId }) {
  const [opiniones, setOpiniones] = useState([]);
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(5);
  const [mensaje, setMensaje] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usuarioCorreo, setUsuarioCorreo] = useState("");
  const textareaRef = useRef(null);

  // Obtener email del usuario logueado
  useEffect(() => {
    const obtenerUsuario = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setUsuarioCorreo(user.email);
      }
    };
    obtenerUsuario();
  }, []);

  // Obtener opiniones del producto
  useEffect(() => {
    const fetchOpiniones = async () => {
      const { data, error } = await supabase
        .from("opiniones")
        .select("comentario, calificacion, creado_en")  // Seleccionamos solo comentario, calificación y fecha de creación
        .eq("producto_id", productoId)  // Filtramos por producto_id
        .order("creado_en", { ascending: false });  // Ordenamos las opiniones de más recientes a más antiguas
    
      if (error) {
        console.error("Error al obtener opiniones:", error.message);
      } else {
        setOpiniones(data);  // Actualizamos el estado con las opiniones
      }
    };

    fetchOpiniones();
  }, [productoId]);

  // Expandir textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [comentario]);

  // Guardar opinión
  const handleGuardarOpinion = async () => {
    if (!comentario.trim()) {
      setMensaje("Por favor, ingresa un comentario.");
      return;
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      setMensaje("Por favor, inicia sesión para dejar una opinión.");
      return;
    }

    setIsSubmitting(true);

    const { data: perfil, error: perfilError } = await supabase
      .from("perfiles")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (perfilError) {
      setMensaje("No se encontró el perfil del usuario.");
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from("opiniones").insert([
      {
        producto_id: productoId,
        perfil_id: perfil.id,
        comentario,
        calificacion,
      },
    ]);

    if (error) {
      setMensaje("Error al guardar la opinión: " + error.message);
    } else {
      setMensaje("¡Tu opinión ha sido enviada con éxito!");
      setComentario("");
      setCalificacion(5);
      // Recargar opiniones
      const { data: nuevasOpiniones } = await supabase
        .from("opiniones")
        .select("comentario, calificacion, creado_en")  // Seleccionamos solo comentario, calificación y fecha de creación
        .eq("producto_id", productoId)
        .order("creado_en", { ascending: false });

      setOpiniones(nuevasOpiniones || []);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-[#22c55e]">
        Deja una opinión sobre {productoNombre}
      </h3>

      {usuarioCorreo && (
        <p className="text-gray-400 text-sm mb-1">
          Escribes como: <span className="text-white">{usuarioCorreo}</span>
        </p>
      )}

      <textarea
        ref={textareaRef}
        value={comentario}
        onChange={(e) => {
          if (e.target.value.length <= 500) setComentario(e.target.value);
        }}
        placeholder="Escribe tu comentario..."
        className="w-full resize-none p-2 border border-gray-600 rounded bg-gray-800 text-white"
        rows={1}
      />

      <div className="text-right text-xs text-gray-500">
        {comentario.length}/500
      </div>

      <div className="mt-4">
        <label className="text-lg text-gray-400">Calificación:</label>
        <div className="flex gap-2">
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCalificacion(index + 1)}
              className={`text-2xl ${
                calificacion > index ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleGuardarOpinion}
        disabled={isSubmitting}
        className={`mt-4 w-full py-2 bg-[#22c55e] text-white font-semibold rounded hover:bg-[#1faa52] transition ${
          isSubmitting ? "opacity-50" : ""
        }`}
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
              <div className="text-yellow-400 text-sm">
                {"★".repeat(opinion.calificacion)}
              </div>
              <p className="text-sm text-gray-400">
                {new Date(opinion.creado_en).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
