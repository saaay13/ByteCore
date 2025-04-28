import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4 flex justify-between">
        <div className="text-xl font-bold">Mi Sistema</div>
        <nav className="flex gap-4">
          <Link to="/dashboard">Inicio</Link>
          <Link to="/participantes">Participantes</Link>
          <Link to="/carreras">Carreras</Link>
          <Link to="/donaciones">Donaciones</Link>
        </nav>
      </header>

      <main className="flex-grow p-6 bg-gradient-to-b from-purple-200 to-blue-200">
        {children}
      </main>

      <footer className="bg-gray-800 text-white text-center p-4">
        M.Sc. Ing. Juan Pablo Cruz Ovando © 2025
      </footer>
    </div>
  );
}
