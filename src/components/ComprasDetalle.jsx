import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase';

const ComprasDetalle = () => {
  const { id } = useParams(); // Obtén el id desde los parámetros de la URL
  const [compra, setCompra] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verifica que 'id' no sea undefined
    if (!id) {
      setError('ID no proporcionado');
      return;
    }

    const fetchDetalle = async () => {
      const { data, error } = await supabase
        .from('historial_compras')
        .select('*')
        .eq('id', id) // Usa el 'id' para obtener la compra correspondiente
        .single();

      if (error) {
        setError('Error al obtener el detalle de la compra: ' + error.message);
      } else {
        setCompra(data); // Si no hay error, guarda los datos en el estado
      }
    };

    fetchDetalle();
  }, [id]); // Dependencia de 'id', se vuelve a ejecutar si cambia el 'id'

  const imprimirFactura = () => {
    window.print(); // Función para imprimir la factura
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      {error && <p className="text-center text-red-500">{error}</p>}
      {compra ? (
        <div>
          <h2 className="text-3xl font-bold text-[#22c55e] mb-4">Detalle de Compra</h2>
          <p><strong>Nombre:</strong> {compra.nombre_completo}</p>
          <p><strong>Teléfono:</strong> {compra.telefono}</p>
          <p><strong>Dirección:</strong> {compra.direccion}</p>
          <p><strong>Tipo de Entrega:</strong> {compra.tipo_entrega}</p>
          <p><strong>Método de Pago:</strong> {compra.metodo_pago}</p>
          <p><strong>Productos:</strong> {Array.isArray(compra.productos) ? compra.productos.map(producto => producto.nombre).join(", ") : "No hay productos disponibles"}</p>

          <p><strong>Total:</strong> ${compra.total.toFixed(2)}</p>
          {/* Asegúrate de que la propiedad 'fecha' esté presente en la respuesta */}
          <p><strong>Fecha:</strong> {new Date(compra.fecha).toLocaleString()}</p>
          <button
            onClick={imprimirFactura}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500"
          >
            Imprimir Factura
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-400">Cargando detalles...</p>
      )}
    </div>
  );
};

export default ComprasDetalle;
