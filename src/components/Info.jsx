import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaBuilding } from "react-icons/fa"; // Importación de íconos de react-icons

export default function Info() {
  return (
    <div className="min-h-screen bg-[#1F1D2B] text-gray-300 p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-[#2D2B3A] p-10 rounded-2xl shadow-2xl space-y-8 border border-gray-700">
        {/* Logo e introducción */}
        <div className="text-center">
          

          {/* Título y descripción introductoria */}
          <h1 className="text-4xl font-extrabold text-white mb-4">¿Quiénes somos?</h1>
          <p className="text-lg text-gray-400">
            En <span className="text-[#22c55e] font-semibold">ByteCore</span> nos especializamos en ofrecer lo mejor del hardware de alto rendimiento:
            componentes para gamers, streamers, profesionales y entusiastas de la tecnología.
          </p>
        </div>

        {/* Imagen representativa */}
        <div className="flex justify-center">
          <img
            src="/img/equipo.webp" // Ruta de la imagen representativa del equipo
            alt="Equipo ByteCore" // Texto alternativo para la imagen
            className="rounded-lg shadow-lg max-w-full w-[500px]" // Estilo y tamaño de la imagen
          />
        </div>

        {/* Filosofía de la empresa */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Nuestra misión</h2>
          <p className="text-gray-400 text-lg">
            Proporcionar a nuestros clientes acceso a tecnología de punta con un servicio confiable,
            ágil y personalizado, manteniéndonos siempre al día con las últimas innovaciones del mercado.
          </p>
        </div>

        {/* Sección de contacto */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Contacto</h2>
          <ul className="space-y-3 text-lg">
            {/* Lista con información de contacto */}
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#22c55e]" /> {/* Icono de correo */}
              <a href="mailto:soporte@bytecore.com" className="hover:underline">soporte@bytecore.com</a> {/* Enlace de correo */}
            </li>
            <li className="flex items-center gap-3">
              <FaWhatsapp className="text-[#22c55e]" /> {/* Icono de WhatsApp */}
              <a href="https://wa.me/59112345678" className="hover:underline">+591 12345678</a> {/* Enlace de WhatsApp */}
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-[#22c55e]" /> {/* Icono de ubicación */}
              Av. Tecnología 123, Tarija, Bolivia {/* Dirección de la empresa */}
            </li>
            <li className="flex items-center gap-3">
              <FaBuilding className="text-[#22c55e]" /> {/* Icono de empresa */}
              ByteCore SRL – RUC 20481234567 {/* Información legal de la empresa */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
