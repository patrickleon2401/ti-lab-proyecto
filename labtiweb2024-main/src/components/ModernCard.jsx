import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaBook, FaTools } from 'react-icons/fa';

/**
 * Modern Card con hover effects premium
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido
 * @param {string} props.title - Título de la card
 * @param {string} props.subtitle - Subtítulo
 * @param {string} props.image - URL de imagen
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.hover - Enable hover effects
 * @param {string} props.className - CSS classes adicionales
 * @param {Object} props.style - Estilos adicionales
 */
const ModernCard = ({ 
  children, 
  title, 
  subtitle, 
  image, 
  onClick, 
  hover = true,
  className = "", 
  style = {},
  icon = null,
  badge = null
}) => {
  return (
    <motion.div
      className={`modern-card ${hover ? 'card-hover' : ''} overflow-hidden group relative ${className}`}
      onClick={onClick}
      style={style}
      whileHover={hover ? { 
        y: -4,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
      } : {}}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-4 right-4 z-10 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full"
        >
          {badge}
        </motion.div>
      )}

      {/* Image Section */}
      {image && (
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={image}
            alt={title || "Card image"}
            className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Icon overlay */}
          {icon && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="absolute bottom-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-modern"
            >
              {icon}
            </motion.div>
          )}

          {/* Hover indicator */}
          {hover && (
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <FaExternalLinkAlt className="text-primary" size={14} />
            </motion.div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        {title && (
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-title text-text-primary font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300"
          >
            {title}
          </motion.h3>
        )}

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-caption text-text-secondary mb-4 line-clamp-2"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Children */}
        {children && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-body text-text-secondary/80 space-y-3"
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Click indicator */}
      {onClick && (
        <div className="absolute inset-0 cursor-pointer z-20" />
      )}
    </motion.div>
  );
};

/**
 * Card para Laboratorios
 */
export const LabCard = ({ lab, onClick }) => {
  const labIcon = <FaTools className="text-primary" size={20} />;
  
  return (
    <ModernCard
      title={lab.nombre}
      subtitle={`Laboratorio ${lab.id}`}
      image={lab.foto1}
      onClick={() => onClick && onClick(lab)}
      icon={labIcon}
      badge="Activo"
    />
  );
};

/**
 * Card para Cursos
 */
export const CourseCard = ({ course, onClick }) => {
  const courseIcon = <FaBook className="text-success" size={20} />;
  
  return (
    <ModernCard
      title={course.nombre}
      subtitle={`Nivel ${course.nivel || 'Básico'}`}
      image={course.imagen}
      onClick={() => onClick && onClick(course)}
      icon={courseIcon}
    />
  );
};

/**
 * Card para Componentes
 */
export const ComponentCard = ({ component, onClick }) => {
  const componentIcon = <FaTools className="text-accent" size={20} />;
  
  return (
    <ModernCard
      title={component.nombre}
      subtitle={component.descripcion?.substring(0, 100) + '...'}
      image={component.foto1}
      onClick={() => onClick && onClick(component)}
      icon={componentIcon}
    />
  );
};

/**
 * Simple Card sin imagen
 */
export const SimpleCard = ({ 
  title, 
  children, 
  icon = null, 
  hover = true,
  onClick = null,
  className = ""
}) => {
  return (
    <motion.div
      className={`modern-card p-6 ${hover ? 'card-hover cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      whileHover={hover ? { 
        y: -2,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)"
      } : {}}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {icon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4"
        >
          {icon}
        </motion.div>
      )}
      
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-title text-text-primary font-semibold mb-3"
        >
          {title}
        </motion.h3>
      )}

      {children && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-body text-text-secondary/80"
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ModernCard;