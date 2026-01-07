import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api.service';
import { 
  ArrowLeft, 
  Wifi, 
  Monitor, 
  Computer,
  Users,
  Clock,
  MapPin,
  Calendar,
  Star
} from 'lucide-react';

const LaboratorioDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [laboratorio, setLaboratorio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchLaboratorio();
    }
  }, [id]);

  const fetchLaboratorio = async () => {
    try {
      const response = await apiService.get(`/obtener_laboratorio1/${id}`);
      const data = await response.json();
      setLaboratorio(data);
    } catch (error) {
      console.error('Error fetching laboratorio:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLabIcon = (nombre) => {
    if (nombre?.toLowerCase().includes('redes')) return Wifi;
    if (nombre?.toLowerCase().includes('software')) return Monitor;
    return Computer;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ulima-orange"></div>
      </div>
    );
  }

  if (!laboratorio) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Laboratorio no encontrado</h1>
          <p className="text-gray-600 mb-6">El laboratorio que buscas no existe o ha sido eliminado.</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const images = [laboratorio.foto1, laboratorio.foto2, laboratorio.foto3].filter(Boolean);
  const Icon = getLabIcon(laboratorio.nombre);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              Volver
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
                {images.length > 0 && (
                  <img
                    src={images[currentImageIndex]}
                    alt={laboratorio.nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
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
                        alt={`${laboratorio.nombre} ${index + 1}`}
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
                    {laboratorio.nombre}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-500 fill-current" />
                      <span>4.8</span>
                    </div>
                    <span>•</span>
                    <span>25 reseñas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Descripción
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {laboratorio.descripcion}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Características y Equipamiento
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-ulima-orange/10 rounded-lg flex items-center justify-center">
                    <Users size={20} className="text-ulima-orange" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Capacidad</p>
                    <p className="text-sm text-gray-600">25 estudiantes</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-ulima-orange/10 rounded-lg flex items-center justify-center">
                    <Monitor size={20} className="text-ulima-orange" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Equipos</p>
                    <p className="text-sm text-gray-600">25 computadoras</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-ulima-orange/10 rounded-lg flex items-center justify-center">
                    <MapPin size={20} className="text-ulima-orange" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Ubicación</p>
                    <p className="text-sm text-gray-600">Edificio A, Piso 2</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-ulima-orange/10 rounded-lg flex items-center justify-center">
                    <Wifi size={20} className="text-ulima-orange" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Conectividad</p>
                    <p className="text-sm text-gray-600">WiFi de alta velocidad</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Disponibilidad
                </h2>
                <span className="text-sm text-green-600 font-medium">
                  Disponible ahora
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Lunes a Viernes</p>
                    <p className="text-sm text-gray-600">7:00 AM - 9:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sábados</p>
                    <p className="text-sm text-gray-600">8:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/disponibilidad" className="btn-primary">
                Reservar Espacio
              </Link>
              <button className="btn-secondary">
                Agendar Visita
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaboratorioDetalle;