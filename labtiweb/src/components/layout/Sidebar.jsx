import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import {
  Home,
  BookOpen,
  Calendar,
  FileText,
  Library,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Users
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { sidebarOpen, setSidebarOpen, navItems } = useAppContext();
  const { user, logout } = useAuth();

  const getIcon = (name) => {
    switch (name) {
      case 'Inicio': return Home;
      case 'Cursos': return BookOpen;
      case 'Disponibilidad': return Calendar;
      case 'Materiales': return FileText;
      case 'Manuales': return Library;
      case 'TILab Assistant': return MessageSquare;
      case 'Panel Administrativo': return Users;
      case 'AdminInterface': return Settings;
      default: return Home;
    }
  };

  const isActive = (route) => {
    if (route === '/') return location.pathname === '/' || location.pathname === '';
    return location.pathname.includes(route);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 sidebar transition-all duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 w-64`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-ulima-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LABS TI</h1>
                <p className="text-sm text-gray-500">Universidad de Lima</p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = getIcon(item.name);
                return (
                  <li key={item.index}>
                    <Link
                      to={item.route}
                      className={`nav-item ${isActive(item.route) ? 'active' : ''}`}
                      onClick={() => {
                        if (window.innerWidth < 1024) {
                          setSidebarOpen(false);
                        }
                      }}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          {/* User Section */}
          {user && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-ulima-orange rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.nombre?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.nombre}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user.rol}
                  </p>
                </div>
              </div>
              
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;