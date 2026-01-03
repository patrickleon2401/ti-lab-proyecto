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
    return fetch(`${API_BASE_URL}${ENDPOINTS.LABORATORIOS}`);
  },

  async getLaboratorioById(id) {
    if (USE_MOCK) {
      const laboratorio = getLaboratorioByIdMock(id);
      return mockFetch(laboratorio);
    }
    return fetch(`${API_BASE_URL}${ENDPOINTS.LABORATORIO_BY_ID(id)}`);
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
  },

  // Admin CRUD Operations
  // Laboratorios
  async createLaboratorio(data) {
    if (USE_MOCK) {
      const newLab = { id: Date.now(), ...data };
      return mockFetch({ message: 'Laboratorio creado', id: newLab.id });
    }
    return fetch(`${API_BASE_URL}${ENDPOINTS.ADMIN.LABORATORIOS_CREATE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  },

  async updateLaboratorio(id, data) {
    if (USE_MOCK) {
      return mockFetch({ message: 'Laboratorio actualizado' });
    }
    return fetch(`${API_BASE_URL}${ENDPOINTS.ADMIN.LABORATORIOS_UPDATE(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  },

  async deleteLaboratorio(id) {
    if (USE_MOCK) {
      return mockFetch({ message: 'Laboratorio eliminado' });
    }
    return fetch(`${API_BASE_URL}${ENDPOINTS.ADMIN.LABORATORIOS_DELETE(id)}`, {
      method: 'DELETE'
    });
  },

  // Cursos
  async createCurso(data) {
    if (USE_MOCK) {
      const newCurso = { id: Date.now(), ...data };
      return mockFetch({ message: 'Curso creado', id: newCurso.id });
    }
    return fetch(`${API_BASE_URL}${ENDPOINTS.ADMIN.CURSOS_CREATE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  },

  async updateCurso(id, data) {
    if (USE_MOCK) {
      return mockFetch({ message: 'Curso actualizado' });
    }
    return fetch(`${API_BASE_URL}${ENDPOINTS.ADMIN.CURSOS_UPDATE(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  },

  async deleteCurso(id) {
    if (USE_MOCK) {
      return mockFetch({ message: 'Curso eliminado' });
    }
    return fetch(`${API_BASE_URL}${ENDPOINTS.ADMIN.CURSOS_DELETE(id)}`, {
      method: 'DELETE'
    });
  },

  // Componentes
  async createComponente(data) {
    if (USE_MOCK) {
      const newComponente = { id: Date.now(), ...data };
      return mockFetch({ message: 'Componente creado', id: newComponente.id });
    }
    return fetch(`${API_BASE_URL}${ENDPOINTS.ADMIN.COMPONENTES_CREATE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  },

  async updateComponente(id, data) {
    if (USE_MOCK) {
      return mockFetch({ message: 'Componente actualizado' });
    }
    return fetch(`${API_BASE_URL}${ENDPOINTS.ADMIN.COMPONENTES_UPDATE(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  },

  async deleteComponente(id) {
    if (USE_MOCK) {
      return mockFetch({ message: 'Componente eliminado' });
    }
    return fetch(`${API_BASE_URL}${ENDPOINTS.ADMIN.COMPONENTES_DELETE(id)}`, {
      method: 'DELETE'
    });
  },

  // Materiales
  async createMaterial(data) {
    if (USE_MOCK) {
      const newMaterial = { id: Date.now(), ...data };
      return mockFetch({ message: 'Material creado', id: newMaterial.id });
    }
    return fetch(`${API_BASE_URL}${ENDPOINTS.ADMIN.MATERIALES_CREATE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  },

  async updateMaterial(id, data) {
    if (USE_MOCK) {
      return mockFetch({ message: 'Material actualizado' });
    }
    return fetch(`${API_BASE_URL}${ENDPOINTS.ADMIN.MATERIALES_UPDATE(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  },

  async deleteMaterial(id) {
    if (USE_MOCK) {
      return mockFetch({ message: 'Material eliminado' });
    }
    return fetch(`${API_BASE_URL}${ENDPOINTS.ADMIN.MATERIALES_DELETE(id)}`, {
      method: 'DELETE'
    });
  }
};