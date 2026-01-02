import React from 'react';
import { motion } from 'framer-motion';
import Skeleton from './Skeleton';

/**
 * Modern Loading Screen con animación
 * @param {Object} props
 * @param {string} props.message - Mensaje de carga
 * @param {boolean} props.skeletons - Mostrar skeletons
 */
const ModernLoading = ({ 
  message = "Cargando...", 
  skeletons = false,
  skeletonCount = 3
}) => {
  if (skeletons) {
    return (
      <div className="space-y-6">
        {Array.from({ length: skeletonCount }, (_, i) => (
          <div key={i} className="modern-card p-6">
            <Skeleton height="h-6" width="w-3/4" />
            <Skeleton height="h-32" width="w-full" className="mt-4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] space-y-6"
    >
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-primary/30 rounded-full animate-ping" />
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-text-secondary text-sm font-medium"
      >
        {message}
      </motion.p>
    </motion.div>
  );
};

/**
 * Page Transition Loading
 */
export const PageTransition = ({ children, isLoading }) => {
  if (isLoading) {
    return <ModernLoading skeletons={true} skeletonCount={6} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="animate-fade-in"
    >
      {children}
    </motion.div>
  );
};

export default ModernLoading;