import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api.service';
import {
  Library,
  Search,
  Filter,
  Download,
  Eye,
  Settings,
  Wifi,
  Monitor,
  Cpu,
  ArrowRight,
  Star,
  BookOpen,
  Clock
} from 'lucide-react';

const Manuales = () => {
  const [componentes, setComponentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchComponentes();
  }, []);

  const fetchComponentes = async () => {
    try {
      const response = await apiService.get('/obtener_componentes');
      const data = await response.json();
      setComponentes(data);
    } catch (error) {
      console.error('Error fetching componentes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredComponentes = componentes.filter(componente => {
    const matchesSearch = componente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         componente.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || true; // Add category filtering when needed
    return matchesSearch && matchesCategory;
  });

  const getComponentIcon = (nombre) => {
    if (nombre?.toLowerCase().includes('router')) return Settings;
    if (nombre?.toLowerCase().includes('switch')) return Settings;
    if (nombre?.toLowerCase().includes('access')) return Wifi;
    return Cpu;
  };

  const handleDownload = (componente, manual) => {
    const downloadUrl = apiService.createDownloadUrl(manual.archivo);
    
    // Create download link
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = manual.archivo;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      {/* Header Section */}
      <div className="bg-gradient-to-r from-ulima-orange to-ulima-orange-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Manuales Técnicos y Componentes
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Accede a documentación técnica, guías de configuración y manuales de equipos
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar componentes o manuales..."
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
            <div className="text-2xl font-bold text-ulima-orange">{componentes.length}</div>
            <div className="text-sm text-gray-600">Componentes</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-ulima-orange">
              {componentes.reduce((acc, comp) => acc + comp.manuales.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Manuales</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-ulima-orange">1000+</div>
            <div className="text-sm text-gray-600">Descargas</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-ulima-orange">4.9</div>
            <div className="text-sm text-gray-600">Rating</div>
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
                onClick={() => setSelectedCategory('networking')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'networking'
                    ? 'bg-ulima-orange text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                Redes
              </button>
              <button
                onClick={() => setSelectedCategory('hardware')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'hardware'
                    ? 'bg-ulima-orange text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                Hardware
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Library size={16} />
            <span>{filteredComponentes.length} componentes encontrados</span>
          </div>
        </div>
      </div>

      {/* Components Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponentes.map((componente) => {
            const Icon = getComponentIcon(componente.nombre);
            return (
              <div key={componente.id} className="card group cursor-pointer hover:shadow-lg transition-all duration-300">
                {/* Component Header */}
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon size={48} className="text-white" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium">{componente.manuales.length} manuales</span>
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-ulima-orange rounded-lg flex items-center justify-center">
                        <Icon size={16} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-ulima-orange transition-colors">
                          {componente.nombre}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Star size={14} className="text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-500">4.9</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {componente.descripcion}
                  </p>
                  
                  {/* Manuals List */}
                  <div className="space-y-2 mb-4">
                    {componente.manuales.slice(0, 2).map((manual) => (
                      <div key={manual.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <BookOpen size={14} className="text-gray-400" />
                          <span className="text-sm text-gray-700 truncate">{manual.titulo}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(componente, manual);
                          }}
                          className="p-1 text-ulima-orange hover:text-ulima-orange-dark transition-colors"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    ))}
                    {componente.manuales.length > 2 && (
                      <div className="text-center text-sm text-gray-500">
                        +{componente.manuales.length - 2} manuales más
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock size={12} />
                      <span>Última actualización: Hoy</span>
                    </div>
                    
                    <Link
                      to={`/componentes/${componente.id}`}
                      className="inline-flex items-center gap-1 text-ulima-orange hover:text-ulima-orange-dark font-medium text-sm transition-colors"
                    >
                      Ver detalles
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredComponentes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Library size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No se encontraron componentes
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

      {/* Popular Manuals Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Manuales Más Descargados
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Accede a los manuales técnicos más populares entre nuestros estudiantes y profesionales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {componentes.flatMap(comp => comp.manuales).slice(0, 8).map((manual, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-ulima-orange/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-ulima-orange" size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{manual.titulo}</p>
                  <p className="text-xs text-gray-500">PDF • 2.5 MB</p>
                </div>
                <Download size={14} className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manuales;