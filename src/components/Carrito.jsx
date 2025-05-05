import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [historialCompras, setHistorialCompras] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  // Obtener carrito y historial de compras de forma eficiente
  useEffect(() => {
    const fetchData = async () => {
      // Obtener carrito desde localStorage
      const carritoData = JSON.parse(localStorage.getItem('carrito')) || [];
      setCarrito(carritoData);
      setTotal(carritoData.reduce((acc, item) => acc + item.precio * item.cantidad, 0));

      // Obtener historial de compras desde Supabase
      const { data, error } = await supabase
        .from('historial_compras')
        .select('*')  // Selecciona todos los campos
        .order('fecha', { ascending: false });  // Ordena los registros por fecha descendente

      if (error) {
        console.error('Error al obtener historial de compras:', error);
      } else {
        setHistorialCompras(data);
      }
    };

    fetchData();
  }, []);

  // Función para recalcular el total del carrito
  const recalcularTotal = () => {
    const totalCarrito = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    setTotal(totalCarrito);
  };

  // Eliminar producto del carrito
  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    recalcularTotal();
  };

  // Actualizar la cantidad de un producto
  const actualizarCantidad = (id, cantidad) => {
    const nuevoCarrito = carrito.map(item =>
      item.id === id ? { ...item, cantidad: cantidad } : item
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    recalcularTotal();
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setTotal(0);
    localStorage.removeItem('carrito');
  };

  const procesarPago = () => {
    navigate('/factura');
  };

  return (
    <div className="flex">
      {/* Menú lateral */}
      <div
        className={`fixed left-0 top-0 w-60 bg-gray-800 text-white p-6 h-full transition-all duration-300 transform ${showMenu ? 'translate-x-0' : '-translate-x-64'} shadow-xl`}
      >
        <h2 className="text-2xl font-bold mb-4">Historial de Compras</h2>
        <ul>
          {historialCompras.map((compra) => (
            <li key={compra.id} className="mb-4">
              <p><strong>{compra.nombre_completo}</strong></p>
              <p>Total: ${compra.total}</p>
              <p>Fecha: {new Date(compra.fecha).toLocaleDateString()}</p>
              <button
                onClick={() => navigate(`/compras-detalle/${compra.id}`)}
                className="text-green-400 hover:underline"
              >
                Ver detalles
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setShowMenu(false)} // Cerrar menú al hacer clic
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white p-2 rounded-full hover:bg-gray-700"
          style={{ fontSize: '18px' }}
        >
          &#x2715;
        </button>
      </div>

      {/* Contenido principal (Carrito de compras) */}
      <div className="flex-1 p-6 max-w-7xl mx-auto text-white">
        <button
          onClick={() => setShowMenu(true)}
          className="bg-gray-700 text-white px-4 py-2 rounded mb-6"
        >
          Ver Historial de Compras
        </button>

        <h2 className="text-4xl font-bold mb-6 text-center text-[#22c55e]">Carrito de Compras</h2>

        {carrito.length === 0 ? (
          <p className="text-center text-gray-400">Tu carrito está vacío.</p>
        ) : (
          <div>
            {carrito.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 border border-gray-700 rounded-md">
                <div className="flex items-center gap-4">
                  {item.imagen_url && (
                    <img
                      src={item.imagen_url}
                      alt={item.nombre}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.nombre}</h3>
                    <p className="text-gray-400">Precio: ${item.precio}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={item.cantidad}
                    min="1"
                    max={item.stock}
                    onChange={(e) => actualizarCantidad(item.id, parseInt(e.target.value))}
                    className="w-16 p-2 rounded bg-gray-800 text-center text-white border border-gray-600"
                  />
                  <p className="text-gray-400">Subtotal: ${(item.precio * item.cantidad).toFixed(2)}</p>
                  <button
                    onClick={() => eliminarProducto(item.id)}
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-500"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 flex justify-between items-center border-t border-gray-700 pt-4">
              <h3 className="text-2xl font-semibold text-white">Total:</h3>
              <p className="text-2xl text-green-400 font-bold">${total.toFixed(2)}</p>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={vaciarCarrito}
                className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-500"
              >
                Vaciar Carrito
              </button>
              <button
                onClick={procesarPago}
                className="bg-[#22c55e] text-white px-6 py-3 rounded hover:bg-[#1faa52]"
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
