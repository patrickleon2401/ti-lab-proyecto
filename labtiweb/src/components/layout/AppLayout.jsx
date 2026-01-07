import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppContext } from '../../context/AppContext';
import Sidebar from './Sidebar';
import Header from './Header';
import LoginModal from '../ui/LoginModal';

const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  const { sidebarOpen } = useAppContext();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && (
        <>
          <Sidebar />
          <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
            <Header onLoginClick={() => setShowLoginModal(true)} />
            <main className="main-content">
              <Outlet />
            </main>
          </div>
        </>
      )}
      
      {!isAuthenticated && (
        <main className="main-content">
          <Outlet />
        </main>
      )}
      
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
};

export default AppLayout;