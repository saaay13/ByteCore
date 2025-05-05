import React from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario

export default function Gracias() {
  const navigate = useNavigate();

  // Función para redirigir al inicio
  const volverAlInicio = () => {
    navigate('/'); // Esto redirige al usuario a la página principal
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-white text-center">
      <h2 className="text-4xl font-bold mb-6 text-[#22c55e]">¡Gracias por tu compra!</h2>
      <p className="text-xl">Tu pago ha sido procesado exitosamente.</p>
      
      {/* Imagen de agradecimiento o alguna ilustración */}
      <div className="mt-4">
        <img
          src="https://www.example.com/gracias-imagen.svg" // Puedes colocar una imagen de agradecimiento aquí
          alt="Gracias"
          className="mx-auto w-48 h-48"
        />
      </div>

      <div className="mt-6">
        <button
          onClick={volverAlInicio}
          className="bg-[#22c55e] text-white px-6 py-3 rounded hover:bg-[#1faa52]"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
