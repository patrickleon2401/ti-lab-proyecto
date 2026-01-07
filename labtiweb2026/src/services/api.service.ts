import { USE_MOCK } from '../constants/env';
import { local } from '../../config.js';
import { ENDPOINTS } from '../constants/endpoints';
import { ApiResponse, Laboratory, Course, Material, Component, User } from '../types';

export class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = USE_MOCK ? '' : `http://${local}/back`;
  }

  async get(endpoint: string): Promise<Response> {
    if (USE_MOCK) {
      return new Response(JSON.stringify(this.getMockData(endpoint)));
    } else {
      return fetch(`${this.baseUrl}${endpoint}`);
    }
  }

  async post(endpoint: string, data: any): Promise<Response> {
    if (USE_MOCK) {
      return new Response(JSON.stringify(this.getMockPostData(endpoint, data)));
    } else {
      return fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }
  }

  private getMockData(endpoint: string): any {
    switch (endpoint) {
      case ENDPOINTS.LABORATORIOS:
        return [
          {
            id: 1,
            nombre: "Laboratorio de Redes",
            descripcion: "Equipamiento especializado en redes de computadoras con switches, routers y equipos de cableado estructurado para prácticas de configuración y administración de redes.",
            foto1: "/images/labs/redes1.jpg",
            foto2: "/images/labs/redes2.jpg",
            foto3: "/images/labs/redes3.jpg"
          },
          {
            id: 2,
            nombre: "Laboratorio de Software",
            descripcion: "Computadoras de alto rendimiento para desarrollo de software, pruebas de aplicaciones y aprendizaje de lenguajes de programación modernos.",
            foto1: "/images/labs/software1.jpg",
            foto2: "/images/labs/software2.jpg",
            foto3: "/images/labs/software3.jpg"
          },
          {
            id: 3,
            nombre: "Laboratorio de Hardware",
            descripcion: "Equipamiento completo para el aprendizaje de arquitectura de computadoras, mantenimiento y reparación de equipos informáticos.",
            foto1: "/images/labs/hardware1.jpg",
            foto2: "/images/labs/hardware2.jpg",
            foto3: "/images/labs/hardware3.jpg"
          }
        ];
      
      case ENDPOINTS.CURSOS:
        return [
          { id: 1, nombre: "Redes de Computadoras" },
          { id: 2, nombre: "Sistemas Operativos" },
          { id: 3, nombre: "Programación Web" },
          { id: 4, nombre: "Base de Datos" }
        ];
      
      case ENDPOINTS.MATERIALES:
        return [
          { id: 1, nombre: "Guía de Prácticas Redes", curso: 1, archivo: "guia_redes.pdf" },
          { id: 2, nombre: "Manual de Laboratorio Redes", curso: 1, archivo: "manual_redes.pdf" },
          { id: 3, nombre: "Guía de Instalación SO", curso: 2, archivo: "guia_so.pdf" },
          { id: 4, nombre: "Manual de Comandos Linux", curso: 2, archivo: "comandos_linux.pdf" },
          { id: 5, nombre: "Tutorial React", curso: 3, archivo: "tutorial_react.pdf" },
          { id: 6, nombre: "Guía de Base de Datos", curso: 4, archivo: "guia_bd.pdf" }
        ];
      
      case ENDPOINTS.COMPONENTES:
        return [
          {
            id: 1,
            nombre: "Switch Cisco 2960",
            descripcion: "Switch gestionable de 24 puertos para prácticas de configuración de VLANs y enrutamiento inter-VLAN.",
            fotos: ["/images/components/switch1.jpg", "/images/components/switch2.jpg"],
            manuales: [
              { id: 1, titulo: "Manual de Configuración", archivo: "manual_switch.pdf" },
              { id: 2, titulo: "Guía Rápida", archivo: "guia_switch.pdf" }
            ]
          },
          {
            id: 2,
            nombre: "Router Cisco 1941",
            descripcion: "Router de servicios integrados para prácticas de configuración de protocolos de enrutamiento.",
            fotos: ["/images/components/router1.jpg", "/images/components/router2.jpg"],
            manuales: [
              { id: 3, titulo: "Manual de Router", archivo: "manual_router.pdf" }
            ]
          }
        ];
      
      default:
        if (endpoint.includes(ENDPOINTS.LABORATORIO_DETALLE)) {
          return {
            id: 1,
            nombre: "Laboratorio de Redes",
            descripcion: "Equipamiento especializado en redes de computadoras con switches, routers y equipos de cableado estructurado para prácticas de configuración y administración de redes. Este laboratorio cuenta con 20 puestos de trabajo completamente equipados con computadoras de última generación, equipos de networking Cisco y software especializado.",
            foto1: "/images/labs/redes1.jpg",
            foto2: "/images/labs/redes2.jpg",
            foto3: "/images/labs/redes3.jpg"
          };
        }
        return null;
    }
  }

  private getMockPostData(endpoint: string, data: any): any {
    if (endpoint === ENDPOINTS.MATERIALES_POR_CURSO) {
      return [
        { id: 1, nombre: "Guía de Prácticas Redes", curso: data.curso_id, archivo: "guia_redes.pdf" },
        { id: 2, nombre: "Manual de Laboratorio Redes", curso: data.curso_id, archivo: "manual_redes.pdf" }
      ];
    }
    
    if (endpoint === ENDPOINTS.LOGIN) {
      return {
        success: true,
        data: {
          id: 1,
          email: data.email,
          rol: "admin",
          nombre: "Administrador"
        }
      };
    }
    
    return null;
  }
}

export const apiService = new ApiService();