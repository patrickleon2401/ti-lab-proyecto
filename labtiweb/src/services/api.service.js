import { USE_MOCK } from '../constants/env';
import { createApiUrl } from '../config';

export class ApiService {
  constructor() {
    this.baseUrl = USE_MOCK ? '' : createApiUrl('');
  }

  async get(endpoint) {
    if (USE_MOCK) {
      return this.getMockData(endpoint);
    } else {
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    }
  }

  async post(endpoint, data) {
    if (USE_MOCK) {
      return this.getMockResponse(endpoint, data);
    } else {
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    }
  }

  async getMockData(endpoint) {
    const mockData = await import('../data/mockData');
    const { 
      laboratoriosMock, 
      cursosMock, 
      materialesMock, 
      componentesMock 
    } = mockData;

    switch (endpoint) {
      case '/obtener_laboratorios':
        return new Response(JSON.stringify(laboratoriosMock));
      case '/obtener_cursos':
        return new Response(JSON.stringify(cursosMock));
      case '/obtener_materiales':
        return new Response(JSON.stringify(materialesMock));
      case '/obtener_componentes':
        return new Response(JSON.stringify(componentesMock));
      default:
        if (endpoint.includes('/obtener_laboratorio1/')) {
          const id = parseInt(endpoint.split('/').pop());
          const lab = laboratoriosMock.find(l => l.id === id);
          return new Response(JSON.stringify(lab || {}));
        }
        if (endpoint.includes('/obtener_componente1/')) {
          const id = parseInt(endpoint.split('/').pop());
          const component = componentesMock.find(c => c.id === id);
          return new Response(JSON.stringify(component || {}));
        }
        return new Response(JSON.stringify({}));
    }
  }

  async getMockResponse(endpoint, data) {
    const mockData = await import('../data/mockData');
    const { materialesMock } = mockData;

    switch (endpoint) {
      case '/login':
        return new Response(JSON.stringify({
          success: true,
          data: { id: 1, email: data.email, rol: 'admin', nombre: 'Admin User' }
        }));
      case '/obtener_materiales_por_curso':
        if (data?.curso_id) {
          const filtered = materialesMock.filter(m => m.curso === data.curso_id);
          return new Response(JSON.stringify(filtered));
        }
        return new Response(JSON.stringify(materialesMock));
      default:
        return new Response(JSON.stringify({}));
    }
  }

  createDownloadUrl(filename) {
    if (USE_MOCK) {
      return `/mock/${filename}`;
    } else {
      const { local } = require('../config');
      return `http://${local}/media/${filename}`;
    }
  }
}

export const apiService = new ApiService();