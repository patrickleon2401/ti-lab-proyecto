import { USE_MOCK } from '../constants/env.js';
import { pcdeApoyo } from '../config.js';

/**
 * Helper function to create download URLs
 * Handles mock vs real backend URL logic
 * @param {string} filename - PDF filename
 * @returns {string} Complete download URL
 */
export const createDownloadUrl = (filename) => {
  if (USE_MOCK) {
    return `/${filename}`;
  }
  return `http://${pcdeApoyo}/back/descargar_pdf/${filename}`;
};