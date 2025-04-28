import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function CarrerasList() {
  const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    fetchCarreras();
  }, []);

  const fetchCarreras = async () => {
    const { data, error } = await supabase
      .from("carreras")
      .select("*")
      .order("fecha", { ascending: true });

    if (error) {
      console.error("Error al traer las carreras:", error.message);
    } else {
      setCarreras(data);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Listado de Carreras</h2>
      <div className="grid gap-4">
        {carreras.length > 0 ? (
          carreras.map((carrera) => (
            <div key={carrera.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold">{carrera.nombre}</h3>
              <p><strong>Fecha:</strong> {carrera.fecha}</p>
              <p><strong>Kilómetros:</strong> {carrera.kilometros} km</p>
              <p><strong>Inicio:</strong> {carrera.inicio}</p>
              <p><strong>Llegada:</strong> {carrera.llegada}</p>
              <p><strong>Slogan:</strong> {carrera.slogan}</p>
              <p><strong>Descripción:</strong> {carrera.descripcion}</p>
              <p className="text-sm text-gray-500">Registrado: {new Date(carrera.created_at).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-center">No hay carreras registradas.</p>
        )}
      </div>
    </div>
  );
}