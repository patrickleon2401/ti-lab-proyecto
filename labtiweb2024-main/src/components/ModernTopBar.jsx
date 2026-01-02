import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import LoginPanel from "../topbar/LoginPanel";

const ModernTopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      try {
        const usuario = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUserRole(usuario.rol || '');
      } catch (error) {
        console.error("Error parsing user:", error);
        setIsLoggedIn(false);
        setUserRole('');
      }
    } else {
      setIsLoggedIn(false);
      setUserRole('');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/', { replace: true });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="glass-strong sticky top-0 z-50 px-4 md:px-8 py-3 border-b border-surface-soft/30"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo y título */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LT</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-display text-text-primary font-bold">Labs TI</h1>
              <p className="text-caption text-text-secondary">Plataforma Educativa</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-4">
              <a 
                href="#/" 
                className="text-text-primary hover:text-primary transition-colors duration-200 font-medium"
              >
                Inicio
              </a>
              <a 
                href="#/Cursos" 
                className="text-text-primary hover:text-primary transition-colors duration-200 font-medium"
              >
                Cursos
              </a>
              <a 
                href="#/Materiales" 
                className="text-text-primary hover:text-primary transition-colors duration-200 font-medium"
              >
                Materiales
              </a>
            </nav>

            {/* User Menu */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <span className="text-caption text-text-secondary">
                  {userRole === 'admin' ? 'Administrador' : 'Usuario'}
                </span>
                <motion.button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-surface-soft/50 transition-colors duration-200 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaSignOutAlt className="text-text-secondary group-hover:text-danger group-hover:rotate-12 transition-all duration-200" size={18} />
                </motion.button>
              </div>
            ) : (
              <motion.button
                onClick={() => setIsLoginOpen(true)}
                className="modern-btn-primary flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaUser size={16} />
                <span>Iniciar Sesión</span>
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-surface-soft/50 transition-colors duration-200"
            whileTap={{ scale: 0.9 }}
          >
            <FaBars className="text-text-primary" size={24} />
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-surface-soft/30"
          >
            <nav className="flex flex-col space-y-4 p-4">
              <a 
                href="#/" 
                className="text-text-primary hover:text-primary transition-colors duration-200 font-medium py-2"
              >
                Inicio
              </a>
              <a 
                href="#/Cursos" 
                className="text-text-primary hover:text-primary transition-colors duration-200 font-medium py-2"
              >
                Cursos
              </a>
              <a 
                href="#/Materiales" 
                className="text-text-primary hover:text-primary transition-colors duration-200 font-medium py-2"
              >
                Materiales
              </a>
              
              {isLoggedIn && (
                <motion.button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-danger hover:text-primary transition-colors duration-200 py-2"
                  whileTap={{ scale: 0.95 }}
                >
                  <FaSignOutAlt size={16} />
                  <span>Cerrar Sesión</span>
                </motion.button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Panel */}
      <AnimatePresence>
        {isLoginOpen && (
          <LoginPanel 
            isOpen={isLoginOpen} 
            onClose={() => setIsLoginOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ModernTopBar;