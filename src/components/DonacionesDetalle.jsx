import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function DonacionDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donacion, setDonacion] = useState(null);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", monto: "" });

  useEffect(() => {
    const fetchDonacion = async () => {
      const { data, error } = await supabase
        .from("donaciones")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error:", error.message);
      } else {
        setDonacion(data);
        setFormData({ nombre: data.nombre, monto: data.monto });
      }
    };

    fetchDonacion();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("donaciones")
      .update({
        nombre: formData.nombre,
        monto: parseFloat(formData.monto),
      })
      .eq("id", id);

    if (!error) {
      setEditando(false);
      setDonacion({ ...donacion, ...formData });
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("¿Estás seguro de eliminar esta donación?");
    if (!confirm) return;

    const { error } = await supabase.from("donaciones").delete().eq("id", id);

    if (!error) {
      alert("Donación eliminada.");
      navigate("/donaciones");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const contenido = `
      <h2>Detalle de la Donación</h2>
      <p><strong>Nombre:</strong> ${donacion.nombre}</p>
      <p><strong>Monto:</strong> Bs ${parseFloat(donacion.monto).toFixed(2)}</p>
      <p><strong>Fecha:</strong> ${new Date(donacion.created_at).toLocaleString()}</p>
    `;
    const blob = new Blob([contenido], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donacion_${id}.html`;
    a.click();
  };

  if (!donacion) return <p className="text-center mt-10 text-white">Cargando donación...</p>;

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-[#383854] text-white shadow-xl rounded-xl border border-white/10">
      <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">Detalle de la Donación</h2>

      {!editando ? (
        <>
          <p><strong>Nombre:</strong> {donacion.nombre}</p>
          <p><strong>Monto:</strong> Bs {parseFloat(donacion.monto).toFixed(2)}</p>
          <p><strong>Fecha:</strong> {new Date(donacion.created_at).toLocaleString()}</p>
        </>
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
          />
          <input
            type="number"
            name="monto"
            step="0.01"
            value={formData.monto}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            Guardar Cambios
          </button>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-4">
        <button
          onClick={handlePrint}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Imprimir
        </button>
        <button
          onClick={handleExport}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Exportar HTML
        </button>
        {!editando && (
          <button
            onClick={() => setEditando(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-800"
          >
            Editar
          </button>
        )}
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
