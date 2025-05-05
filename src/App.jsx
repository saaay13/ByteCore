import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Info from "./components/Info";
import Layout from "./layout/Layout";
import AgregarProducto from "./components/AgregarProducto";
import ProductosList from "./components/ProductosList";
import CategoriaMenu from "./components/CategoriaMenu";
import ProductosDetalle from "./components/ProductosDetalle";
import Cuenta from "./components/Cuenta";
import Pago from "./components/Pago";
import Carrito from "./components/Carrito";
import Gracias from "./components/Gracias";
import ComprasDetalle from "./components/ComprasDetalle";
import Extra from "./components/Extra";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/info" element={<Layout><Info /></Layout>} />
      <Route path="/categorias" element={<Layout><CategoriaMenu /></Layout>} />
      <Route path="/productoslist" element={<Layout><ProductosList /></Layout>} />
      <Route path="/producto/:id" element={<Layout><ProductosDetalle /></Layout>} />
      <Route path="/agregar" element={<Layout><AgregarProducto /></Layout>} />
      <Route path="/micuenta" element={<Layout><Cuenta /></Layout>} />
      <Route path="/gracias" element={<Layout><Gracias /></Layout>} />
      <Route path="/terminos" element={<Layout><Extra /></Layout>} />
      <Route path="/privacidad" element={<Layout><Extra /></Layout>} />
      <Route path="/devoluciones" element={<Layout><Extra /></Layout>} />
      <Route path="/soporte" element={<Layout><Extra /></Layout>} />

      <Route path="/compras-detalle/:id" element={<Layout><ComprasDetalle /></Layout>} />
      <Route path="/pago" element={<Layout><Pago /></Layout>} />

      <Route path="/carrito" element={<Layout><Carrito /></Layout>} />


    </Routes>
  );
}
