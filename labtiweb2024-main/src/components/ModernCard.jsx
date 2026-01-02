import React from 'react';
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
    <div
      className={`modern-card ${hover ? 'hover-lift' : ''} relative ${className}`}
      onClick={onClick}
      style={style}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
          {badge}
        </div>
      )}

      {/* Image Section */}
      {image && (
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={image}
            alt={title || "Card image"}
            className="w-full h-48 md:h-56 object-cover"
          />
          
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          
          {/* Icon overlay */}
          {icon && (
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md">
              {icon}
            </div>
          )}

          {/* Hover indicator */}
          {hover && (
            <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <FaExternalLinkAlt className="text-primary" size={14} />
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        {title && (
          <h3 className="text-title text-text-primary font-semibold mb-2 hover:text-primary transition-colors duration-300">
            {title}
          </h3>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="text-caption text-text-secondary mb-4">
            {subtitle}
          </p>
        )}

        {/* Children */}
        {children && (
          <div className="text-body text-text-secondary/80 space-y-3">
            {children}
          </div>
        )}
      </div>

      {/* Click indicator */}
      {onClick && (
        <div className="absolute inset-0 cursor-pointer z-20" />
      )}
    </div>
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
  className = "",
  style = {}
}) => {
  return (
    <div
      className={`modern-card p-6 ${hover ? 'hover-lift' : ''} ${className}`}
      onClick={onClick}
      style={style}
    >
      {icon && (
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      
      {title && (
        <h3 className="text-title text-text-primary font-semibold mb-3">
          {title}
        </h3>
      )}

      {children && (
        <div className="text-body text-text-secondary/80">
          {children}
        </div>
      )}
    </div>
  );
};

export default ModernCard;