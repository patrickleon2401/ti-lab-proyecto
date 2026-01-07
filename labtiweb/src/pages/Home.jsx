import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api.service';
import { 
  Computer, 
  Wifi, 
  Monitor, 
  ArrowRight,
  Star,
  Users,
  BookOpen,
  Clock
} from 'lucide-react';

const Home = () => {
  const [laboratorios, setLaboratorios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLaboratorios();
  }, []);

  const fetchLaboratorios = async () => {
    try {
      const response = await apiService.get('/obtener_laboratorios');
      const data = await response.json();
      setLaboratorios(data);
    } catch (error) {
      console.error('Error fetching laboratorios:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLabIcon = (nombre) => {
    if (nombre.toLowerCase().includes('redes')) return Wifi;
    if (nombre.toLowerCase().includes('software')) return Monitor;
    return Computer;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ulima-orange"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-ulima-orange to-ulima-orange-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Laboratorios de Tecnología e Innovación
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Explora nuestros laboratorios especializados y accede a recursos de última generación 
              para potenciar tu aprendizaje en el mundo digital
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-ulima-orange">{laboratorios.length}</div>
            <div className="text-sm text-gray-600">Laboratorios</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-ulima-orange">500+</div>
            <div className="text-sm text-gray-600">Equipos</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-ulima-orange">50+</div>
            <div className="text-sm text-gray-600">Cursos</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-ulima-orange">24/7</div>
            <div className="text-sm text-gray-600">Acceso</div>
          </div>
        </div>
      </div>

      {/* Laboratories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nuestros Laboratorios
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre espacios diseñados para el aprendizaje práctico y el desarrollo de competencias tecnológicas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {laboratorios.map((lab) => {
            const Icon = getLabIcon(lab.nombre);
            return (
              <div key={lab.id} className="card group cursor-pointer hover:shadow-lg transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-ulima-orange to-ulima-orange-light relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon size={48} className="text-white" />
                  </div>
                </div>
                
                <div className="card-body">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-ulima-orange transition-colors">
                    {lab.nombre}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {lab.descripcion}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users size={16} />
                      <span>Capacidad: 25</span>
                    </div>
                    
                    <Link
                      to={`/detalle-laboratorio/${lab.id}`}
                      className="inline-flex items-center gap-1 text-ulima-orange hover:text-ulima-orange-dark font-medium text-sm transition-colors"
                    >
                      Explorar
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              ¿Por qué elegir LABS TI?
            </h3>
            <p className="text-gray-600">
              Descubre las ventajas de nuestra plataforma de laboratorios
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-ulima-orange/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Computer className="text-ulima-orange" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Tecnología Moderna</h4>
              <p className="text-gray-600 text-sm">
                Equipamiento actualizado con las últimas tecnologías del mercado
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-ulima-orange/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-ulima-orange" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Recursos Digitales</h4>
              <p className="text-gray-600 text-sm">
                Acceso a materiales, guías y tutoriales actualizados constantemente
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-ulima-orange/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="text-ulima-orange" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Flexibilidad Total</h4>
              <p className="text-gray-600 text-sm">
                Horarios adaptados a tus necesidades y disponibilidad extendida
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Listo para empezar?
          </h3>
          <p className="text-gray-600 mb-6">
            Explora todos nuestros recursos y comienza tu viaje tecnológico
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/Cursos" className="btn-primary">
              Ver Cursos
            </Link>
            <Link to="/disponibilidad" className="btn-secondary">
              Consultar Disponibilidad
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;