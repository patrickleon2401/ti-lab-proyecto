import React from 'react';
import { createDownloadUrl } from '../utils/url.js';

/**
 * Download button component
 * Handles mock vs real backend URL logic
 * @param {Object} props
 * @param {string} props.filename - PDF filename to download
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.downloadText - Text to display on button
 */
const DownloadButton = ({ 
  filename, 
  className = "download-button", 
  downloadText = "⬇ Descargar" 
}) => {
  return (
    <a
      href={createDownloadUrl(filename)}
      className={className}
      download
    >
      {downloadText}
    </a>
  );
};

export default DownloadButton;