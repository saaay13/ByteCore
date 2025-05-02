import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Participantes from "./components/Participantes";
import Carreras from "./components/Carreras";
import Donaciones from "./components/Donaciones";
import Layout from "./layout/Layout";
import DonacionesDetalle from "./components/DonacionesDetalle";
import Registro from "./components/Registro";



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

      {/* Participantes con Layout */}
      <Route
        path="/participantes"
        element={
          <Layout>
            <Participantes />
          </Layout>
        }
      />

      {/* Carreras con Layout */}
      <Route
        path="/carreras"
        element={
          <Layout>
            <Carreras />
          </Layout>
        }
      />

      {/* Donaciones con Layout */}
      <Route
        path="/donaciones"
        element={
          <Layout>
            <Donaciones />
          </Layout>
        }
      />
        {/* 👇 Ruta para ver el detalle de una donación */}
        <Route
                path="/donaciones/:id"
                element={
                  <Layout>
                    <DonacionesDetalle />
                  </Layout>
                }
              />
        <Route path="/registro" element={<Registro />} />
      

    </Routes>
  );
}
