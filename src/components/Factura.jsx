import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase';
import '../index.css';

const Factura = () => {
  const { id } = useParams();
  const [compra, setCompra] = useState(null);

  useEffect(() => {
    const fetchCompra = async () => {
      const { data, error } = await supabase
        .from('historial_compras')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error al obtener la compra:', error);
      } else {
        setCompra(data);
      }
    };

    fetchCompra();
  }, [id]);

  useEffect(() => {
    if (compra) {
      const body = document.querySelector('body');
      const factura = document.getElementById('factura');
      body.style.visibility = 'hidden';
      factura.style.visibility = 'visible';

      setTimeout(() => {
        window.print();
        body.style.visibility = 'visible';
      }, 500);
    }
  }, [compra]);

  if (!compra) return <p>Cargando...</p>;

  const productos = JSON.parse(compra.productos || '[]');

  return (
    <div
      id="factura"
      className="bg-gray-800 text-white min-h-screen flex items-center justify-center p-6"
      style={{ visibility: 'hidden' }}
    >
      <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-[#22c55e] mb-6">Factura - ByteCore</h1>
        <p className="mb-4"><strong>Cliente:</strong> {compra.nombre_completo}</p>
        <p className="mb-4"><strong>Fecha:</strong> {new Date(compra.fecha).toLocaleString()}</p>
        <p className="mb-4"><strong>Dirección:</strong> {compra.direccion}</p>
        <p className="mb-4"><strong>Teléfono:</strong> {compra.telefono}</p>
        <hr className="my-6 border-t border-gray-600" />

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
            {productos.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-600">
                <td className="py-3 px-4">{item.nombre}</td>
                <td className="py-3 px-4 text-right">{item.cantidad}</td>
                <td className="py-3 px-4 text-right">${item.precio}</td>
                <td className="py-3 px-4 text-right">${item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-6 text-right text-xl font-semibold">
          Total: ${compra.total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Factura;
