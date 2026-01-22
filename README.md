# LABS TI React Project

Plataforma web para gestión de laboratorios del programa de Ingeniería de Sistemas de la Universidad de Lima. Desarrollada con React 18, esta aplicación permite administrar laboratorios, cursos, materiales técnicos y manuales de componentes.

## 🚀 Requisitos Previos

- Node.js 16+ instalado
- npm o yarn
- (Opcional) Backend Django para modo producción

## 📦 Instalación

1. Clonar el repositorio:
```bash
git clone <URL_DEL_REPOSITORIO>
cd labtiweb2024-main
```

2. Instalar dependencias:
```bash
npm install
```

## ⚙️ Configuración del Entorno

El proyecto funciona en dos modos: **desarrollo con datos mock** y **producción con backend real**.

### Modo Mock (Desarrollo)

Ideal para desarrollo sin necesidad de backend:

1. Verificar que en `src/constants/env.js`:
```javascript
export const USE_MOCK = true;
```

2. Iniciar aplicación:
```bash
npm start
```

La aplicación abrirá en http://localhost:3000 con datos完全 funcionales.

### Modo Real (Producción)

Para conectar con backend Django:

1. Cambiar en `src/constants/env.js`:
```javascript
export const USE_MOCK = false;
```

2. Configurar URL del backend en `src/config.js`:
```javascript
const pcdeApoyo = "192.168.51.205:8000"; // IP del servidor backend
```

3. Iniciar aplicación:
```bash
npm start
```

## 🛠️ Scripts Disponibles

```bash
npm start      # Servidor de desarrollo (http://localhost:3000)
npm test       # Ejecutar pruebas
npm run build  # Build para producción (carpeta build/)
npm run eject  # Expulsar configuración (irreversible)
```

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/          # Componentes UI reutilizables
├── constants/           # Configuración centralizada
├── cursos/             # Gestión de cursos
├── disponibilidad/     # Horarios de laboratorios
├── home/               # Página principal
├── manual/             # Manuales técnicos
├── material/           # Materiales de curso
├── mock/               # Datos de desarrollo
├── services/           # Capa de API
├── sidebar/            # Navegación lateral
├── tilabAssistant/     # Asistente virtual (nuevo)
├── topbar/             # Barra superior
├── utils/              # Funciones helper
└── router/             # Definición de rutas
```

## 🔧 Sistema de Mock Data

El proyecto incluye un sistema completo de datos mock para desarrollo:

### Usuarios de Prueba
- **Admin**: `admin@labs.com` / `admin123`
- **Usuario**: `user@labs.com` / `user123`

### Archivos Mock Principales
- `src/mock/laboratorios.mock.js` - Datos de laboratorios
- `src/mock/cursos.mock.js` - Catálogo de cursos
- `src/mock/componentes.mock.js` - Componentes técnicos
- `src/mock/materiales.mock.js` - Materiales educativos
- `src/mock/auth.mock.js` - Sistema de autenticación

### Ventajas del Modo Mock
- ✅ Desarrollo 100% offline
- ✅ Datos consistentes y predefinidos
- ✅ Rápido prototipado
- ✅ Sin dependencia de backend

## 📱 Cómo Agregar una Nueva Página

### Paso 1: Crear Componente

Crear carpeta en `src/` con estructura estándar:
```bash
src/miPagina/
├── MiPagina.jsx
└── MiPagina.css
```

### Paso 2: Componente Básico

```jsx
// src/miPagina/MiPagina.jsx
import React, { useState, useEffect } from 'react';
import LayoutWithSidebar from '../components/LayoutWithSidebar';
import { COLORS, SPACING } from '../constants/styles';
import './MiPagina.css';

const MiPagina = () => {
  return (
    <LayoutWithSidebar>
      <h2 style={{ color: COLORS.PRIMARY_ORANGE }}>Mi Nueva Página</h2>
      {/* Contenido aquí */}
    </LayoutWithSidebar>
  );
};

export default MiPagina;
```

### Paso 3: Agregar Ruta

Editar `src/router/Rutas.jsx`:

```javascript
import MiPagina from '../miPagina/MiPagina';

const Rutas = () => {
    return createHashRouter([
        // ... rutas existentes
        {
            path: "/mi-pagina",
            element: <MiPagina />
        }
    ]);
}
```

### Paso 4: Agregar al Sidebar

Editar `src/sidebar/sidebar.jsx`:

```javascript
// Importar ícono opcional
import { FaIcon } from 'react-icons/fa';

// Agregar enlace en el return
<a
  href="#mi-pagina"
  style={{
    ...styles.navItem,
    ...(hovered === 6 ? styles.navItemHover : {}),
    ...(selected === 6 ? styles.navItemSelected : {}),
  }}
  onMouseEnter={() => handleMouseEnter(6)}
  onMouseLeave={handleMouseLeave}
  onClick={() => handleItemClick(6)}
