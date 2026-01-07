import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import {
  Users,
  BookOpen,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Search,
  Filter
} from 'lucide-react';

const AdminInterface = () => {
  const { isAuthenticated, isAdmin, user } = useAuth();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  const stats = [
    { label: 'Total Usuarios', value: '156', icon: Users, color: 'text-blue-600' },
    { label: 'Cursos Activos', value: '12', icon: BookOpen, color: 'text-green-600' },
    { label: 'Reservas Hoy', value: '28', icon: Calendar, color: 'text-ulima-orange' },
    { label: 'Materiales', value: '89', icon: FileText, color: 'text-purple-600' }
  ];

  const recentActivities = [
    { id: 1, user: 'María García', action: 'reservó Laboratorio de Redes', time: 'Hace 5 min', type: 'reservation' },
    { id: 2, user: 'Juan Pérez', action: 'descargó manual de Router', time: 'Hace 15 min', type: 'download' },
    { id: 3, user: 'Ana López', action: 'se inscribió a Redes de Computadoras', time: 'Hace 30 min', type: 'enrollment' },
    { id: 4, user: 'Carlos Rodríguez', action: 'subió nuevo material', time: 'Hace 1 hora', type: 'upload' }
  ];

  const quickActions = [
    { title: 'Agregar Curso', description: 'Crear nuevo curso', icon: Plus, color: 'bg-blue-600' },
    { title: 'Subir Material', description: 'Añadir PDF o documento', icon: Upload, color: 'bg-green-600' },
    { title: 'Gestionar Usuarios', description: 'Administrar cuentas', icon: Users, color: 'bg-purple-600' },
    { title: 'Ver Reportes', description: 'Estadísticas y análisis', icon: BarChart3, color: 'bg-ulima-orange' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'reservation': return Calendar;
      case 'download': return Download;
      case 'enrollment': return BookOpen;
      case 'upload': return Upload;
      default: return Settings;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'reservation': return 'text-blue-600 bg-blue-50';
      case 'download': return 'text-green-600 bg-green-50';
      case 'enrollment': return 'text-purple-600 bg-purple-50';
      case 'upload': return 'text-ulima-orange bg-ulima-orange/10';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel Administrativo</h1>
              <p className="text-gray-600">Bienvenido, {user?.nombre}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                <Search size={18} />
                <span>Buscar</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter size={18} />
                <span>Filtrar</span>
              </button>
              <button className="btn-primary">
                <Plus size={18} />
                Nueva Acción
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gray-50`}>
                    <Icon className={stat.color} size={24} />
                  </div>
                  <span className="text-sm text-gray-500">+12%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Acciones Rápidas</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-left group"
                    >
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Management Tables */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Gestión de Contenido</h2>
                <button className="text-ulima-orange hover:text-ulima-orange-dark text-sm font-medium">
                  Ver todo
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button className="pb-2 px-1 border-b-2 border-ulima-orange text-ulima-orange font-medium">
                  Cursos
                </button>
                <button className="pb-2 px-1 text-gray-600 hover:text-gray-900 font-medium">
                  Materiales
                </button>
                <button className="pb-2 px-1 text-gray-600 hover:text-gray-900 font-medium">
                  Usuarios
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="pb-3">Nombre</th>
                      <th className="pb-3">Estado</th>
                      <th className="pb-3">Inscritos</th>
                      <th className="pb-3">Actualizado</th>
                      <th className="pb-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-700">
                    <tr className="border-t border-gray-100">
                      <td className="py-3 font-medium">Redes de Computadoras</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Activo
                        </span>
                      </td>
                      <td className="py-3">25</td>
                      <td className="py-3 text-gray-500">Hace 2 días</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-700">
                            <Edit size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-700">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="py-3 font-medium">Sistemas Operativos</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Activo
                        </span>
                      </td>
                      <td className="py-3">18</td>
                      <td className="py-3 text-gray-500">Hace 1 semana</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-700">
                            <Edit size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-700">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Actividad Reciente</h2>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getActivityColor(activity.type)}`}>
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span>
                          {' '}{activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <button className="w-full mt-4 text-center text-sm text-ulima-orange hover:text-ulima-orange-dark font-medium">
                Ver toda la actividad
              </button>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Estado del Sistema</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Backend</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Base de Datos</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Almacenamiento</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                    78% usado
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Último backup</span>
                  <span className="text-sm text-gray-500">Hace 2 horas</span>
                </div>
              </div>
              
              <button className="w-full mt-4 btn-secondary">
                Ver detalles
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-ulima-orange to-ulima-orange-dark text-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Resumen del Día</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Nuevos usuarios</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Reservas completadas</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Descargas</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Tasa de ocupación</span>
                  <span className="font-semibold">82%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInterface;