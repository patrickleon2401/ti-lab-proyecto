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
  DOWNLOAD_PDF: '/descargar_pdf',
  
  // Admin CRUD endpoints
  ADMIN: {
    // Laboratorios
    LABORATORIOS_CREATE: '/admin/laboratorios',
    LABORATORIOS_UPDATE: (id) => `/admin/laboratorios/${id}`,
    LABORATORIOS_DELETE: (id) => `/admin/laboratorios/delete/${id}`,
    
    // Cursos
    CURSOS_CREATE: '/admin/cursos',
    CURSOS_UPDATE: (id) => `/admin/cursos/${id}`,
    CURSOS_DELETE: (id) => `/admin/cursos/delete/${id}`,
    
    // Componentes
    COMPONENTES_CREATE: '/admin/componentes',
    COMPONENTES_UPDATE: (id) => `/admin/componentes/${id}`,
    COMPONENTES_DELETE: (id) => `/admin/componentes/delete/${id}`,
    
    // Materiales
    MATERIALES_CREATE: '/admin/materiales',
    MATERIALES_UPDATE: (id) => `/admin/materiales/${id}`,
    MATERIALES_DELETE: (id) => `/admin/materiales/delete/${id}`,
  }
};