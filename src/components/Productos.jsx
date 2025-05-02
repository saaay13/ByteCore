import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

function ProductosSection() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Cargar productos desde Supabase al montar el componente
    async function fetchProductos() {
      const { data, error } = await supabase.from('productos').select('*');
      if (error) {
        console.error('Error al cargar productos:', error);
      } else {
        setProductos(data);
      }
    }
    fetchProductos();
  }, []);

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-bold text-white mb-4">Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productos.map(producto => (
          <div
            key={producto.id}
            className="flex flex-col sm:flex-row bg-gray-800 rounded-lg border border-gray-700 p-4 hover:bg-gray-700 hover:shadow-lg transition"
          >
            <img
              src={producto.image_url}
              alt={producto.name}
              className="w-full sm:w-32 h-32 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{producto.name}</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {producto.description}
                </p>
              </div>
              <p className="text-white font-medium mt-3">${producto.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductosSection;
