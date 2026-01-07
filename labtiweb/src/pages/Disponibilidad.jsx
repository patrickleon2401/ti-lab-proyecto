import React, { useState } from 'react';
import { disponibilidadMock } from '../data/mockData';
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Disponibilidad = () => {
  const [disponibilidad, setDisponibilidad] = useState(disponibilidadMock);
  const [selectedLab, setSelectedLab] = useState('all');
  const [currentWeek, setCurrentWeek] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const timeSlots = Array.from({ length: 16 }, (_, i) => i + 7); // 7:00 to 22:00
  
  const labs = [
    { id: 'all', name: 'Todos los laboratorios' },
    { id: 'lab1', name: 'Laboratorio de Redes' },
    { id: 'lab2', name: 'Laboratorio de Software' },
    { id: 'lab3', name: 'Laboratorio de Hardware' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'disponible':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'ocupado':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'mantenimiento':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'disponible':
        return <CheckCircle size={16} />;
      case 'ocupado':
        return <XCircle size={16} />;
      case 'mantenimiento':
        return <AlertCircle size={16} />;
      default:
        return null;
    }
  };

  const formatTime = (hour) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  const navigateWeek = (direction) => {
    setCurrentWeek(prev => prev + direction);
  };

  const getWeekRange = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (currentWeek * 7));
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return {
      start: startOfWeek.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
      end: endOfWeek.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
    };
  };

  const getFilteredDisponibilidad = () => {
    if (selectedLab === 'all') {
      return disponibilidad;
    }
    return disponibilidad; // Apply lab filtering when needed
  };

  // Simulate some occupied slots for demonstration
  const simulateAvailability = (dayIndex, timeIndex) => {
    const availability = ['disponible', 'disponible', 'ocupado', 'disponible', 'disponible', 'mantenimiento', 'disponible'];
    return availability[Math.floor(Math.random() * availability.length)];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-ulima-orange to-ulima-orange-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Disponibilidad de Laboratorios
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Consulta la disponibilidad en tiempo real y reserva tu espacio en los laboratorios
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar laboratorio o profesor..."
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
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-sm text-gray-600">Disponibles</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-red-600">8</div>
            <div className="text-sm text-gray-600">Ocupados</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <div className="text-sm text-gray-600">Mantenimiento</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-ulima-orange">22</div>
            <div className="text-sm text-gray-600">Total espacios</div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Filter size={20} className="text-gray-400" />
              <select
                value={selectedLab}
                onChange={(e) => setSelectedLab(e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ulima-orange"
              >
                {labs.map(lab => (
                  <option key={lab.id} value={lab.id}>
                    {lab.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateWeek(-1)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="text-center min-w-[150px]">
                <div className="text-sm text-gray-500">Semana del</div>
                <div className="font-semibold text-gray-900">
                  {getWeekRange().start} - {getWeekRange().end}
                </div>
              </div>
              
              <button
                onClick={() => navigateWeek(1)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight size={20} />
              </button>
              
              <button className="btn-secondary">
                Hoy
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Ocupado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Mantenimiento</span>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">
                    Hora
                  </th>
                  {getFilteredDisponibilidad().map((day, index) => (
                    <th key={index} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                      <div>{day.dia}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {timeSlots.map((hour, hourIndex) => (
                  <tr key={hourIndex} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" />
                        {formatTime(hour)}
                      </div>
                    </td>
                    {getFilteredDisponibilidad().map((day, dayIndex) => {
                      const status = simulateAvailability(dayIndex, hourIndex);
                      return (
                        <td key={dayIndex} className="px-2 py-2 whitespace-nowrap">
                          <button
                            className={`w-full px-3 py-2 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                              getStatusColor(status)
                            } ${status === 'disponible' ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed'}`}
                            disabled={status !== 'disponible'}
                          >
                            <div className="flex items-center justify-center gap-1 text-xs font-medium">
                              {getStatusIcon(status)}
                              <span className="capitalize">{status}</span>
                            </div>
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Reservations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Necesitas reservar un espacio?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Reserva fácilmente cualquier laboratorio disponible directamente desde el calendario. 
              Solo haz clic en un espacio disponible y completa el formulario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Reserva Rápida</h4>
              <p className="text-sm text-gray-600">
                Reserva en 3 simples pasos: selecciona, completa y confirma
              </p>
            </div>

            <div className="text-center p-6 bg-ulima-orange/10 rounded-lg border border-ulima-orange/20">
              <div className="w-12 h-12 bg-ulima-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-ulima-orange" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Reservas Grupales</h4>
              <p className="text-sm text-gray-600">
                Invita a tus compañeros y reserva espacios para proyectos en equipo
              </p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-blue-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Reservas Recurrentes</h4>
              <p className="text-sm text-gray-600">
                Programa reservas semanales para tus sesiones regulares de estudio
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disponibilidad;