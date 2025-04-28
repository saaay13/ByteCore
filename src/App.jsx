import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Carreras from "./components/Carreras";
import Layout from "./layout/Layout";

export default function App() {
  return (
    <Routes>
      {/* Ruta de Login sin Layout */}
      <Route path="/" element={<Login />} />

      {/* Ruta de Dashboard con Layout */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />

      {/* Ruta de Carreras con Layout */}
      <Route
        path="/carreras"
        element={
          <Layout>
            <Carreras />
          </Layout>
        }
      />


    </Routes>
  );
}
