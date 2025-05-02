import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function DonacionesList() {
  const [donaciones, setDonaciones] = useState([]);

  useEffect(() => {
    fetchDonaciones();
  }, []);

  const fetchDonaciones = async () => {
    const { data, error } = await supabase
      .from("donaciones")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al obtener donaciones:", error.message);
    } else {
      setDonaciones(data);
    }
  };

  return (
    <div className="mt-12 px-4 sm:px-8">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-green-400 drop-shadow">
        💸 Últimas Donaciones
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {donaciones.length > 0 ? (
          donaciones.map((d) => (
            <Link to={`/donaciones/${d.id}`} key={d.id}>
              <div className="relative bg-[#2d2d44] border border-green-700 rounded-2xl shadow-xl p-6 hover:bg-[#3b3b5c] hover:scale-105 transition-all duration-300 ease-in-out group overflow-hidden cursor-pointer">
                <div className="absolute -top-5 -right-5 bg-green-600 text-white text-xs px-3 py-1 rounded-bl-xl transform rotate-12 shadow-md group-hover:rotate-0 transition-all">
                  Donación
                </div>

                <div className="text-2xl font-bold text-green-300 mb-2 flex items-center gap-2">
                  💚 {d.nombre}
                </div>

                <div className="text-4xl font-extrabold text-green-400 drop-shadow-sm">
                  Bs {parseFloat(d.monto).toFixed(2)}
                </div>

                <div className="mt-4 text-sm text-gray-400 italic">
                  Registrado el <br />
                  {new Date(d.created_at).toLocaleString()}
                </div>

                <div className="mt-4 border-t border-white/10 pt-2 text-right text-sm text-green-500 font-semibold">
                  ¡Gracias por tu aporte!
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400">
            Aún no se han registrado donaciones.
          </p>
        )}
      </div>
    </div>
  );
}
