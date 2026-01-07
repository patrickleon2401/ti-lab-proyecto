import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api.service';
import {
  BookOpen,
  Clock,
  Users,
  Star,
  ArrowRight,
  Search,
  Filter,
  TrendingUp
} from 'lucide-react';

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    try {
      const response = await apiService.get('/obtener_cursos');
      const data = await response.json();
      setCursos(data);
    } catch (error) {
      console.error('Error fetching cursos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCursos = cursos.filter(curso => {
    const matchesSearch = curso.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || true; // Add category filtering when needed
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ulima-orange"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-ulima-orange to-ulima-orange-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Cursos Académicos
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Explora nuestra oferta académica y accede a recursos digitales para cada curso
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-ulima-orange">{cursos.length}</div>
            <div className="text-sm text-gray-600">Cursos Disponibles</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-ulima-orange">150+</div>
            <div className="text-sm text-gray-600">Materiales</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-ulima-orange">25</div>
            <div className="text-sm text-gray-600">Profesores</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-ulima-orange">4.8</div>
            <div className="text-sm text-gray-600">Rating Promedio</div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter size={18} />
              <span>Filtrar</span>
            </button>
            
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-ulima-orange text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedCategory('programming')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'programming'
                    ? 'bg-ulima-orange text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                Programación
              </button>
              <button
                onClick={() => setSelectedCategory('networks')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'networks'
                    ? 'bg-ulima-orange text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                Redes
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp size={16} />
            <span>{filteredCursos.length} cursos encontrados</span>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCursos.map((curso) => (
            <div key={curso.id} className="card group cursor-pointer hover:shadow-lg transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen size={48} className="text-white" />
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-white text-sm font-medium">ACTIVO</span>
                </div>
              </div>
              
              <div className="card-body">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-ulima-orange transition-colors">
                  {curso.nombre}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  Curso especializado en tecnologías modernas y prácticas profesionales del área.
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>25 estudiantes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>16 semanas</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span>4.8</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-ulima-orange/10 text-ulima-orange text-xs font-medium rounded-full">
                      Tecnologías
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Práctico
                    </span>
                  </div>
                  
                  <Link
                    to={`/detalle-curso/${curso.id}`}
                    className="inline-flex items-center gap-1 text-ulima-orange hover:text-ulima-orange-dark font-medium text-sm transition-colors"
                  >
                    Ver curso
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCursos.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No se encontraron cursos
            </h3>
            <p className="text-gray-600 mb-4">
              Intenta con otros términos de búsqueda o ajusta los filtros
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn-secondary"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Necesitas ayuda para elegir?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nuestro asistente académico puede recomendarte los mejores cursos según tus intereses y objetivos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tilab-assistant" className="btn-primary">
              Hablar con Asistente
            </Link>
            <Link to="/Materiales" className="btn-secondary">
              Ver Materiales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cursos;