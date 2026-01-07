import React from 'react';
import { useAuth } from '../hooks/useAuth';

interface TopBarProps {
  toggleSidebar?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ toggleSidebar }) => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="topbar">
      <div className="flex items-center justify-between w-full h-full px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TI</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 hidden sm:block">LABS TI</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://www.ulima.edu.pe" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-orange-500 transition-colors hidden sm:block"
          >
            Universidad de Lima
          </a>
          
          {isAuthenticated && user && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700 hidden md:block">
                {user.nombre}
              </span>
              <button
                onClick={logout}
                className="btn btn-outline text-sm py-2 px-3"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;