
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
      <h2 className="text-2xl font-bold mb-4 text-center">Listado de Participantes</h2>
      <div className="grid gap-4">
        {participantes.length > 0 ? (
          participantes.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold">{p.nombre}</h3>
              <p><strong>CI:</strong> {p.ci}</p>
              <p><strong>Correo:</strong> {p.correo || "No proporcionado"}</p>
              <p><strong>Carrera:</strong> {p.carreras?.nombre || "Sin asignar"}</p>
              <p className="text-sm text-gray-500">
                Registrado: {new Date(p.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center">No hay participantes registrados.</p>
        )}
      </div>
    </div>
  );
}