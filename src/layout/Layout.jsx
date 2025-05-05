import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser, FiFacebook, FiTwitter, FiInstagram, FiMail } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { supabase } from "../supabase";

export default function Layout({ children }) {
  const [userInitial, setUserInitial] = useState(null);

  // Preparando entorno: Obtener datos del usuario con el hook useEffect (Hooks)
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session?.session?.user) {
        const userId = session.session.user.id;
        const { data: userProfile, error } = await supabase
          .from("perfiles")
          .select("nombre")
          .eq("id", userId)
          .single();

        if (!error && userProfile?.nombre) {
          const initial = userProfile.nombre.charAt(0).toUpperCase();
          setUserInitial(initial);
        }
      }
    };
    fetchUserData();
  }, []); // Hooks: Uso de useEffect para obtener la información del usuario

  return (
    <div className="flex flex-col min-h-screen bg-[#1F1D2B] text-white">
      {/* Componentes: Header con renderizado condicional del usuario */}
      <header className="bg-[#2D2B3A] p-4 shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold text-[#22c55e]">ByteCore</div>

          {/* Renderizado Condicional: Mostrar inicial del usuario o ícono de usuario */}
          <div className="flex gap-5 text-xl text-gray-300 items-center">
            <Link
              to="/micuenta"
              className="hover:text-[#22c55e] flex items-center justify-center w-8 h-8 rounded-full bg-[#22c55e] text-white"
              title="Mi Cuenta"
            >
              {userInitial || <FiUser />}
            </Link>
            <Link to="/carrito" className="hover:text-[#22c55e]" title="Carrito">
              <FiShoppingCart />
            </Link>
          </div>
        </div>

        {/* Navegación: Enlaces principales de la aplicación */}
        <nav className="flex justify-end gap-8 text-gray-300 font-medium text-sm sm:text-base">
          <Link to="/dashboard" className="hover:text-[#22c55e] transition-colors">Inicio</Link>
          <Link to="/categorias" className="hover:text-[#22c55e] transition-colors">Categorías</Link>
          <Link to="/info" className="hover:text-[#22c55e] transition-colors">Contacto</Link>
        </nav>
      </header>

      {/* Renderizado de contenido principal: Área principal de la página */}
      <main className="flex-grow p-6 bg-gradient-to-b from-[#1F1D2B] to-[#2D2B3A]">
        {children} {/* Props: Renderización de los componentes hijos */}
      </main>

      {/* Footer: Componente con enlaces útiles y redes sociales */}
      <footer className="bg-[#2D2B3A] text-gray-300 py-10 px-6 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Información de la compañía: Descripción breve de ByteCore */}
          <div>
            <h2 className="text-2xl font-bold text-[#22c55e] mb-4">ByteCore</h2>
            <p className="text-sm leading-relaxed">
              ByteCore es tu tienda de tecnología de confianza. Descubre productos de calidad, soporte personalizado y un equipo apasionado por la innovación.
            </p>
          </div>

          {/* Listas: Enlaces útiles en el footer */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Enlaces útiles</h3>
            <ul className="space-y-1 text-sm">
              <li><Link to="/dashboard" className="hover:text-[#22c55e]">Inicio</Link></li>
              <li><Link to="/categorias" className="hover:text-[#22c55e]">Categorías</Link></li>
              <li><Link to="/info" className="hover:text-[#22c55e]">Contacto</Link></li>
              <li><Link to="/terminos" className="hover:text-[#22c55e]">Términos y Condiciones</Link></li>
              <li><Link to="/privacidad" className="hover:text-[#22c55e]">Política de Privacidad</Link></li>
            </ul>
          </div>

          {/* Soporte: Información de contacto */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Soporte</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="mailto:soporte@bytecore.com" className="hover:text-[#22c55e]">soporte@bytecore.com</a></li>
              <li><Link to="/devoluciones" className="hover:text-[#22c55e]">Devoluciones</Link></li>
            </ul>
          </div>

          {/* Redes Sociales: Iconos con enlaces a las redes */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Síguenos</h3>
            <div className="flex space-x-4 text-2xl">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#22c55e]"><FiFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#22c55e]"><FiTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#22c55e]"><FiInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#22c55e]"><FaLinkedin /></a>
              <a href="mailto:contacto@bytecore.com" className="hover:text-[#22c55e]"><FiMail /></a>
            </div>
          </div>
        </div>

        {/* Footer: Información de derechos de autor */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-sm text-center text-gray-500">
          &copy; {new Date().getFullYear()} ByteCore. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
