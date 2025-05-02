import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);
  
    // Paso 1: Crear usuario
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (signUpError) {
      setMensaje("❌ Error al registrar usuario: " + signUpError.message);
      setLoading(false);
      return;
    }
  
    const userId = authData.user?.id;
  
    if (userId) {
      // Paso 2: Insertar en perfil (si no usas trigger)
      const { error: perfilError } = await supabase
        .from("perfiles")
        .insert([{ id: userId, nombre }]);
  
      if (perfilError) {
        setMensaje("⚠️ Usuario creado, pero error al guardar perfil.");
      } else {
        setMensaje("✅ Cuenta creada con éxito. Redirigiendo...");
      }
  
      // ✅ Cerrar sesión para volver al login
      await supabase.auth.signOut();
    }
  
    setLoading(false);
    setTimeout(() => navigate("/dashboard"), 1500);
  };
  
  return (
    <div className="min-h-screen bg-[#1F1D2B] flex items-center justify-center px-4">
      <div className="bg-[#2D2B3A] px-10 py-12 rounded-xl shadow-xl w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-extrabold text-center text-white mb-8">
          Crear Cuenta
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-1">Nombre</label>
            <input
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full bg-[#1F1D2B] text-white px-3 py-2 rounded-lg border border-gray-600 placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Correo</label>
            <input
              type="email"
              placeholder="usuario@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#1F1D2B] text-white px-3 py-2 rounded-lg border border-gray-600 placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#1F1D2B] text-white px-3 py-2 rounded-lg border border-gray-600 placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#22c55e] hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300"
          >
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>

          {mensaje && (
            <div className="text-center mt-4 text-sm text-gray-400">{mensaje}</div>
          )}
        </form>
      </div>
    </div>
  );
}
