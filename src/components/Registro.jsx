import React, { useState } from 'react';
import { supabase } from '../supabase';  // Asegúrate de importar tu instancia de Supabase
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

    // Paso 1: Crear cuenta en Supabase Auth
    const { user, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message);
      return;
    }

    // Verificar que el usuario está autenticado
    if (!user) {
      setLoading(false);
      setError('No se pudo obtener el ID del usuario. Revisa tu correo y confirma tu cuenta.');
      return;
    }

    // Paso 2: Obtener el ID del usuario
    const userId = user.id;

    // Paso 3: Insertar datos adicionales en la tabla "perfiles"
    const { data, error: insertError } = await supabase
      .from('perfiles')
      .insert([
        {
          user_id: userId,  
          nombre: fullName,  
          apellido: username, 
          email: email,  
          direccion: '',  
          telefono: '', 
          fecha_nacimiento: null, 
        },
      ]);

    if (insertError) {
      setLoading(false);
      setError(insertError.message);
    } else {
      setSuccess('¡Cuenta creada! Revisa tu correo para confirmar.');
      navigate('/');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#1F1D2B] flex items-center justify-center px-4">
      <div className="bg-[#2D2B3A] px-10 py-12 rounded-xl shadow-xl w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-extrabold text-center text-white mb-8">Crear Cuenta</h1>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Campo nombre completo */}
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

          {/* Campo usuario */}
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

          {/* Correo */}
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

          {/* Contraseña */}
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

          {/* Botón registrar */}
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
