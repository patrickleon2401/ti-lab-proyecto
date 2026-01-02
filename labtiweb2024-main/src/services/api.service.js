// API Service Layer - CONSERVATIVE APPROACH
// This service handles the switch between mock data and real backend

import { USE_MOCK } from '../constants/env.js';
import { pcdeApoyo } from '../config.js';

// Import mock data
import { laboratoriosMock, getLaboratorioByIdMock } from '../mock/laboratorios.mock.js';
import { cursosMock } from '../mock/cursos.mock.js';
import { componentesMock, getComponenteByIdMock } from '../mock/componentes.mock.js';
import { materialesMock, getMaterialesByCursoIdMock } from '../mock/materiales.mock.js';
import { authMock } from '../mock/auth.mock.js';

// Helper to simulate fetch behavior with mock data
const mockFetch = (data, delay = 800) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        json: () => Promise.resolve(data)
      });
    }, delay);
  });
};

// API Service Functions
export const apiService = {
  // Laboratories
  async getLaboratorios() {
    if (USE_MOCK) {
      return mockFetch(laboratoriosMock);
    }
    return fetch(`http://${pcdeApoyo}/back/obtener_laboratorios`);
  },

  async getLaboratorioById(id) {
    if (USE_MOCK) {
      const laboratorio = getLaboratorioByIdMock(id);
      return mockFetch(laboratorio);
    }
    return fetch(`http://${pcdeApoyo}/back/obtener_laboratorio1/${id}`);
  },

  // Courses
  async getCursos() {
    if (USE_MOCK) {
      return mockFetch(cursosMock);
    }
    return fetch(`http://${pcdeApoyo}/back/obtener_cursos`);
  },

  // Components
  async getComponentes() {
    if (USE_MOCK) {
      return mockFetch(componentesMock);
    }
    return fetch(`http://${pcdeApoyo}/back/obtener_componentes`);
  },

  async getComponenteById(id) {
    if (USE_MOCK) {
      const componente = getComponenteByIdMock(id);
      return mockFetch(componente);
    }
    return fetch(`http://${pcdeApoyo}/back/obtener_componente1/${id}`);
  },

  // Materials
  async getMateriales() {
    if (USE_MOCK) {
      return mockFetch(materialesMock);
    }
    return fetch(`http://${pcdeApoyo}/back/obtener_materiales`);
  },

  async getMaterialesByCurso(cursoId) {
    if (USE_MOCK) {
      const materiales = getMaterialesByCursoIdMock(cursoId);
      return mockFetch(materiales);
    }
    return fetch(`http://${pcdeApoyo}/back/obtener_materiales_por_curso/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ curso_id: cursoId })
    });
  },

  // Authentication
  async login(email, password) {
    if (USE_MOCK) {
      const result = await authMock.login(email, password);
      if (result.success) {
        return mockFetch(result.data);
      } else {
        return {
          ok: false,
          json: () => Promise.resolve({ error: result.error })
        };
      }
    }
    return fetch(`http://${pcdeApoyo}/back/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
  }
};