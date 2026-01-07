import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api.service';
import {
  FileText,
  Download,
  Search,
  Filter,
  BookOpen,
  Clock,
  Eye,
  Star,
  ArrowRight,
  Folder,
  Calendar,
  Tag
} from 'lucide-react';

const Materiales = () => {
  const [materiales, setMateriales] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  useEffect(() => {
    fetchMateriales();
    fetchCursos();
  }, []);

  const fetchMateriales = async () => {
    try {
      const response = await apiService.get('/obtener_materiales');
      const data = await response.json();
      setMateriales(data);
    } catch (error) {
      console.error('Error fetching materiales:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCursos = async () => {
    try {
      const response = await apiService.get('/obtener_cursos');
      const data = await response.json();
      setCursos(data);
    } catch (error) {
      console.error('Error fetching cursos:', error);
    }
  };

  const filteredMateriales = materiales.filter(material => {
    const matchesSearch = material.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || material.curso === parseInt(selectedCourse);
    return matchesSearch && matchesCourse;
  });

  const groupedMateriales = selectedCourse === 'all' 
    ? cursos.map(curso => ({
        curso,
        materiales: filteredMateriales.filter(m => m.curso === curso.id)
      })).filter(group => group.materiales.length > 0)
    : [{ 
        curso: cursos.find(c => c.id === parseInt(selectedCourse)), 
        materiales: filteredMateriales 
      }];

  const handleDownload = (material) => {
    const downloadUrl = apiService.createDownloadUrl(material.archivo);
    
    // Create download link
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = material.archivo;
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
              Biblioteca de Materiales
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Accede a guías, tutoriales y documentos de todos los cursos en un solo lugar
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar materiales..."
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
            <div className="text-2xl font-bold text-ulima-orange">{materiales.length}</div>
            <div className="text-sm text-gray-600">Materiales Totales</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-ulima-orange">{cursos.length}</div>
            <div className="text-sm text-gray-600">Cursos</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-ulima-orange">500+</div>
            <div className="text-sm text-gray-600">Descargas</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-ulima-orange">24/7</div>
            <div className="text-sm text-gray-600">Disponibilidad</div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <Filter size={18} />
              <span className="font-medium">Filtrar por curso:</span>
            </div>
            
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ulima-orange"
            >
              <option value="all">Todos los cursos</option>
              {cursos.map(curso => (
                <option key={curso.id} value={curso.id}>
                  {curso.nombre}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileText size={16} />
              <span>{filteredMateriales.length} materiales encontrados</span>
            </div>
            
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Cuadrícula
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Lista
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Materials Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {groupedMateriales.length > 0 ? (
          <div className="space-y-8">
            {groupedMateriales.map((group, index) => (
              <div key={index}>
                {/* Course Header */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Folder className="text-ulima-orange" size={24} />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {group.curso?.nombre || 'Sin curso asignado'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {group.materiales.length} materiales disponibles
                      </p>
                    </div>
                  </div>
                </div>

                {/* Materials Grid/List */}
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {group.materiales.map((material) => (
                      <div key={material.id} className="card hover:shadow-lg transition-shadow">
                        <div className="card-body">
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 bg-ulima-orange/10 rounded-lg flex items-center justify-center">
                              <FileText className="text-ulima-orange" size={20} />
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              PDF
                            </span>
                          </div>
                          
                          <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                            {material.nombre}
                          </h4>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Tag size={14} />
                              <span>Documento guía</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock size={14} />
                              <span>~15 min lectura</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDownload(material)}
                              className="btn-primary flex-1 text-sm"
                            >
                              <Download size={14} />
                              Descargar
                            </button>
                            <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                              <Eye size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nombre del Material
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Tipo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Tamaño
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actualizado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {group.materiales.map((material) => (
                            <tr key={material.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-ulima-orange/10 rounded-lg flex items-center justify-center">
                                    <FileText className="text-ulima-orange" size={16} />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {material.nombre}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                  PDF
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ~2.5 MB
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Hoy
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleDownload(material)}
                                    className="text-ulima-orange hover:text-ulima-orange-dark"
                                  >
                                    <Download size={16} />
                                  </button>
                                  <button className="text-gray-600 hover:text-gray-900">
                                    <Eye size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No se encontraron materiales
            </h3>
            <p className="text-gray-600 mb-4">
              No hay materiales disponibles para los filtros seleccionados.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCourse('all');
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
            ¿No encuentras lo que buscas?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Explora nuestros cursos o contacta con los instructores para obtener acceso a materiales adicionales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/Cursos" className="btn-primary">
              Ver cursos disponibles
            </Link>
            <Link to="/Manuales" className="btn-secondary">
              Explorar manuales técnicos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Materiales;