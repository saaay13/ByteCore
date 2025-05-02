import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#1F1D2B] text-white">
      <header className="bg-[#2D2B3A] text-white p-4 flex justify-between items-center border-b border-gray-700">
        <div className="text-xl font-bold text-[#22c55e]">ByteCore</div>
        <nav className="flex gap-6 text-gray-300 font-medium">
          <Link
            to="/dashboard"
            className="hover:text-[#22c55e] transition-colors duration-200"
          >
            Inicio
          </Link>
          <Link
            to="/participantes"
            className="hover:text-[#22c55e] transition-colors duration-200"
          >
            Participantes
          </Link>
          <Link
            to="/carreras"
            className="hover:text-[#22c55e] transition-colors duration-200"
          >
            Carreras
          </Link>
          <Link
            to="/donaciones"
            className="hover:text-[#22c55e] transition-colors duration-200"
          >
            Productos
          </Link>
        </nav>
      </header>

      <main className="flex-grow p-6 bg-gradient-to-b from-[#1F1D2B] to-[#2D2B3A]">
        {children}
      </main>

      <footer className="bg-[#2D2B3A] text-gray-400 text-center p-4 border-t border-gray-700 text-sm">
        ByteCore SRL Sociedad de Responsabilidad Limitada © 2025
      </footer>
    </div>
  );
}
