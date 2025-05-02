import { FiSmile } from "react-icons/fi";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#1F1D2B] text-gray-300 p-6 flex flex-col items-center justify-center">
      {/* Contenedor de bienvenida */}
      <div className="bg-[#2D2B3A] shadow-xl rounded-2xl p-10 w-full max-w-3xl text-center border border-gray-700">
        <FiSmile className="text-[#22c55e] text-6xl mb-4 animate-bounce" />
        <h1 className="text-4xl font-extrabold text-white mb-4">
          ¡Bienvenido al ByteCore!
        </h1>
        <p className="text-gray-400 text-lg">
          Has iniciado sesión correctamente. Aquí puedes ver datos importantes y acceder a otras funcionalidades.
        </p>

        <div className="mt-8 flex justify-center flex-wrap gap-4">
          <button className="bg-[#22c55e] text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
            Ir al perfil
          </button>
          <button className="bg-transparent border border-gray-500 text-gray-300 px-6 py-2 rounded-lg hover:bg-gray-700 transition">
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Widgets animados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full max-w-6xl">
        <div className="bg-[#2D2B3A] rounded-xl p-6 shadow-md hover:shadow-xl transition transform hover:scale-105 duration-300">
          <h3 className="text-xl font-bold text-[#22c55e] mb-2">Usuarios</h3>
          <p className="text-4xl font-extrabold text-white animate-pulse">+245</p>
          <p className="text-gray-400 mt-2">Registrados esta semana</p>
        </div>

        <div className="bg-[#2D2B3A] rounded-xl p-6 shadow-md hover:shadow-xl transition transform hover:scale-105 duration-300">
          <h3 className="text-xl font-bold text-green-400 mb-2">Proyectos</h3>
          <p className="text-4xl font-extrabold text-white animate-bounce">12</p>
          <p className="text-gray-400 mt-2">Activos ahora</p>
        </div>

        <div className="bg-[#2D2B3A] rounded-xl p-6 shadow-md hover:shadow-xl transition transform hover:scale-105 duration-300">
          <h3 className="text-xl font-bold text-pink-400 mb-2">Mensajes</h3>
          <p className="text-4xl font-extrabold text-white animate-ping">4</p>
          <p className="text-gray-400 mt-2">Sin leer</p>
        </div>
      </div>
    </div>
  );
}
