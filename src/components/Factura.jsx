import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import '../index.css';

const Reporte = () => {
  const [historialCompras, setHistorialCompras] = useState([]);
  
  useEffect(() => {
    const fetchHistorialCompras = async () => {
      try {
        const { data, error } = await supabase
          .from('historial_compras')
          .select('*')
          .order('fecha', { ascending: false });

        if (error) {
          throw new Error('Error al obtener el historial de compras');
        }
        setHistorialCompras(data); // Actualiza el estado con los datos de compras
      } catch (error) {
        console.error('Error al cargar el historial de compras:', error);
      }
    };

    fetchHistorialCompras();
  }, []);

  const generarReporte = () => {
    let reporte = 'Historial de Compras\n\n';
    historialCompras.forEach((compra) => {
      reporte += `Nombre del Cliente: ${compra.nombre_completo}\n`;
      reporte += `Teléfono: ${compra.telefono}\n`;
      reporte += `Dirección: ${compra.direccion}\n`;
      reporte += `Tipo de Entrega: ${compra.tipo_entrega}\n`;
      reporte += `Método de Pago: ${compra.metodo_pago}\n`;
      reporte += `Fecha: ${new Date(compra.fecha).toLocaleDateString()}\n`;

      // Detalle de los productos comprados
      const productos = JSON.parse(compra.productos);
      productos.forEach((producto) => {
        reporte += `Producto: ${producto.nombre}\n`;
        reporte += `Cantidad: ${producto.cantidad}\n`;
        reporte += `Precio: $${producto.precio}\n`;
        reporte += `Total Producto: $${producto.total}\n`;
      });

      reporte += `Total de la Compra: $${compra.total}\n`;
      reporte += '\n---\n';
    });

    const blob = new Blob([reporte], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reporte_historial_compras.txt';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-800 text-gray-300 p-6">
      <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#22c55e] mb-6">Historial de Compras - Reporte</h1>
        
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm text-left text-white">
            <thead className="bg-[#2D2B3A]">
              <tr>
                <th className="py-3 px-4">Nombre</th>
                <th className="py-3 px-4">Teléfono</th>
                <th className="py-3 px-4">Dirección</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {historialCompras.map((compra) => (
                <tr key={compra.id} className="bg-[#2D2B3A] border-b border-gray-600">
                  <td className="px-6 py-3">{compra.nombre_completo}</td>
                  <td className="px-6 py-3">{compra.telefono}</td>
                  <td className="px-6 py-3">{compra.direccion}</td>
                  <td className="px-6 py-3">${compra.total}</td>
                  <td className="px-6 py-3">{new Date(compra.fecha).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={generarReporte}
            className="bg-[#22c55e] text-white font-bold py-3 px-8 rounded-md text-lg hover:bg-[#16a34a] transition duration-200"
          >
            Descargar Reporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reporte;
