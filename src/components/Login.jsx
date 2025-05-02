import { useState } from "react";
import { supabase } from "../supabase";
import { FiMail, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (loginError) {
      setLoading(false);
      setMensaje("❌ Usuario o contraseña incorrectos");
      return;
    }

    setMensaje("✅ Iniciando sesión...");

    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;

    if (userId) {
      const { data: perfilExistente, error: errorPerfil } = await supabase
        .from("perfiles")
        .select("id")
        .eq("id", userId)
        .single();

      if (!perfilExistente && !errorPerfil) {
        const { error: insertError } = await supabase
          .from("perfiles")
          .insert({ id: userId, nombre: email });

        if (insertError) {
          console.error("Error al crear perfil:", insertError.message);
        }
      }
    }

    // ✅ Redirigir inmediatamente
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#1F1D2B] flex items-center justify-center px-4">
      <div className="bg-[#2D2B3A] px-10 py-12 rounded-xl shadow-xl w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-extrabold text-center text-white mb-8">
          Bienvenido
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 font-medium mb-2">Correo</label>
            <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2 bg-[#1F1D2B] focus-within:ring-2 focus-within:ring-[#22c55e]">
              <FiMail className="text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="usuario@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent text-white outline-none placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 font-medium mb-2">Contraseña</label>
            <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2 bg-[#1F1D2B] focus-within:ring-2 focus-within:ring-[#22c55e]">
              <FiLock className="text-gray-500 mr-2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent text-white outline-none placeholder-gray-500"
              />
            </div>
          </div>

          <p className="text-center mt-6 text-sm text-gray-400">
            ¿No tienes una cuenta?{" "}
            <a href="/registro" className="text-green-400 hover:underline">
              Crear cuenta
            </a>
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#22c55e] hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

          {mensaje && (
            <div className="text-center mt-4 text-sm text-gray-400">{mensaje}</div>
          )}
        </form>
      </div>
    </div>
  );
}
