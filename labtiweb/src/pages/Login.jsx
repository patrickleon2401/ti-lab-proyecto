import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Eye, EyeOff, Wifi, Monitor, Cpu, BookOpen, Award, Users } from 'lucide-react';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ulima-orange to-ulima-orange-light">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Login Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-ulima-orange font-bold text-xl">L</span>
                </div>
                <div className="text-white">
                  <h1 className="text-2xl font-bold">LABS TI</h1>
                  <p className="text-white/80 text-sm">Universidad de Lima</p>
                </div>
              </div>
              <p className="text-white/90">
                Plataforma de gestión de laboratorios y recursos tecnológicos
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 lg:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Bienvenido de vuelta
              </h2>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="tu@correo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="input-field pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-600">Recordarme</span>
                  </label>
                  <a href="#" className="text-ulima-orange hover:text-ulima-orange-dark">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </button>

                {/* Demo info */}
                <div className="p-3 bg-ulima-orange/10 border border-ulima-orange/20 rounded-lg text-sm">
                  <p className="text-ulima-orange-dark font-medium mb-1">Acceso Demo:</p>
                  <p className="text-gray-700">Email: admin@demo.cl</p>
                  <p className="text-gray-700">Contraseña: admin123</p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - Hero Content */}
        <div className="lg:w-1/2 bg-white/10 backdrop-blur-sm p-8 lg:p-12">
          <div className="max-w-2xl mx-auto text-white">
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Potencia tu aprendizaje tecnológico
              </h2>
              <p className="text-xl text-white/90">
                Accede a laboratorios especializados, recursos digitales y asistencia inteligente
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Monitor size={20} />
                  </div>
                  <h3 className="font-semibold">Laboratorios Modernos</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Equipamiento de última generación para prácticas especializadas
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <BookOpen size={20} />
                  </div>
                  <h3 className="font-semibold">Recursos Digitales</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Materiales actualizados y guías de estudio para todos los cursos
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Users size={20} />
                  </div>
                  <h3 className="font-semibold">Colaboración</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Trabaja en equipo y comparte conocimientos con compañeros
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Cpu size={20} />
                  </div>
                  <h3 className="font-semibold">Tecnología Avanzada</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Acceso a hardware y software de vanguardia tecnológica
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2">
              <Award className="text-yellow-300" size={20} />
              <span className="text-sm">
                Más de 10,000 estudiantes formados con éxito
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;