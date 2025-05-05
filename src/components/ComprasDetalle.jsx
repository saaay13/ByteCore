import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase';

const ComprasDetalle = () => {
  const { id } = useParams(); // Obtenemos el ID de la compra desde los parámetros de la URL
  const [compra, setCompra] = useState(null); // Estado para almacenar los detalles de la compra
  const [error, setError] = useState(null); // Estado para manejar errores

  // useEffect para obtener los detalles de la compra cuando el componente se monta o el ID cambia
  useEffect(() => {
    if (!id) {
      setError('ID no proporcionado'); // Validación si no se pasa un ID
      return;
    }

    const fetchDetalle = async () => {
      const { data, error } = await supabase
        .from('historial_compras')
        .select('*')
        .eq('id', id)
        .single(); // Obtenemos un solo registro basado en el ID

      if (error) {
        setError('Error al obtener el detalle de la compra: ' + error.message);
      } else {
        setCompra(data); // Si la consulta es exitosa, almacenamos los datos
      }
    };

    fetchDetalle();
  }, [id]);

  const imprimirFactura = () => {
    window.print(); // Función para imprimir la factura
  };

  return (
    <div className="bg-[#1F1D2B] min-h-screen p-6 flex justify-center text-white">
      {error && <p className="text-center text-red-500">{error}</p>}
      {compra ? (
        <div
          id="factura"
          className="w-full max-w-3xl p-8 rounded-xl shadow-lg bg-[#2A2934] text-white print:bg-white print:text-black print:shadow-none print:p-0 print:m-0 print:rounded-none"
        >
          {/* Información de la empresa */}
          <div className="flex justify-between items-center mb-8 border-b border-gray-600 pb-4 print:border-black">
            <div>
              <img src="/img/LByteCore.png" alt="ByteCore Logo" className="w-14 mb-2 print:hidden" />
              <h1 className="text-2xl font-bold text-[#22c55e] print:text-black">ByteCore</h1>
              <p className="text-sm">Av. Tecnología 123, Tarija, Bolivia</p>
              <p className="text-sm">+591 12345678</p>
              <p className="text-sm">soporte@bytecore.com</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold">Factura</h2>
              <p><strong>ID:</strong> {compra.id}</p>
              <p><strong>Fecha:</strong> {new Date(compra.fecha).toLocaleString()}</p>
            </div>
          </div>

          {/* Información del cliente */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Cliente</h3>
            <p><strong>Nombre:</strong> {compra.nombre_completo}</p>
            <p><strong>Teléfono:</strong> {compra.telefono}</p>
            <p><strong>Dirección:</strong> {compra.direccion}</p>
            <p><strong>Entrega:</strong> {compra.tipo_entrega}</p>
            <p><strong>Pago:</strong> {compra.metodo_pago}</p>
          </div>

          {/* Tabla de productos */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full table-auto border-collapse text-sm">
              <thead className="bg-[#22c55e] text-white print:bg-black print:text-white">
                <tr>
                  <th className="p-2 text-left">Producto</th>
                  <th className="p-2 text-right">Cantidad</th>
                  <th className="p-2 text-right">Precio</th>
                  <th className="p-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  try {
                    const productos = Array.isArray(compra.productos)
                      ? compra.productos
                      : JSON.parse(compra.productos); // Parseamos los productos si están en formato string
                    return productos.map((producto, index) => (
                      <tr key={index} className="border-b border-gray-700 print:border-black">
                        <td className="p-2">{producto.nombre}</td>
                        <td className="p-2 text-right">{producto.cantidad}</td>
                        <td className="p-2 text-right">${parseFloat(producto.precio).toFixed(2)}</td>
                        <td className="p-2 text-right">${parseFloat(producto.total).toFixed(2)}</td>
                      </tr>
                    ));
                  } catch (err) {
                    return <tr><td colSpan="4" className="text-red-500">Error al procesar productos</td></tr>; // Error al procesar productos
                  }
                })()}
              </tbody>
            </table>
          </div>

          {/* Total de la compra */}
          <div className="text-right text-lg font-semibold mb-8">
            Total: ${compra.total.toFixed(2)}
          </div>

          {/* Botón para imprimir la factura */}
          <div className="text-center print:hidden">
            <button
              onClick={() => window.open(`/factura/${compra.id}`, '_blank')}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500"
            >
              Imprimir Factura
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400">Cargando detalles...</p>
      )}
    </div>
  );
};

export default ComprasDetalle;
