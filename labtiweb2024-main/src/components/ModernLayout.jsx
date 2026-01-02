import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModernSidebar from '../components/ModernSidebar';
import ModernTopBar from '../components/ModernTopBar';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Layout con sidebar y topbar modernos
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.showSidebar - Whether to show sidebar
 * @param {string} props.title - Page title
 */
const ModernLayout = ({ 
  children, 
  className = "", 
  showSidebar = true,
  title = ""
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Page transition animation
  const pageVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    in: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    },
    out: { 
      opacity: 0, 
      y: -20,
      scale: 0.95,
      transition: { 
        duration: 0.3, 
        ease: "easeIn" 
      }
    }
  };

  return (
    <div className="page-container">
      {/* TopBar */}
      <ModernTopBar />

      {/* Mobile Layout */}
      {isMobile ? (
        <div className="flex h-screen pt-16">
          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {isSidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSidebarOpen(false)}
                  className="fixed inset-0 bg-black/50 z-30"
                />
                <motion.aside
                  initial={{ x: -280 }}
                  animate={{ x: 0 }}
                  exit={{ x: -280 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed left-0 top-16 bottom-0 w-72 glass-strong z-40 overflow-hidden"
                >
                  <ModernSidebar />
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Mobile Content */}
          <motion.main
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            className={`flex-1 overflow-y-auto ${className}`}
          >
            <div className="content-area">
              {/* Mobile Header */}
              <div className="flex items-center justify-between mb-6 md:hidden">
                <div>
                  {title && (
                    <motion.h1 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-headline text-text-primary font-bold"
                    >
                      {title}
                    </motion.h1>
                  )}
                </div>
                <motion.button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-3 rounded-xl glass hover:glass-strong transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </motion.button>
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {children}
              </motion.div>
            </div>
          </motion.main>
        </div>
      ) : (
        /* Desktop Layout */
        <div className="flex h-screen pt-16">
          {/* Desktop Sidebar */}
          {showSidebar && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-shrink-0"
            >
              <ModernSidebar />
            </motion.div>
          )}

          {/* Desktop Content */}
          <motion.main
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            className={`flex-1 overflow-y-auto ${className}`}
          >
            <div className="content-area">
              {/* Desktop Header */}
              {title && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-display text-text-primary font-bold mb-2">
                        {title}
                      </h1>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full" />
                        <span className="text-caption text-text-secondary">
                          Sistema Operativo
                        </span>
                      </div>
                    </div>
                    
                    {/* Breadcrumb */}
                    <motion.nav
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <a 
                        href="/"
                        className="text-text-secondary hover:text-primary transition-colors duration-200"
                      >
                        Inicio
                      </a>
                      <span className="text-text-secondary/50">/</span>
                      <span className="text-text-primary font-medium">
                        {title}
                      </span>
                    </motion.nav>
                  </div>
                </motion.div>
              )}

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {children}
              </motion.div>
            </div>
          </motion.main>
        </div>
      )}
    </div>
  );
};

export default ModernLayout;