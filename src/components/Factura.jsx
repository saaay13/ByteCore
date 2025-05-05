import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import '../index.css';

const Factura = () => {
  // Obtención del ID de la compra desde la URL (renderizado condicional)
  const { id } = useParams();
  const [compra, setCompra] = useState(null);

  // Preparando el entorno para obtener los datos de la compra desde la base de datos (fetch)
  useEffect(() => {
    const fetchCompra = async () => {
      // Llamada a la base de datos para obtener la compra por ID
      const { data } = await supabase
        .from('historial_compras')
        .select('*')
        .eq('id', id)
        .single();

      setCompra(data); // Actualiza el estado con la información obtenida
    };

    fetchCompra(); // Ejecuta la función de fetch
  }, [id]); // Dependencia: cuando el ID cambia, se vuelve a ejecutar

  // Preparando el entorno para ocultar la página y mostrar la factura antes de imprimir
  useEffect(() => {
    if (compra) {
      const body = document.querySelector('body');
      const factura = document.getElementById('factura');

      // Renderizado condicional: si la compra está disponible, oculta el resto de la página y muestra la factura
      body.style.visibility = 'hidden';
      factura.style.visibility = 'visible';

      // Imprime la factura después de 500ms para asegurar que todo esté renderizado
      setTimeout(() => {
        window.print();
        // Restaurar la visibilidad del cuerpo después de imprimir
        body.style.visibility = 'visible';
      }, 500);
    }
  }, [compra]); // Dependencia: solo se ejecuta cuando la compra se ha cargado

  // Renderizado condicional: si la compra no ha sido cargada, muestra "Cargando..."
  if (!compra) return <p>Cargando...</p>;

  return (
    <div
      id="factura"
      className="bg-gray-800 text-white min-h-screen flex items-center justify-center p-6"
      style={{ visibility: 'hidden' }}
    >
      <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-4xl">
        {/* Renderizado condicional de los datos de la compra */}
        <h1 className="text-3xl font-bold text-center text-[#22c55e] mb-6">Factura - ByteCore</h1>
        <p className="mb-4"><strong>Cliente:</strong> {compra.nombre_completo}</p>
        <p className="mb-4"><strong>Fecha:</strong> {new Date(compra.fecha).toLocaleString()}</p>
        <p className="mb-4"><strong>Dirección:</strong> {compra.direccion}</p>
        <p className="mb-4"><strong>Teléfono:</strong> {compra.telefono}</p>
        <hr className="my-6 border-t border-gray-600" />

        {/* Lista de productos de la compra: Mapeo de productos usando renderizado condicional */}
        <table className="w-full text-sm text-left">
          <thead>
            <tr>
              <th className="py-3 px-4 text-lg font-semibold">Producto</th>
              <th className="py-3 px-4 text-lg font-semibold text-right">Cant</th>
              <th className="py-3 px-4 text-lg font-semibold text-right">Precio</th>
              <th className="py-3 px-4 text-lg font-semibold text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {/* Renderizado de la lista de productos utilizando la función map */}
            {JSON.parse(compra.productos).map((item, idx) => (
              <tr key={idx} className="border-b border-gray-600">
                <td className="py-3 px-4">{item.nombre}</td>
                <td className="py-3 px-4 text-right">{item.cantidad}</td>
                <td className="py-3 px-4 text-right">${item.precio}</td>
                <td className="py-3 px-4 text-right">${item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Muestra el total de la compra */}
        <p className="mt-6 text-right text-xl font-semibold">
          Total: ${compra.total.toFixed(2)}
        </p>

        {/* Evento: Botón para volver al inicio */}
        <div className="mt-8 text-center">
          <Link
            to="/dashboard"
            className="bg-[#22c55e] text-white py-2 px-6 rounded-md text-lg hover:bg-[#16a34a] transition duration-200"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Factura;
