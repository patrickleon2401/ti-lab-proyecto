import React, { useState } from 'react';

const MobileMenuToggle = ({ isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors touch-target"
      aria-label="Toggle menu"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {isOpen ? (
          <path d="M18 6L6 18M6 6l12 12"/>
        ) : (
          <path d="M3 12h18M3 6h18M3 18h18"/>
        )}
      </svg>
    </button>
  );
};

export default MobileMenuToggle;