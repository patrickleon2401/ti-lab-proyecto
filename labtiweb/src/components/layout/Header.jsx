import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAppContext } from '../../context/AppContext';
import { Menu, Bell, Search, User } from 'lucide-react';

const Header = ({ onLoginClick }) => {
  const { user } = useAuth();
  const { sidebarOpen, setSidebarOpen } = useAppContext();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              <Menu size={20} />
            </button>
            
            <div className="hidden lg:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ulima-orange focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell size={20} />
                </button>
                
                <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">{user.nombre}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.rol}</p>
                  </div>
                  <div className="w-8 h-8 bg-ulima-orange rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.nombre?.charAt(0) || 'U'}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="btn-primary"
              >
                <User size={16} />
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;