import React from 'react';
import { motion } from 'framer-motion';

/**
 * Modern Skeleton Loader con shimmer effect
 * @param {Object} props
 * @param {string} props.className - CSS classes adicionales
 * @param {string} props.height - Altura del skeleton
 * @param {string} props.width - Ancho del skeleton
 */
const Skeleton = ({ 
  className = "", 
  height = "h-4", 
  width = "w-full" 
}) => {
  return (
    <div 
      className={`skeleton ${height} ${width} ${className}`}
      role="status"
      aria-label="Loading..."
    />
  );
};

/**
 * Skeleton Card - Tarjeta completa con skeleton
 */
export const SkeletonCard = () => {
  return (
    <div className="modern-card p-6 space-y-4">
      <Skeleton height="h-6" width="w-3/4" />
      <Skeleton height="h-32" width="w-full" />
      <div className="space-y-2">
        <Skeleton height="h-4" />
        <Skeleton height="h-4" width="w-5/6" />
      </div>
    </div>
  );
};

/**
 * Skeleton Grid - Grid de skeleton cards
 */
export const SkeletonGrid = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

/**
 * Page Loader - Skeleton con animación suave
 */
export const PageLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container flex items-center justify-center min-h-screen"
    >
      <div className="text-center space-y-6">
        <div className="w-16 h-16 mx-auto">
          <div className="skeleton w-full h-full rounded-full" />
        </div>
        <p className="text-text-secondary animate-pulse">
          Cargando contenido...
        </p>
      </div>
    </motion.div>
  );
};

export default Skeleton;