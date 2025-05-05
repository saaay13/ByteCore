import React, { useState } from 'react';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    setTimeout(() => {
      setSuccess('¡Cuenta creada! J');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#1F1D2B] flex items-center justify-center px-4">
      <div className="bg-[#2D2B3A] px-10 py-12 rounded-xl shadow-xl w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-extrabold text-center text-white mb-8">Crear Cuenta</h1>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-gray-400 font-medium mb-2">Nombre completo</label>
            <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2 bg-[#1F1D2B]">
              <FiUser className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Juan Pérez"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-transparent text-white outline-none placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 font-medium mb-2">Nombre de usuario</label>
            <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2 bg-[#1F1D2B]">
              <FiUser className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-transparent text-white outline-none placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 font-medium mb-2">Correo electrónico</label>
            <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2 bg-[#1F1D2B]">
              <FiMail className="text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="usuario@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent text-white outline-none placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 font-medium mb-2">Contraseña</label>
            <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2 bg-[#1F1D2B]">
              <FiLock className="text-gray-500 mr-2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent text-white outline-none placeholder-gray-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#22c55e] hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300"
          >
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </button>

          {error && (
            <div className="text-center mt-4 text-sm text-red-500">{error}</div>
          )}
          {success && (
            <div className="text-center mt-4 text-sm text-green-500">{success}</div>
          )}
        </form>

        <p className="text-center mt-6 text-sm text-gray-400">
          ¿Ya tienes una cuenta?{' '}
          <a href="/" className="text-green-400 hover:underline">
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>
  );
}
