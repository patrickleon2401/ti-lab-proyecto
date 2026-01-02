import React from 'react';

/**
 * Loading component for consistent loading state display
 * @param {Object} props
 * @param {string} props.message - Loading message to display
 * @param {string} props.className - Additional CSS classes
 */
const Loading = ({ message = "Cargando...", className = "" }) => {
  return (
    <div className={className}>
      {message}
    </div>
  );
};

export default Loading;