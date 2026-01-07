export interface Usuario {
  id: number;
  email: string;
  rol: 'admin' | 'user';
  nombre: string;
}

export interface Laboratorio {
  id: number;
  nombre: string;
  descripcion: string;
  foto1: string;
  foto2: string;
  foto3: string;
}

export interface Curso {
  id: number;
  nombre: string;
}

export interface Material {
  id: number;
  nombre: string;
  curso: number;
  archivo: string;
}

export interface Componente {
  id: number;
  nombre: string;
  descripcion: string;
  fotos: string[];
  manuales: Array<{
    id: number;
    titulo: string;
    archivo: string;
  }>;
}