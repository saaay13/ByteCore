import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";

export default function Cuenta() {
  const [perfil, setPerfil] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      const { data: session } = await supabase.auth.getSession();

      if (session?.session?.user) {
        const { data: user, error } = await supabase
          .from("perfiles")
          .select("*")
          .eq("id", session.session.user.id)
          .single();

        if (error) {
          console.error("Error al cargar el perfil:", error);
        } else {
          setPerfil(user);
        }
      }
    };

    fetchPerfil();
  }, []);

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (!perfil) {
    return <div className="text-white p-6">Cargando perfil...</div>;
  }

  return (
    <div className="min-h-screen bg-[#1F1D2B] text-gray-100 p-6 flex justify-center">
      <div className="bg-[#2D2B3A] rounded-xl shadow-lg p-8 w-full max-w-xl space-y-6">
        <div className="flex items-center space-x-4">
          <div className="bg-[#1F1D2B] p-4 rounded-full">
            <FiUser className="text-3xl text-[#22c55e]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{perfil.nombre || "Sin nombre"}</h1>
            <p className="text-sm text-gray-400">{perfil.email}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p><strong>Rol:</strong> {perfil.rol}</p>
          <p><strong>Creado en:</strong> {new Date(perfil.creado_en).toLocaleString()}</p>
        </div>

        <button
          onClick={cerrarSesion}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md flex items-center space-x-2 transition"
        >
          <FiLogOut />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
}
