import React from 'react';
import { motion } from 'framer-motion';

/**
 * Modern Glass Button con hover effects
 * @param {Object} props
 * @param {'primary' | 'secondary'} props.variant - Variante del botón
 * @param {string} props.children - Contenido del botón
 * @param {Function} props.onClick - Click handler
 * @param {string} props.className - CSS classes adicionales
 * @param {boolean} props.disabled - Estado deshabilitado
 */
const ModernButton = ({ 
  variant = 'primary', 
  children, 
  onClick, 
  className = "", 
  disabled = false,
  ...props 
}) => {
  const baseClasses = {
    primary: 'modern-btn-primary',
    secondary: 'modern-btn-secondary'
  };

  return (
    <motion.button
      className={`${baseClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

/**
 * Modern Button con icono
 */
export const IconButton = ({ 
  icon, 
  children, 
  onClick, 
  variant = 'primary',
  className = ""
}) => {
  return (
    <ModernButton 
      onClick={onClick} 
      variant={variant} 
      className={`flex items-center gap-2 ${className}`}
    >
      {icon}
      {children}
    </ModernButton>
  );
};

/**
 * Floating Action Button
 */
export const FloatingActionButton = ({ 
  icon, 
  onClick, 
  className = ""
}) => {
  return (
    <motion.button
      className={`fixed bottom-6 right-6 bg-primary text-white rounded-full w-14 h-14 shadow-modern-lg hover:shadow-modern-lg hover:scale-110 transition-all duration-300 flex items-center justify-center ${className}`}
      onClick={onClick}
      whileHover={{ rotate: 90, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      {icon}
    </motion.button>
  );
};

export default ModernButton;