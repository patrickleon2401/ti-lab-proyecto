# LABS TI - Laboratorio de Sistemas

Proyecto web para la gestión y visualización de los laboratorios de sistemas de la Universidad de Lima.

## Tecnologías

- React 18+ con TypeScript
- Vite como bundler
- React Router DOM para navegación
- CSS Modules y Tailwind-inspired utilities

## Características

- 🎨 UI Moderna inspirada en ChatGPT
- 📱 Diseño Responsive (Mobile-first)
- 🔐 Sistema de autenticación con roles
- 📂 Gestión de cursos, materiales y componentes
- 💬 Asistente TILab integrado
- 🔄 Modo mock para desarrollo offline

## Scripts

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## Configuración

El proyecto soporta dos modos de operación configurados en `src/constants/env.ts`:

- **Modo Mock**: `USE_MOCK = true` - Datos simulados para desarrollo offline
- **Modo Real**: `USE_MOCK = false` - Conexión al backend Django

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── pages/              # Páginas de la aplicación
├── services/           # Servicios de API
├── constants/          # Constantes y endpoints
├── hooks/              # Hooks personalizados
├── types/              # Tipos TypeScript
├── utils/              # Utilidades helper
└── styles/             # Estilos globales
```

## Variables de Entorno

- Backend configurado en `config.js`
- Cambiar `local` para la IP del servidor backend

## Deploy

Este proyecto está configurado para deploy en GitHub Pages con Hash Router.