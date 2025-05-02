import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function ParticipantesList() {
  const [participantes, setParticipantes] = useState([]);

  useEffect(() => {
    fetchParticipantes();
  }, []);

  const fetchParticipantes = async () => {
    const { data, error } = await supabase
      .from("participantes")
      .select(`
        id,
        nombre,
        ci,
        correo,
        created_at,
        carreras (
          id,
          nombre
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al obtener participantes:", error.message);
    } else {
      setParticipantes(data);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-[#22c55e] mb-6 text-center">Listado de Participantes</h2>

      <div className="grid gap-4">
        {participantes.length > 0 ? (
          participantes.map((p) => (
            <div
              key={p.id}
              className="bg-[#2D2B3A] border border-gray-700 p-5 rounded-xl text-gray-100 shadow-lg hover:border-green-500 transition"
            >
              <h3 className="text-lg font-bold text-white">{p.nombre}</h3>
              <p><span className="font-semibold text-gray-400">CI:</span> {p.ci}</p>
              <p><span className="font-semibold text-gray-400">Correo:</span> {p.correo || "No proporcionado"}</p>
              <p><span className="font-semibold text-gray-400">Carrera:</span> {p.carreras?.nombre || "Sin asignar"}</p>
              <p className="text-sm text-gray-500 mt-2">
                Registrado: {new Date(p.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-300">No hay participantes registrados.</p>
        )}
      </div>
    </div>
  );
}
