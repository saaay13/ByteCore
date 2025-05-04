import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Info from "./components/Info";
import Layout from "./layout/Layout";
import Registro from "./components/Registro";
import AgregarProducto from "./components/AgregarProducto";
import ProductosList from "./components/ProductosList";
import CategoriaMenu from "./components/CategoriaMenu";
import ProductosDetalle from "./components/ProductosDetalle";

export default function App() {
  return (
    <Routes>
      {/* Login sin Layout */}
      <Route path="/" element={<Login />} />

      {/* Dashboard con Layout */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />

      {/* Info con Layout */}
      <Route
        path="/info"
        element={
          <Layout>
            <Info />
          </Layout>
        }
      />

      {/* Carreras con Categorias */}
      <Route path="/categorias" element={<Layout><CategoriaMenu /></Layout>} />


      {/* Donaciones con List*/}
      <Route
        path="/productoslist"
        element={
          <Layout>
            <ProductosList />
          </Layout>
        }
      />
      {/* 👇 Detalle de Donación */}
        <Route
          path="/producto/:id"
          element={
            <Layout>
              <ProductosDetalle />
            </Layout>
          }
        />


      {/* Registro sin Layout */}
      <Route path="/registro" element={<Registro />} />

      {/* Agregar Producto con Layout */}
      <Route
        path="/agregar"
        element={
          <Layout>
            <AgregarProducto />
          </Layout>
        }
      />
    </Routes>
  );
}
