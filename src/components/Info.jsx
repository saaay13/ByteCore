import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";

export default function Info() {
  return (
    <div className="min-h-screen bg-[#1F1D2B] text-gray-300 p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-[#2D2B3A] p-10 rounded-2xl shadow-2xl space-y-8 border border-gray-700">
        {/* Logo e introducción */}
        <div className="text-center">
          
        <div className="flex items-center gap-4">
            <img
                src="/img/LByteCore.png"
                alt="ByteCore Logo"
                className="w-10 sm:w-12"
            />
        <div className="text-xl sm:text-2xl font-bold text-[#22c55e]">ByteCore</div>
        </div>

          <h1 className="text-4xl font-extrabold text-white mb-4">¿Quiénes somos?</h1>
          <p className="text-lg text-gray-400">
            En <span className="text-[#22c55e] font-semibold">ByteCore</span> nos especializamos en ofrecer lo mejor del hardware de alto rendimiento:
            componentes para gamers, streamers, profesionales y entusiastas de la tecnología.
          </p>
        </div>

        {/* Imagen representativa */}
        <div className="flex justify-center">
          <img
            src="/img/equipo-bytecore.jpg"
            alt="Equipo ByteCore"
            className="rounded-lg shadow-lg max-w-full w-[500px]"
          />
        </div>

        {/* Filosofía */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Nuestra misión</h2>
          <p className="text-gray-400 text-lg">
            Proporcionar a nuestros clientes acceso a tecnología de punta con un servicio confiable,
            ágil y personalizado, manteniéndonos siempre al día con las últimas innovaciones del mercado.
          </p>
        </div>

        {/* Contacto */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Contacto</h2>
          <ul className="space-y-3 text-lg">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#22c55e]" />
              <a href="mailto:soporte@bytecore.com" className="hover:underline">soporte@bytecore.com</a>
            </li>
            <li className="flex items-center gap-3">
              <FaWhatsapp className="text-[#22c55e]" />
              <a href="https://wa.me/51987654321" className="hover:underline">+51 987 654 321</a>
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-[#22c55e]" />
              Av. Tecnología 123, Lima, Perú
            </li>
            <li className="flex items-center gap-3">
              <FaBuilding className="text-[#22c55e]" />
              ByteCore SRL – RUC 20481234567
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
