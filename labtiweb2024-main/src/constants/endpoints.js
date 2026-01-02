import { pcdeApoyo } from '../config.js';

/**
 * API base URL and endpoints
 * Centralizes all API endpoint definitions
 */
export const API_BASE_URL = `http://${pcdeApoyo}/back`;

export const ENDPOINTS = {
  // GET endpoints
  LABORATORIOS: '/obtener_laboratorios',
  LABORATORIO_BY_ID: (id) => `/obtener_laboratorio1/${id}`,
  CURSOS: '/obtener_cursos',
  COMPONENTES: '/obtener_componentes',
  COMPONENTE_BY_ID: (id) => `/obtener_componente1/${id}`,
  MATERIALES: '/obtener_materiales',
  MATERIALES_BY_CURSO: '/obtener_materiales_por_curso/',
  
  // POST endpoints
  LOGIN: '/login/',
  DOWNLOAD_PDF: '/descargar_pdf'
};