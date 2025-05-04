import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart } from "react-icons/fi";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#1F1D2B] text-white">
      <header className="bg-[#2D2B3A] p-4 shadow">
        {/* Primer nivel: Logo a la izquierda y iconos a la derecha */}
        <div className="flex justify-between items-center mb-4">
          {/* Logo a la izquierda */}
          <div className="flex items-center gap-6">
            <div className="text-2xl font-bold text-[#22c55e]">ByteCore</div>
          </div>

          {/* Iconos a la derecha */}
          <div className="flex gap-5 text-xl text-gray-300">
            <Link to="/micuenta" className="hover:text-[#22c55e]" title="Mi Cuenta">
              <FiUser />
            </Link>
            <Link to="/carrito" className="hover:text-[#22c55e]" title="Carrito">
              <FiShoppingCart />
            </Link>
          </div>
        </div>

        {/* Segundo nivel: Menú de navegación a la derecha */}
        <nav className="flex justify-end gap-8 text-gray-300 font-medium text-sm sm:text-base">
          <Link
            to="/dashboard"
            className="hover:text-[#22c55e] transition-colors"
          >
            Inicio
          </Link>
          <Link
            to="/categorias"
            className="hover:text-[#22c55e] transition-colors"
          >
            Categorias
          </Link>
          <Link
            to="/info"
            className="hover:text-[ #22c55e] transition-colors"
          >
            Contacto
          </Link>
        </nav>
      </header>

      <main className="flex-grow p-6 bg-gradient-to-b from-[#1F1D2B] to-[#2D2B3A]">
        {children}
      </main>

      <footer className="bg-[#2D2B3A] text-white py-12 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Información de contacto */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-[#22c55e]">Información de Contacto</h3>
            <p className="text-gray-400">ByteCore SRL</p>
            <p className="text-gray-400">Email: contacto@bytecore.com</p>
            <p className="text-gray-400">Teléfono: +123 456 7890</p>
            <p className="text-gray-400">Dirección: Calle Ficticia 123, Ciudad</p>
          </div>

          {/* Enlaces rápidos */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-[#22c55e]">Enlaces Rápidos</h3>
            <Link to="/donaciones" className="text-gray-400 hover:text-[#22c55e]">Productos</Link>
            <Link to="/info" className="text-gray-400 hover:text-[#22c55e]">Contacto</Link>
            <Link to="/terms" className="text-gray-400 hover:text-[#22c55e]">Términos y Condiciones</Link>
            <Link to="/privacy" className="text-gray-400 hover:text-[#22c55e]">Política de Privacidad</Link>
          </div>

          {/* Redes Sociales */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-[#22c55e]">Síguenos</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-[#22c55e]" title="Facebook">
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-[#22c55e]" title="Twitter">
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-[#22c55e]" title="Instagram">
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>ByteCore SRL Sociedad de Responsabilidad Limitada © 2025</p>
        </div>
      </footer>

    </div>
  );
}
