import { useState } from "react"; // Usamos el hook useState para manejar el estado de los inputs
import { supabase } from "../supabase"; // Conexión con Supabase para autenticación
import { FiMail, FiLock } from "react-icons/fi"; // Iconos de correo y contraseña
import { useNavigate } from "react-router-dom"; // Hook para la navegación de rutas

export default function Login() {
  const navigate = useNavigate(); // Usamos el hook useNavigate para redirigir después del login
  const [email, setEmail] = useState(""); // Estado para el correo electrónico
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [mensaje, setMensaje] = useState(""); // Estado para mensajes de error o éxito
  const [loading, setLoading] = useState(false); // Estado para mostrar el spinner de carga

  // Función de manejo del formulario (evento submit)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
    setMensaje(""); // Limpiamos el mensaje previo
    setLoading(true); // Activamos el estado de carga mientras se procesa la solicitud

    // Llamada a Supabase para iniciar sesión
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    // Renderizado condicional para mostrar el mensaje dependiendo de si hay error o éxito
    if (loginError) {
      setLoading(false); // Desactivamos el loading
      setMensaje("❌ " + loginError.message); // Mostramos el mensaje de error
      return;
    }

    setMensaje("✅ Iniciando sesión..."); // Mostramos mensaje de éxito
    navigate("/dashboard"); // Redirigimos al usuario al dashboard si el login es exitoso
  };

  return (
    <div className="min-h-screen bg-[#1F1D2B] flex items-center justify-center px-4">
      <div className="bg-[#2D2B3A] px-10 py-12 rounded-xl shadow-xl w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-extrabold text-center text-white mb-8">Bienvenido</h1>

        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de correo */}
          <div>
            <label className="block text-gray-400 font-medium mb-2">Correo</label>
            <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2 bg-[#1F1D2B]">
              <FiMail className="text-gray-500 mr-2" />
              <input
                type="email" // Campo de tipo email para ingresar el correo
                placeholder="usuario@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Actualiza el estado de email con el valor ingresado
                required // Campo obligatorio
                className="w-full bg-transparent text-white outline-none placeholder-gray-500"
              />
            </div>
          </div>

          {/* Campo de contraseña */}
          <div>
            <label className="block text-gray-400 font-medium mb-2">Contraseña</label>
            <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2 bg-[#1F1D2B]">
              <FiLock className="text-gray-500 mr-2" />
              <input
                type="password" // Campo de tipo password para ingresar la contraseña
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de password
                required // Campo obligatorio
                className="w-full bg-transparent text-white outline-none placeholder-gray-500"
              />
            </div>
          </div>

          {/* Enlace condicional para registrarse, si no tiene cuenta */}
          <p className="text-center mt-6 text-sm text-gray-400">
            ¿No tienes una cuenta?{" "}
            <a href="/registro" className="text-green-400 hover:underline">
              Crear cuenta
            </a>
          </p>

          {/* Botón de submit para iniciar sesión */}
          <button
            type="submit"
            disabled={loading} // Desactiva el botón mientras está en carga
            className="w-full py-3 bg-[#22c55e] hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300"
          >
            {loading ? "Ingresando..." : "Ingresar"} {/* Condicionalmente mostramos el mensaje según el estado de carga */}
          </button>

          {/* Renderizado condicional del mensaje de error o éxito */}
          {mensaje && (
            <div className="text-center mt-4 text-sm text-gray-400">{mensaje}</div>
          )}
        </form>
      </div>
    </div>
  );
}
