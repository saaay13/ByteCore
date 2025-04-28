import { FiSmile } from "react-icons/fi";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-indigo-200 to-blue-100 flex flex-col items-center justify-center px-4 py-10">
      {/* Contenedor de bienvenida */}
      <div className="backdrop-blur-md bg-white/70 shadow-xl rounded-2xl p-10 w-full max-w-3xl text-center border border-white/30">
        <FiSmile className="text-indigo-600 text-6xl mb-4 animate-bounce" />
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          ¡Bienvenido al Sistema!
        </h1>
        <p className="text-gray-700 text-lg">
          Has iniciado sesión correctamente. Aquí puedes ver datos importantes y acceder a otras funcionalidades.
        </p>

        <div className="mt-8 flex justify-center flex-wrap gap-4">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
            Ir al perfil
          </button>
          <button className="bg-white border border-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-100 transition">
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Widgets animados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full max-w-6xl">
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition transform hover:scale-105 duration-300">
          <h3 className="text-xl font-bold text-indigo-600 mb-2">Usuarios</h3>
          <p className="text-4xl font-extrabold text-gray-800 animate-pulse">+245</p>
          <p className="text-gray-500 mt-2">Registrados esta semana</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition transform hover:scale-105 duration-300">
          <h3 className="text-xl font-bold text-green-600 mb-2">Proyectos</h3>
          <p className="text-4xl font-extrabold text-gray-800 animate-bounce">12</p>
          <p className="text-gray-500 mt-2">Activos ahora</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition transform hover:scale-105 duration-300">
          <h3 className="text-xl font-bold text-pink-600 mb-2">Mensajes</h3>
          <p className="text-4xl font-extrabold text-gray-800 animate-ping">4</p>
          <p className="text-gray-500 mt-2">Sin leer</p>
        </div>
      </div>
    </div>
  );
}
