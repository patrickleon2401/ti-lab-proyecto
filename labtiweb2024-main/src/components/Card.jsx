import React from 'react';
import { CARD_STYLES } from '../constants/ui.js';

/**
 * Generic card component for consistent styling
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render inside card
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 * @param {Function} props.onClick - Click handler (optional)
 */
const Card = ({ children, className = "", style = {}, onClick = null }) => {
  const cardStyle = {
    ...CARD_STYLES,
    ...style,
    cursor: onClick ? 'pointer' : 'default'
  };

  return (
    <div 
      className={className} 
      style={cardStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;