import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const Reporte = () => {
  const [historialCompras, setHistorialCompras] = useState([]);

  useEffect(() => {
    const fetchHistorialCompras = async () => {
      try {
        const { data, error } = await supabase
          .from('historial_compras')
          .select('id, nombre_completo, telefono, direccion, tipo_entrega, metodo_pago, productos, total, fecha')
          .order('fecha', { ascending: false });

        if (error) {
          throw new Error('Error al obtener el historial de compras');
        }
        setHistorialCompras(data);
      } catch (error) {
        console.error('Error al cargar el historial de compras:', error);
      }
    };

    fetchHistorialCompras();
  }, []);

  const generarReporte = () => {
    let reporte = 'Historial de Compras\n\n';
    historialCompras.forEach((compra) => {
      reporte += `Nombre: ${compra.nombre_completo}\n`;
      reporte += `Teléfono: ${compra.telefono}\n`;
      reporte += `Dirección: ${compra.direccion}\n`;
      reporte += `Tipo de Entrega: ${compra.tipo_entrega}\n`;
      reporte += `Método de Pago: ${compra.metodo_pago}\n`;
      reporte += `Total: $${compra.total}\n`;
      reporte += `Fecha: ${new Date(compra.fecha).toLocaleDateString()}\n`;
      
      // Agregar productos y cantidades
      if (compra.productos && Array.isArray(compra.productos)) {
        reporte += 'Productos:\n';
        compra.productos.forEach((producto) => {
          reporte += ` - ${producto.nombre} (Cantidad: ${producto.cantidad})\n`;
        });
      }

      reporte += '\n---\n';
    });

    const blob = new Blob([reporte], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reporte_historial_compras.txt';
    link.click();
  };

  const imprimirReporte = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Reporte de Compras</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('body { font-family: Arial, sans-serif; margin: 20px; color: #333; }');
    printWindow.document.write('table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }');
    printWindow.document.write('th, td { padding: 12px; border: 1px solid #ddd; text-align: left; }');
    printWindow.document.write('th { background-color: #f4f4f4; }');
    printWindow.document.write('h1 { text-align: center; font-size: 24px; margin-bottom: 20px; }');
    printWindow.document.write('</style></head><body>');
    printWindow.document.write('<h1>Historial de Compras</h1>');
    printWindow.document.write('<table><thead><tr><th>Nombre</th><th>Teléfono</th><th>Dirección</th><th>Total</th><th>Fecha</th><th>Productos</th></tr></thead><tbody>');
    
    historialCompras.forEach((compra) => {
      let productos = '';
      if (compra.productos && Array.isArray(compra.productos)) {
        productos = compra.productos.map((producto) => {
          return `${producto.nombre} (Cantidad: ${producto.cantidad})`;
        }).join(', ');
      }

      printWindow.document.write(`<tr>
        <td>${compra.nombre_completo}</td>
        <td>${compra.telefono}</td>
        <td>${compra.direccion}</td>
        <td>$${compra.total}</td>
        <td>${new Date(compra.fecha).toLocaleDateString()}</td>
        <td>${productos}</td>
      </tr>`);
    });

    printWindow.document.write('</tbody></table>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-[#1F1D2B] text-gray-300 p-6">
      <h1 className="text-4xl font-bold text-white text-center mb-6">Historial de Compras</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left bg-[#2D2B3A] rounded-lg shadow-lg border border-gray-700">
          <thead>
            <tr className="bg-[#2D2B3A] text-white">
              <th className="px-6 py-3 text-sm font-medium">Nombre</th>
              <th className="px-6 py-3 text-sm font-medium">Teléfono</th>
              <th className="px-6 py-3 text-sm font-medium">Dirección</th>
              <th className="px-6 py-3 text-sm font-medium">Total</th>
              <th className="px-6 py-3 text-sm font-medium">Fecha</th>
              <th className="px-6 py-3 text-sm font-medium">Productos</th>
            </tr>
          </thead>
          <tbody>
            {historialCompras.map((compra) => {
              let productos = '';
              if (compra.productos && Array.isArray(compra.productos)) {
                productos = compra.productos.map((producto) => {
                  return `${producto.nombre} (Cantidad: ${producto.cantidad})`;
                }).join(', ');
              }

              return (
                <tr key={compra.id} className="bg-[#2D2B3A] text-white">
                  <td className="px-6 py-3">{compra.nombre_completo}</td>
                  <td className="px-6 py-3">{compra.telefono}</td>
                  <td className="px-6 py-3">{compra.direccion}</td>
                  <td className="px-6 py-3">${compra.total}</td>
                  <td className="px-6 py-3">{new Date(compra.fecha).toLocaleDateString()}</td>
                  <td className="px-6 py-3">{productos}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center space-x-4">
        <button
          onClick={generarReporte}
          className="inline-block bg-yellow-500 text-white font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition"
        >
          Descargar Reporte
        </button>
        <button
          onClick={imprimirReporte}
          className="inline-block bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-400 transition"
        >
          Imprimir Reporte
        </button>
      </div>
    </div>
  );
};

export default Reporte;
