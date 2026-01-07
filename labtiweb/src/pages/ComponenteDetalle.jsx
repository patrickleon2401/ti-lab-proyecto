import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api.service';
import {
  ArrowLeft,
  Download,
  Eye,
  BookOpen,
  Settings,
  Wifi,
  Monitor,
  Cpu,
  Star,
  Users,
  Clock,
  Calendar,
  FileText,
  Share2,
  Heart,
  MessageSquare
} from 'lucide-react';

const ComponenteDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [componente, setComponente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      fetchComponente();
    }
  }, [id]);

  const fetchComponente = async () => {
    try {
      const response = await apiService.get(`/obtener_componente1/${id}`);
      const data = await response.json();
      setComponente(data);
    } catch (error) {
      console.error('Error fetching componente:', error);
    } finally {
      setLoading(false);
    }
  };

  const getComponentIcon = (nombre) => {
    if (nombre?.toLowerCase().includes('router')) return Settings;
    if (nombre?.toLowerCase().includes('switch')) return Settings;
    if (nombre?.toLowerCase().includes('access')) return Wifi;
    return Cpu;
  };

  const handleDownload = (manual) => {
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

  if (!componente) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Componente no encontrado</h1>
          <p className="text-gray-600 mb-6">El componente que buscas no existe o ha sido eliminado.</p>
          <button onClick={() => navigate('/Manuales')} className="btn-primary">
            Volver a componentes
          </button>
        </div>
      </div>
    );
  }

  const images = componente.fotos || [];
  const Icon = getComponentIcon(componente.nombre);

  const tabs = [
    { id: 'overview', label: 'Descripción', icon: Eye },
    { id: 'manuales', label: 'Manuales', icon: BookOpen, count: componente.manuales.length },
    { id: 'specs', label: 'Especificaciones', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/Manuales')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              Volver a componentes
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                {images.length > 0 ? (
                  <img
                    src={images[currentImageIndex]}
                    alt={componente.nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                    <Icon size={64} className="text-white" />
                  </div>
                )}
                
                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => 
                        prev === 0 ? images.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => 
                        prev === images.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ArrowLeft size={16} className="rotate-180" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Image Thumbnails */}
              {images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index 
                          ? 'border-ulima-orange' 
                          : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={images[index]}
                        alt={`${componente.nombre} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-ulima-orange rounded-lg flex items-center justify-center">
                  <Icon size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {componente.nombre}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-500 fill-current" />
                      <span>4.9</span>
                    </div>
                    <span>•</span>
                    <span>156 reseñas</span>
                    <span>•</span>
                    <span>500+ descargas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="btn-primary">
                  <Download size={16} />
                  Descargar todo
                </button>
                <button className="btn-secondary">
                  <Share2 size={16} />
                  Compartir
                </button>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <MessageSquare size={20} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => {
                  const TabIcon = tab.icon;
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
                      <TabIcon size={18} />
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
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Descripción del Componente
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {componente.descripcion}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-ulima-orange/10 rounded-lg flex items-center justify-center">
                        <Users className="text-ulima-orange" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Compatible con</p>
                        <p className="text-sm text-gray-600">Múltiples protocolos</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-ulima-orange/10 rounded-lg flex items-center justify-center">
                        <Monitor className="text-ulima-orange" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Interfaz</p>
                        <p className="text-sm text-gray-600">Web y CLI</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-ulima-orange/10 rounded-lg flex items-center justify-center">
                        <Wifi className="text-ulima-orange" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Conectividad</p>
                        <p className="text-sm text-gray-600">Ethernet, WiFi</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-ulima-orange/10 rounded-lg flex items-center justify-center">
                        <Settings className="text-ulima-orange" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Configuración</p>
                        <p className="text-sm text-gray-600">Plug & Play</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'manuales' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Manuales Disponibles
                    </h3>
                    <button className="text-ulima-orange hover:text-ulima-orange-dark text-sm font-medium">
                      Descargar todos
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {componente.manuales.map((manual) => (
                      <div key={manual.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 bg-ulima-orange/10 rounded-lg flex items-center justify-center">
                            <FileText className="text-ulima-orange" size={20} />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{manual.titulo}</h4>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span>PDF</span>
                              <span>•</span>
                              <span>~3.2 MB</span>
                              <span>•</span>
                              <span>Actualizado: Hoy</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-ulima-orange hover:bg-ulima-orange/10 rounded-lg transition-colors">
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDownload(manual)}
                            className="btn-primary"
                          >
                            <Download size={16} />
                            Descargar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Especificaciones Técnicas
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Modelo</p>
                        <p className="text-gray-900">Enterprise Plus</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Fabricante</p>
                        <p className="text-gray-900">Cisco Systems</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Velocidad</p>
                        <p className="text-gray-900">1 Gbps</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Puertos</p>
                        <p className="text-gray-900">24 x Gigabit</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Memoria</p>
                        <p className="text-gray-900">512 MB RAM</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Alimentación</p>
                        <p className="text-gray-900">100-240V AC</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Dimensiones</p>
                        <p className="text-gray-900">44 x 44.5 x 4.45 cm</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Peso</p>
                        <p className="text-gray-900">3.4 kg</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">Protocolos Soportados</p>
                      <div className="flex flex-wrap gap-2">
                        {['TCP/IP', 'HTTP/HTTPS', 'SNMP', 'SSH', 'Telnet', 'RADIUS', 'TACACS+', 'VLAN', 'STP', 'RSTP', 'MSTP', 'OSPF', 'EIGRP', 'BGP'].map((protocol) => (
                          <span key={protocol} className="px-2 py-1 bg-ulima-orange/10 text-ulima-orange text-xs font-medium rounded-full">
                            {protocol}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-gray-600">Publicado: Hace 1 mes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-gray-600">Última actualización: Hoy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponenteDetalle;