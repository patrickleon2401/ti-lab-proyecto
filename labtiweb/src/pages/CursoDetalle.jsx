import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api.service';
import {
  ArrowLeft,
  BookOpen,
  Download,
  Clock,
  Users,
  Calendar,
  FileText,
  PlayCircle,
  CheckCircle,
  Award,
  BarChart
} from 'lucide-react';

const CursoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState(null);
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('materiales');

  useEffect(() => {
    if (id) {
      fetchCurso();
      fetchMateriales();
    }
  }, [id]);

  const fetchCurso = async () => {
    try {
      const response = await apiService.get('/obtener_cursos');
      const cursos = await response.json();
      const cursoData = cursos.find(c => c.id === parseInt(id));
      setCurso(cursoData);
    } catch (error) {
      console.error('Error fetching curso:', error);
    }
  };

  const fetchMateriales = async () => {
    try {
      const response = await apiService.post('/obtener_materiales_por_curso', {
        curso_id: parseInt(id)
      });
      const data = await response.json();
      setMateriales(data);
    } catch (error) {
      console.error('Error fetching materiales:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (!curso) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Curso no encontrado</h1>
          <p className="text-gray-600 mb-6">El curso que buscas no existe o ha sido eliminado.</p>
          <button onClick={() => navigate('/Cursos')} className="btn-primary">
            Volver a cursos
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'materiales', label: 'Materiales', icon: FileText, count: materiales.length },
    { id: 'info', label: 'Información', icon: BookOpen, count: null },
    { id: 'progress', label: 'Progreso', icon: BarChart, count: null }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/Cursos')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              Volver a cursos
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  ACTIVO
                </span>
                <span className="px-3 py-1 bg-yellow-400/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  POPULAR
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                {curso.nombre}
              </h1>
              
              <p className="text-xl text-white/90 mb-6">
                Curso especializado con enfoque práctico y proyectos reales del sector tecnológico.
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">16</div>
                  <div className="text-sm text-white/80">Semanas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">25</div>
                  <div className="text-sm text-white/80">Estudiantes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.8</div>
                  <div className="text-sm text-white/80">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-white/80">Práctico</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <BookOpen size={64} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg border border-gray-200 mb-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-ulima-orange text-ulima-orange'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                  {tab.count !== null && (
                    <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'materiales' && (
              <div className="space-y-4">
                {materiales.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Materiales del curso
                      </h3>
                      <span className="text-sm text-gray-500">
                        {materiales.length} archivos disponibles
                      </span>
                    </div>
                    
                    {materiales.map((material) => (
                      <div key={material.id} className="card hover:shadow-md transition-shadow">
                        <div className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="w-12 h-12 bg-ulima-orange/10 rounded-lg flex items-center justify-center">
                                <FileText className="text-ulima-orange" size={24} />
                              </div>
                              
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-1">
                                  {material.nombre}
                                </h4>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span>PDF</span>
                                  <span>•</span>
                                  <span>~2.5 MB</span>
                                  <span>•</span>
                                  <span>Actualizado recientemente</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDownload(material)}
                                className="btn-secondary"
                              >
                                <Download size={16} />
                                Descargar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No hay materiales disponibles
                    </h3>
                    <p className="text-gray-600">
                      Este curso no tiene materiales publicados aún.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'info' && (
              <div className="space-y-6">
                <div className="card">
                  <div className="card-body">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Descripción del curso
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Este curso ofrece una formación completa en las tecnologías más demandadas del mercado actual. 
                      Aprenderás través de proyectos prácticos y casos reales que te prepararán para los desafíos profesionales.
                    </p>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">Objetivos de aprendizaje</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-green-500 mt-0.5" size={16} />
                        <span>Dominar los fundamentos teóricos y prácticos del área</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-green-500 mt-0.5" size={16} />
                        <span>Aplicar conocimientos en proyectos del mundo real</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-green-500 mt-0.5" size={16} />
                        <span>Desarrollar habilidades de resolución de problemas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-green-500 mt-0.5" size={16} />
                        <span>Prepararse para certificaciones profesionales</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Requisitos previos
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-green-500 mt-0.5" size={16} />
                        <span>Conocimientos básicos de informática</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-green-500 mt-0.5" size={16} />
                        <span>Compromiso con el aprendizaje continuo</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-6">
                <div className="card">
                  <div className="card-body">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Tu progreso
                    </h3>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progreso general</span>
                        <span className="text-sm font-medium text-gray-900">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-ulima-orange h-3 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-ulima-orange">8</div>
                        <div className="text-sm text-gray-600">Módulos completados</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-400">5</div>
                        <div className="text-sm text-gray-600">Módulos pendientes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">3.8</div>
                        <div className="text-sm text-gray-600">Promedio de notas</div>
                      </div>
                    </div>

                    <h4 className="font-semibold text-gray-900 mb-3">Actividad reciente</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="text-green-500" size={20} />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Módulo 8 completado</p>
                          <p className="text-sm text-gray-500">Hace 2 días</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <PlayCircle className="text-ulima-orange" size={20} />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Módulo 9 en progreso</p>
                          <p className="text-sm text-gray-500">Ayer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info */}
            <div className="card">
              <div className="card-body">
                <h3 className="font-semibold text-gray-900 mb-4">Información del curso</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Duración</p>
                      <p className="text-sm text-gray-600">16 semanas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Estudiantes</p>
                      <p className="text-sm text-gray-600">25 inscritos</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Horario</p>
                      <p className="text-sm text-gray-600">Martes y Jueves 6-9 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructor */}
            <div className="card">
              <div className="card-body">
                <h3 className="font-semibold text-gray-900 mb-4">Instructor</h3>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-ulima-orange rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">JD</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Juan Díaz</p>
                    <p className="text-sm text-gray-600">Profesor titular</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">
                  Más de 10 años de experiencia en el sector tecnológico y educativo.
                </p>
              </div>
            </div>

            {/* Certificate */}
            <div className="card">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="text-yellow-500" size={24} />
                  <h3 className="font-semibold text-gray-900">Certificado</h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  Al completar el curso, recibirás un certificado digital reconocido.
                </p>
                
                <button className="w-full btn-secondary">
                  Ver requerimientos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CursoDetalle;