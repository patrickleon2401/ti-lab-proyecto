import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, 
  FaBook, 
  FaTools, 
  FaCalendarAlt, 
  FaChartBar,
  FaChevronLeft,
  FaChevronRight,
  FaUserShield,
  FaFlask
} from 'react-icons/fa';

const ModernSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePath, setActivePath] = useState('/');
  const navigate = useNavigate();
  const location = useLocation();

  // Detectar ruta activa
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  // Auto-colapsar en móvil
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      icon: <FaHome size={20} />,
      label: "Inicio",
      path: "/",
      color: "text-primary"
    },
    {
      icon: <FaCalendarAlt size={20} />,
      label: "Disponibilidad",
      path: "/disponibilidad",
      color: "text-accent"
    },
    {
      icon: <FaBook size={20} />,
      label: "Cursos",
      path: "/Cursos",
      color: "text-success"
    },
    {
      icon: <FaTools size={20} />,
      label: "Manuales",
      path: "/Manuales",
      color: "text-primary"
    },
    {
      icon: <FaFlask size={20} />,
      label: "Materiales",
      path: "/Materiales",
      color: "text-text-secondary"
    },
    {
      icon: <FaChartBar size={20} />,
      label: "Panel Admin",
      path: "/AdminInterface",
      color: "text-danger",
      adminOnly: true
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    // Auto-colapsar en móvil después de navegar
    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Check admin access
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      try {
        const usuario = JSON.parse(storedUser);
        setIsAdmin(usuario.rol === 'admin');
      } catch (error) {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, []);

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: isCollapsed ? 80 : 280,
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
      className="glass-strong h-screen border-r border-surface-soft/30 sticky top-0 z-40 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-surface-soft/20">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-modern">
                <span className="text-white font-bold text-lg">LT</span>
              </div>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="overflow-hidden"
                >
                  <h2 className="text-title text-text-primary font-semibold truncate">
                    Labs TI
                  </h2>
                  <p className="text-caption text-text-secondary">
                    {isAdmin ? 'Panel Admin' : 'Estudiante'}
                  </p>
                </motion.div>
              )}
            </motion.div>
            
            {/* Toggle Button */}
            <motion.button
              onClick={toggleSidebar}
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-surface-soft/50 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isCollapsed ? <FaChevronRight size={14} /> : <FaChevronLeft size={14} />}
            </motion.button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              // Skip admin items if not admin
              if (item.adminOnly && !isAdmin) {
                return null;
              }

              const isActive = activePath === item.path;
              
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <motion.button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 relative overflow-hidden group ${
                      isActive 
                        ? 'bg-primary/20 text-primary shadow-modern border-l-4 border-primary' 
                        : 'hover:bg-surface-soft/50 text-text-secondary hover:text-text-primary border-l-4 border-transparent'
                    }`}
                    whileHover={{ 
                      scale: 1.02, 
                      x: isActive ? 0 : 5 
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    <span className={`flex-shrink-0 ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                      {item.icon}
                    </span>
                    
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        transition={{ delay: 0.05 }}
                        className="text-left font-medium truncate"
                      >
                        {item.label}
                      </motion.span>
                    )}

                    {/* Hover glow for active items */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-primary/10 rounded-xl"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 border-t border-surface-soft/20"
          >
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-br from-success to-success/60 rounded-full" />
              <div className="flex-1">
                <p className="text-caption text-text-secondary">Universidad de Lima</p>
                <p className="text-xs text-text-secondary/70">Sistemas</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile backdrop when expanded */}
      {isCollapsed === false && window.innerWidth < 768 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCollapsed(true)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </motion.aside>
  );
};

export default ModernSidebar;