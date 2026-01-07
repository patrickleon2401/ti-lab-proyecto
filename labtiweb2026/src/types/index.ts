export interface User {
  id: number;
  email: string;
  rol: 'admin' | 'user';
  nombre: string;
}

export interface Laboratory {
  id: number;
  nombre: string;
  descripcion: string;
  foto1: string;
  foto2: string;
  foto3: string;
}

export interface Course {
  id: number;
  nombre: string;
}

export interface Material {
  id: number;
  nombre: string;
  curso: number;
  archivo: string;
}

export interface Component {
  id: number;
  nombre: string;
  descripcion: string;
  fotos: string[];
  manuales: Manual[];
}

export interface Manual {
  id: number;
  titulo: string;
  archivo: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}