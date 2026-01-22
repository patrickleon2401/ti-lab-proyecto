import React from 'react';

/**
 * Helper function to render multiline text
 * Splits text by newlines and renders as paragraphs
 * @param {string} text - Text to render with line breaks
 * @returns {JSX.Element} Array of paragraph elements
 */
export const renderMultilineText = (text) => {
  if (!text) return null;
  
  return text.split('\n').map((line, index) => (
    <p key={index}>{line}</p>
  ));
};