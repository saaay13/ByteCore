import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa hook useNavigate para redirigir a otras páginas
import { FiSmile } from 'react-icons/fi'; // Importa un ícono de react-icons

export default function Gracias() {
  // Inicializa el hook useNavigate para redirigir al usuario
  const navigate = useNavigate();

  // Función para redirigir al inicio
  const volverAlInicio = () => {
    navigate('/'); // Redirige al usuario a la página principal
  };

  return (
    <div
      className="p-6 max-w-5xl mx-auto text-white text-center"
      style={{
        backgroundImage: "url('/img/fondo.png')", // Ruta a la imagen de fondo
        backgroundSize: 'cover', // La imagen cubrirá toda la pantalla
        backgroundPosition: 'center', // Centra la imagen de fondo
        minHeight: '50vh', // Asegura que cubra por lo menos la mitad de la pantalla
        display: 'flex', // Usa Flexbox para centrar contenido
        justifyContent: 'center', // Centra horizontalmente el contenido
        alignItems: 'center', // Centra verticalmente el contenido
        textAlign: 'center', // Alineación del texto al centro
        borderRadius: '15px', // Bordes redondeados para la caja que contiene el fondo
      }}
    >
      <div>
        {/* Renderizado condicional del título y mensaje */}
        <h2 className="text-4xl font-bold mb-6 text-[#22c55e]">¡Gracias por tu compra!</h2>
        <p className="text-xl">Tu pago ha sido procesado exitosamente.</p>
        
        {/* Componente de icono centrado */}
        <div className="mt-4 flex justify-center items-center">
          <FiSmile className="text-[#22c55e] text-6xl mb-6 animate-bounce" /> {/* Icono de carita feliz */}
        </div>

        {/* Evento: Botón para redirigir al usuario a la página principal */}
        <div className="mt-6">
          <button
            onClick={volverAlInicio} // Evento al hacer clic en el botón
            className="bg-[#22c55e] text-white px-6 py-3 rounded hover:bg-[#1faa52]"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