>
  <FaIcon /> {/* Opcional */}
  Mi Página
</a>
```

### Paso 5: (Opcional) Integrar API

Si necesitas datos del backend:

1. Agregar endpoint en `src/constants/endpoints.js`:
```javascript
export const ENDPOINTS = {
  // ... endpoints existentes
  MI_PAGINA: '/obtener_datos_mi_pagina',
};
```

2. Agregar método en `src/services/api.service.js`:
```javascript
async getMiPaginaData() {
  if (USE_MOCK) {
    return mockFetch(miPaginaMockData);
  }
  return fetch(`${ENDPOINTS.API_BASE_URL}${ENDPOINTS.MI_PAGINA}`);
}
```

3. Crear datos mock en `src/mock/miPagina.mock.js`:
```javascript
export const miPaginaMockData = [
  { id: 1, nombre: "Dato ejemplo 1" },
  { id: 2, nombre: "Dato ejemplo 2" }
];
```

### Paso 6: Usar en Componente

```jsx
import { apiService } from '../services/api.service.js';

const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  apiService.getMiPaginaData()
    .then((response) => response.json())
    .then((data) => {
      setData(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error:", error);
      setLoading(false);
    });
}, []);
```

## 🎨 Guía de Estilos

### Colores
Usar siempre constantes de `src/constants/styles.js`:
```javascript
COLORS.PRIMARY_ORANGE  // #FF9500 - Color principal
COLORS.SIDEBAR_GRAY    // #D9D9D9 - Fondo sidebar
COLORS.CARD_GRAY       // #f4f4f4 - Fondos de tarjeta
COLORS.TEXT_DARK       // #888 - Texto secundario
COLORS.WHITE           // #FFFFFF
COLORS.BLACK           // #000000
```

### Espaciado
```javascript
SPACING.CARD_PADDING   // '15px'
SPACING.GRID_GAP       // '20px'
SPACING.CONTENT_PADDING // '20px'
SPACING.BORDER_RADIUS  // '8px'
SPACING.SMALL_GAP      // '10px'
```

## 🔐 Sistema de Autenticación

### Sesión de Usuario
Los datos se guardan en `localStorage` con clave `usuario`:
```javascript
const usuario = JSON.parse(localStorage.getItem('usuario'));
// { id, email, rol, nombre }
```

### Rutas Protegidas
Para páginas que requieren autenticación:
```jsx
useEffect(() => {
  const storedUser = localStorage.getItem('usuario');
  if (!storedUser || !JSON.parse(storedUser)?.rol === 'admin') {
    navigate('/', { replace: true });
  }
}, [navigate]);
```

### Logout
```javascript
const handleLogout = () => {
  localStorage.removeItem('usuario');
  navigate('/', { replace: true });
};
```

## 🌐 Sistema de Rutas

La aplicación usa **Hash Router** para compatibilidad con GitHub Pages:
- URL base: `/#/`
- Ejemplo: `http://localhost:3000/#/cursos`
- Rutas dinámicas: `/#/detalle-laboratorio/:id`

## 📱 Responsive Design

El proyecto es completamente responsive:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

Usar media queries en CSS:
```css
@media (max-width: 768px) {
  /* Estilos mobile */
}
```

## 🧪 Testing

Ejecutar pruebas:
```bash
npm test
```

Las pruebas usan React Testing Library. Los componentes principales deberían tener tests unitarios.

## 🚀 Deploy para Producción

1. Configurar `USE_MOCK = false` en `src/constants/env.js`
2. Configurar URL del backend en `src/config.js`
3. Generar build:
```bash
npm run build
```
4. Deployar carpeta `build/` en servidor web

## 🐛 Solución de Problemas

### API No Responde
Verificar `USE_MOCK`:
```javascript
console.log('Mock mode:', USE_MOCK); // Debe ser false para backend real
```

### Rutas No Funcionan
Asegurar uso de Hash Router en URLs: `/#/ruta` en lugar de `/ruta`

### Estilos No Aplicados
Verificar importación de CSS y uso de constantes de `COLORS`

### Problemas de Autenticación
Revisar `localStorage` en DevTools:
```javascript
localStorage.getItem('usuario');
```

## 📚 Documentación Adicional

- `PROJECT_GUIDE.md` - Guía técnica completa
- `src/constants/` - Configuración centralizada
- `src/utils/` - Funciones helper

## 🤝 Contribución

1. Respetar arquitectura existente
2. Usar componentes y constantes establecidas
3. Mantener consistencia en estilos
4. Agregar tests para nuevas funcionalidades
5. Documentar cambios significativos

---

**Versión**: 0.1.0  
**Tecnología**: React 18.3.1, React Router 6.27.0, React Icons 5.3.0  
**Desarrollado para**: Universidad de Lima - Programa de Ingeniería de Sistemas