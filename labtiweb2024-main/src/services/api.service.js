// API Service Layer - CONSERVATIVE APPROACH
// This service handles the switch between mock data and real backend

import { USE_MOCK } from '../constants/env.js';
import { ENDPOINTS } from '../constants/endpoints.js';
import { API_BASE_URL } from '../constants/endpoints.js';
// Import mock data
import { laboratoriosMock, getLaboratorioByIdMock } from '../mock/laboratorios.mock.js';
import { cursosMock } from '../mock/cursos.mock.js';
import { componentesMock, getComponenteByIdMock } from '../mock/componentes.mock.js';
import { materialesMock, getMaterialesByCursoIdMock } from '../mock/materiales.mock.js';
import { authMock } from '../mock/auth.mock.js';

// Import utils
import { delay } from '../utils/delay.js';

// Helper to simulate fetch behavior with mock data
const mockFetch = (data, delayMs = 800) => {
  return new Promise((resolve) => {
    delay(delayMs).then(() => {
      resolve({
        ok: true,
        json: () => Promise.resolve(data)
      });
    });
  });
};

// API Service Functions
export const apiService = {
  // Laboratories
  async getLaboratorios() {
    if (USE_MOCK) {
      return mockFetch(laboratoriosMock);
    }
    return fetch(`http://localhost:8000/back/obtener_laboratorios`);
  },

  async getLaboratorioById(id) {
    if (USE_MOCK) {
      const laboratorio = getLaboratorioByIdMock(id);
      return mockFetch(laboratorio);
    }
    return fetch(`http://localhost:8000/back/obtener_laboratorio1/${id}`);
  },

  // Courses
  async getCursos() {
    if (USE_MOCK) {
      return mockFetch(cursosMock);
    }
    return fetch(`${API_BASE_URL}${ENDPOINTS.CURSOS}`);
  },

  // Components
  async getComponentes() {
    if (USE_MOCK) {
      return mockFetch(componentesMock);
    }
    return fetch(`${API_BASE_URL}${ENDPOINTS.COMPONENTES}`);
  },

  async getComponenteById(id) {
    if (USE_MOCK) {
      const componente = getComponenteByIdMock(id);
      return mockFetch(componente);
    }
    return fetch(`${API_BASE_URL}${ENDPOINTS.COMPONENTE_BY_ID(id)}`);
  },

  // Materials
  async getMateriales() {
    if (USE_MOCK) {
      return mockFetch(materialesMock);
    }
    return fetch(`${API_BASE_URL}${ENDPOINTS.MATERIALES}`);
  },

  async getMaterialesByCurso(cursoId) {
    if (USE_MOCK) {
      const materiales = getMaterialesByCursoIdMock(cursoId);
      return mockFetch(materiales);
    }
    return fetch(`${API_BASE_URL}${ENDPOINTS.MATERIALES_BY_CURSO}`, {
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
    return fetch(`${API_BASE_URL}${ENDPOINTS.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
  }
};