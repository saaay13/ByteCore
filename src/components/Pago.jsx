import { useState, useEffect } from "react";
import { FiCreditCard, FiDollarSign } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function Pago() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [metodoPago, setMetodoPago] = useState("");
  const [procesando, setProcesando] = useState(false);
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [fechaPago, setFechaPago] = useState("");
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    tipoEntrega: "tienda",
  });
  const [datosTarjeta, setDatosTarjeta] = useState({ numero: "", vencimiento: "", cvv: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const carritoData = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoData);

    let totalCarrito = 0;
    carritoData.forEach((item) => {
      totalCarrito += item.precio * item.cantidad;
    });
    setTotal(totalCarrito);
  }, []);

  const confirmarPago = async () => {
    // Validar si los campos están completos
    if (!metodoPago || !usuario.nombre || !usuario.apellido || !usuario.telefono || 
        (usuario.tipoEntrega === "delivery" && !usuario.direccion)) {
      alert("Por favor complete todos los campos.");
      return;
    }
  
    // Validar si los datos de la tarjeta están completos
    if (metodoPago === "tarjeta" && (!datosTarjeta.numero || !datosTarjeta.vencimiento || !datosTarjeta.cvv)) {
      alert("Por favor complete los datos de la tarjeta.");
      return;
    }
  
    setProcesando(true);
  
    // Usar .toISOString() para asegurar el formato correcto
    const hoy = new Date().toISOString(); // Usar formato ISO 8601
    setFechaPago(hoy);
  
    try {
      // Actualizar el stock de los productos comprados
      for (const item of carrito) {
        const { data: productoActual, error: fetchError } = await supabase
          .from("productos")
          .select("stock")
          .eq("id", item.id)
          .single();
  
        if (fetchError) {
          console.error("Error al obtener el producto:", fetchError);
          continue;
        }
  
        const nuevoStock = productoActual.stock - item.cantidad;
        if (nuevoStock < 0) {
          alert(`No hay suficiente stock para ${item.nombre}`);
          continue;
        }
  
        const { error: updateError } = await supabase
          .from("productos")
          .update({ stock: nuevoStock })
          .eq("id", item.id);
  
        if (updateError) {
          console.error("Error al actualizar el stock:", updateError);
          continue;
        }
      }
  
      // Insertar datos en historial_compras
      const { error } = await supabase.from("historial_compras").insert([{
        nombre_completo: `${usuario.nombre} ${usuario.apellido}`,
        telefono: usuario.telefono,
        direccion: usuario.tipoEntrega === "delivery" ? usuario.direccion : "Retiro en tienda",
        tipo_entrega: usuario.tipoEntrega,
        metodo_pago: metodoPago,
        productos: JSON.stringify(carrito),
        total,
        fecha: hoy, // Usar la fecha en formato ISO
      }]);
  
      if (error) {
        throw new Error("Error al guardar la compra en historial_compras: " + error.message);
      }
  
      // Limpiar el carrito y procesar la redirección
      localStorage.removeItem("carrito");
      setTimeout(() => {
        setProcesando(false);
        setPagoExitoso(true);
        setTimeout(() => navigate("/gracias"), 2500);
      }, 2000);
    } catch (err) {
      console.error("Error en el proceso de pago:", err);
      alert("Hubo un error procesando el pago. Por favor, intentalo más tarde.");
      setProcesando(false);
    }
  };
  

  const cancelarPago = () => navigate("/carrito");

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h2 className="text-4xl font-bold mb-6 text-center text-[#22c55e]">Confirmación de Pago</h2>
      {procesando ? (
        <div className="text-center mt-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mx-auto mb-4"></div>
          <h3 className="text-xl text-green-400">Procesando tu pago...</h3>
          <p className="text-gray-400 mt-2">Por favor espera unos segundos.</p>
        </div>
      ) : pagoExitoso ? (
        <div className="text-center mt-20">
          <h3 className="text-2xl font-bold text-green-400 mb-4">¡Pago exitoso!</h3>
          <p className="text-gray-300">Gracias por tu compra. Serás redirigido...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Formulario Detallado */}
          <div className="bg-gray-900 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-4 text-[#22c55e]">Detalles de Facturación</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Nombre *</label>
                <input
                  type="text"
                  className="p-3 w-full rounded bg-gray-800 text-white"
                  value={usuario.nombre}
                  onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Apellido *</label>
                <input
                  type="text"
                  className="p-3 w-full rounded bg-gray-800 text-white"
                  value={usuario.apellido}
                  onChange={(e) => setUsuario({ ...usuario, apellido: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Teléfono (WhatsApp) *</label>
                <input
                  type="text"
                  className="p-3 w-full rounded bg-gray-800 text-white"
                  value={usuario.telefono}
                  onChange={(e) => setUsuario({ ...usuario, telefono: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Tipo de Entrega *</label>
                <div className="flex gap-2 mt-1">
                  <button
                    className={`px-4 py-2 rounded ${usuario.tipoEntrega === "tienda" ? "bg-[#22c55e]" : "bg-gray-700"}`}
                    onClick={() => setUsuario({ ...usuario, tipoEntrega: "tienda" })}
                  >
                    Retiro en Tienda
                  </button>
                  <button
                    className={`px-4 py-2 rounded ${usuario.tipoEntrega === "delivery" ? "bg-[#22c55e]" : "bg-gray-700"}`}
                    onClick={() => setUsuario({ ...usuario, tipoEntrega: "delivery" })}
                  >
                    Delivery
                  </button>
                </div>
              </div>
              {usuario.tipoEntrega === "delivery" && (
                <div className="col-span-2">
                  <label className="text-sm text-gray-400">Dirección completa *</label>
                  <input
                    type="text"
                    className="p-3 w-full rounded bg-gray-800 text-white"
                    value={usuario.direccion}
                    onChange={(e) => setUsuario({ ...usuario, direccion: e.target.value })}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Detalle del Carrito */}
          <div className="bg-gray-900 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-4 text-[#22c55e]">Resumen de Compra</h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2">Producto</th>
                  <th className="py-2">Cantidad</th>
                  <th className="py-2">Precio</th>
                  <th className="py-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item) => (
                  <tr key={item.id} className="border-b border-gray-800">
                    <td className="py-2">{item.nombre}</td>
                    <td className="py-2">{item.cantidad}</td>
                    <td className="py-2">${item.precio.toFixed(2)}</td>
                    <td className="py-2">${(item.precio * item.cantidad).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="py-2 font-semibold text-right">Total</td>
                  <td className="py-2 font-bold text-green-400">${total.toFixed(2)}</td>
                </tr>
                {fechaPago && (
                  <tr>
                    <td colSpan="4" className="py-2 text-right text-sm text-gray-400">Pago realizado el: {fechaPago}</td>
                  </tr>
                )}
              </tfoot>
            </table>
          </div>

          {/* Método de Pago */}
          <div className="bg-gray-900 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-4 text-[#22c55e]">Método de Pago</h3>
            <div className="space-y-2">
              <div
                onClick={() => setMetodoPago("tarjeta")}
                className={`flex items-center gap-4 p-3 border rounded cursor-pointer ${metodoPago === "tarjeta" ? "bg-[#22c55e] text-white" : "bg-gray-800"}`}
              >
                <FiCreditCard className="text-2xl" />
                <span>Tarjeta de Crédito / Débito</span>
              </div>
              <div
                onClick={() => setMetodoPago("efectivo")}
                className={`flex items-center gap-4 p-3 border rounded cursor-pointer ${metodoPago === "efectivo" ? "bg-[#22c55e] text-white" : "bg-gray-800"}`}
              >
                <FiDollarSign className="text-2xl" />
                <span>Efectivo (Contra entrega)</span>
              </div>
              {metodoPago === "tarjeta" && (
                <div className="mt-4">
                  <label className="text-sm text-gray-400">Número de Tarjeta</label>
                  <input
                    type="text"
                    className="p-3 w-full rounded bg-gray-800 text-white"
                    value={datosTarjeta.numero}
                    onChange={(e) => setDatosTarjeta({ ...datosTarjeta, numero: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="text-sm text-gray-400">Fecha de Vencimiento</label>
                      <input
                        type="text"
                        className="p-3 w-full rounded bg-gray-800 text-white"
                        value={datosTarjeta.vencimiento}
                        onChange={(e) => setDatosTarjeta({ ...datosTarjeta, vencimiento: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">CVV</label>
                      <input
                        type="text"
                        className="p-3 w-full rounded bg-gray-800 text-white"
                        value={datosTarjeta.cvv}
                        onChange={(e) => setDatosTarjeta({ ...datosTarjeta, cvv: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={cancelarPago}
              className="py-3 px-6 bg-gray-600 text-white rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={confirmarPago}
              className="py-3 px-6 bg-[#22c55e] text-white rounded-md"
            >
              Confirmar Pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
}