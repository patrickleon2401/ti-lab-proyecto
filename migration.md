# LABS TI Project Migration Guide

## Project Overview

This guide enables a coding agent to rebuild the LABS TI frontend application with a completely new UI/UX design while maintaining full compatibility with the existing Django backend. The backend is immutable and must not be changed - all adaptations must be made on the frontend side.

## Backend Contract Requirements

### Immutable Backend API Structure
The Django backend provides these endpoints which CANNOT be modified:

```javascript
// Authentication
POST /back/login/                    // User login
// Request: { email, password }
// Response: { success, data: { id, email, rol, nombre } }

// Laboratories
GET  /back/obtener_laboratorios      // All laboratories list
GET  /back/obtener_laboratorio1/:id  // Single laboratory details

// Courses  
GET  /back/obtener_cursos             // All courses list

// Materials
GET  /back/obtener_materiales         // All materials list
POST /back/obtener_materiales_por_curso/  // Materials by course
// Request: { curso_id }

// Components & Manuals
GET  /back/obtener_componentes       // All components list  
GET  /back/obtener_componente1/:id   // Component details with manuals
```

### Data Structure Contracts

#### Laboratory Data Structure
```javascript
{
  id: number,
  nombre: string,
  descripcion: string,
  foto1: string,     // URL or relative path
  foto2: string,     // URL or relative path  
  foto3: string      // URL or relative path
}
```

#### Course Data Structure
```javascript
{
  id: number,
  nombre: string
}
```

#### Material Data Structure
```javascript
{
  id: number,
  nombre: string,
  curso: number,     // Foreign key to Course.id
  archivo: string    // PDF filename/URL
}
```

#### Component Data Structure
```javascript
{
  id: number,
  nombre: string,
  descripcion: string,
  fotos: string[],   // Array of image URLs
  manuales: Array<{
    id: number,
    titulo: string,
    archivo: string  // PDF filename/URL
  }>
}
```

### Authentication Requirements

#### Session Management Pattern
```javascript
// Login storage
localStorage.setItem('usuario', JSON.stringify({
  id: number,
  email: string,
  rol: 'admin' | 'user',  // Must check for admin role
  nombre: string
}));

// Session check pattern
const usuario = JSON.parse(localStorage.getItem('usuario'));
if (!usuario || usuario.rol !== 'admin') {
  // Redirect to home - admin protection required
}

// Logout pattern
localStorage.removeItem('usuario');
```

## Frontend Architecture Requirements

### Core Technology Stack
- **React 18+** with hooks required
- **React Router DOM 6+** for navigation
- **Hash Router** mandatory for GitHub Pages compatibility
- **localStorage** for session persistence

### Configuration System
Must implement these configuration files:

#### Environment Switching
```javascript
// constants/env.js
export const USE_MOCK = true;  // Must support mock/real mode switching
```

#### API Configuration  
```javascript
// config.js
const local = "192.168.51.205";  // Backend IP - configurable
const pcdeApoyo = "127.0.0.1:8000";
export { local, pcdeApoyo };
```

#### Endpoint Definitions
```javascript
// constants/endpoints.js
export const ENDPOINTS = {
  LABORATORIOS: '/obtener_laboratorios',
  LABORATORIO_DETALLE: '/obtener_laboratorio1',
  CURSOS: '/obtener_cursos', 
  MATERIALES: '/obtener_materiales',
  MATERIALES_POR_CURSO: '/obtener_materiales_por_curso',
  COMPONENTES: '/obtener_componentes',
  COMPONENTE_DETALLE: '/obtener_componente1',
  LOGIN: '/login'
};
```

### Service Layer Requirements

#### API Service Implementation
```javascript
// services/api.service.js
export class ApiService {
  constructor() {
    this.baseUrl = USE_MOCK ? '' : `http://${local}/back`;
  }

  async get(endpoint) {
    if (USE_MOCK) {
      // Return mock data
    } else {
      // Real API call
      return fetch(`${this.baseUrl}${endpoint}`);
    }
  }

  async post(endpoint, data) {
    if (USE_MOCK) {
      // Return mock response
    } else {
      return fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }
  }
}

export const apiService = new ApiService();
```

## Page Requirements & Data Flow

### 1. Home Page (Laboratories)
**Route**: `/` or `/#/`

**Data Requirements**:
- Fetch all laboratories: `GET /back/obtener_laboratorios`
- Display as cards with images
- Click to navigate to: `/detalle-laboratorio/:id`

**Display Requirements**:
- Grid layout responsive design
- Laboratory images (foto1, foto2, foto3)
- Names and descriptions

### 2. Laboratory Detail Page
**Route**: `/detalle-laboratorio/:id`

**Data Requirements**:
- Fetch single lab: `GET /back/obtener_laboratorio1/:id`
- Display image carousel with all fotos
- Show multiline description

### 3. Courses Page  
**Route**: `/Cursos`

**Data Requirements**:
- Fetch all courses: `GET /back/obtener_cursos`
- Display as course cards
- Click to navigate to: `/detalle-curso/:id`

### 4. Course Detail Page
**Route**: `/detalle-curso/:id`

**Data Requirements**:
- POST request: `{ curso_id: id }` to `/back/obtener_materiales_por_curso/`
- Display filtered materials list
- Provide download links for PDFs

### 5. Materials Page
**Route**: `/Materiales` (Note: missing route in current implementation)

**Data Requirements**:
- Fetch all materials: `GET /back/obtener_materiales`
- Group materials by course using curso field
- Display organized by course sections
- Provide download functionality

### 6. Manuals/Components Page
**Route**: `/Manuales`

**Data Requirements**:
- Fetch components: `GET /back/obtener_componentes`
- Display as component cards
- Click to navigate to: `/componentes/:id`

### 7. Component Detail Page  
**Route**: `/componentes/:id`

**Data Requirements**:
- Fetch component: `GET /back/obtener_componente1/:id`
- Display image carousel with fotos array
- Show component description
- List downloadable manuals with archivo filenames

### 8. Availability Page
**Route**: `/disponibilidad`

**Data Requirements**:
- Currently uses static data
- Weekly schedule table (Monday-Saturday)
- Time slots 7:00-22:00
- Color-coded availability

### 9. Admin Interface
**Route**: `/AdminInterface`

**Authentication Requirements**:
- MUST check admin role in localStorage
- Redirect to home if not admin
- Implement logout functionality

### 10. TILab Assistant (AI Chat)
**Route**: `/tilab-assistant`

**Current Implementation**:
- Simulated responses using delay utility
- Real-time chat interface
- Future integration with `/back/ai-assistant` endpoint

## Navigation Structure Requirements

### Main Navigation Items (Order Critical)
```javascript
const navItems = [
  { name: 'Inicio', route: '/', index: 0 },
  { name: 'Cursos', route: '/Cursos', index: 1 },  
  { name: 'Disponibilidad', route: '/disponibilidad', index: 2 },
  { name: 'Materiales', route: '/Materiales', index: 3 },  // Currently missing - must add
  { name: 'Manuales', route: '/Manuales', index: 4 },
  { name: 'TILab Assistant', route: '/tilab-assistant', index: 5 }
];
```

**Critical Issue to Fix**: The current implementation has missing Materials navigation (index 3 gap). New implementation must include all navigation items.

## Mock Data System Requirements

### Complete Offline Development Support
Must provide complete mock datasets for all endpoints:

```javascript
// Mock data structure examples
export const laboratoriosMock = [
  {
    id: 1,
    nombre: "Laboratorio de Redes",
    descripcion: "Equipamiento especializado en redes de computadoras...",
    foto1: "/Images/redes1.jpg",
    foto2: "/Images/redes2.jpg", 
    foto3: "/Images/redes3.jpg"
  }
];

export const cursosMock = [
  { id: 1, nombre: "Redes de Computadoras" },
  { id: 2, nombre: "Sistemas Operativos" }
];

export const materialesMock = [
  {
    id: 1,
    nombre: "Guía de Prácticas Redes",
    curso: 1,  // References course ID
    archivo: "guia_redes.pdf"
  }
];
```

## UI/UX Requirements for New Implementation

### Brand Identity
- **Primary Color**: Orange (#FF9500) - must maintain brand consistency
- **Secondary Colors**: Gray tones for backgrounds (#D9D9D9, #f4f4f4)
- **University Integration**: Link to Universidad de Lima official site

### Responsive Design Requirements
- **Mobile First**: 320px breakpoint minimum
- **Tablet**: 768px breakpoint
- **Desktop**: 1024px breakpoint
- **Grid Systems**: Adaptive layouts (3→2→1 columns for cards)

### Accessibility Requirements
- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast color compliance

### Component Patterns Required

#### Loading States
```javascript
// Must implement loading indicators for all API calls
const [loading, setLoading] = useState(true);
const [data, setData] = useState([]);

useEffect(() => {
  apiService.getData()
    .then(response => response.json())
    .then(data => {
      setData(data);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error:", error);
      setLoading(false);
    });
}, []);
```

#### Download Functionality
```javascript
// Must handle mock vs real URLs
const createDownloadUrl = (filename) => {
  if (USE_MOCK) {
    return `/mock/${filename}`; // Local mock files
  } else {
    return `http://${local}/media/${filename}`; // Backend media
  }
};
```

#### Navigation Pattern
```javascript
// React Router navigation
const navigate = useNavigate();
const handleNavigation = (id) => {
  navigate(`/detalle-laboratorio/${id}`);
};
```

## Layout Requirements

### Standard Layout Structure
Most pages must use this pattern (except special cases like Materials):

```jsx
<StandardLayout>
  <TopBar />
  <Sidebar />
  <MainContent>
    {/* Page content */}
  </MainContent>
</StandardLayout>
```

### Authentication Integration
```jsx
<ProtectedRoute requiredRole="admin">
  <AdminComponent />
</ProtectedRoute>
```

## Deployment Requirements

### GitHub Pages Compatibility
- **Hash Router**: Mandatory for GitHub Pages deployment
- **Build Process**: `npm run build` creates static files
- **Base Path**: Must support GitHub Pages subdirectory structure

### Environment Configuration
```javascript
// Production deployment config
const config = {
  development: {
    apiUrl: 'http://localhost:8000/back'
  },
  production: {
    apiUrl: 'https://your-backend.com/back'
  }
};
```

## Testing Requirements

### Mock Data Testing
- All features must work 100% with USE_MOCK = true
- No backend dependency for development
- Complete offline functionality

### Integration Testing
- Test all API endpoints with real backend
- Verify authentication flow
- Test all navigation routes
- Responsive design validation

## Security Requirements

### Authentication Security
- Session timeout implementation
- Admin route protection
- Secure logout implementation
- Input validation for forms

### Data Handling
- Sanitize user inputs
- Validate API responses
- Secure file download handling
- XSS prevention

## Performance Requirements

### Code Splitting
- Lazy loading for route components
- Optimize bundle size
- Image optimization
- Progressive loading

### Caching Strategy
- API response caching
- Static asset caching
- Service worker for offline support

## Migration Implementation Steps

### Phase 1: Setup & Architecture
1. Create new React project structure
2. Implement configuration system (config.js, constants/)
3. Set up API service layer with mock/real switching
4. Create authentication system

### Phase 2: Core Components
1. Build layout components (TopBar, Sidebar, StandardLayout)
2. Implement navigation system with all routes
3. Create reusable UI components (cards, buttons, loading)
4. Set up mock data system

### Phase 3: Feature Pages
1. Implement Home page with laboratories
2. Build courses and course detail pages  
3. Create materials page with proper navigation
4. Implement manuals and component detail pages
5. Add availability page
6. Build admin interface with protection

### Phase 4: Advanced Features
1. Implement TILab Assistant with simulated responses
2. Add image carousel components
3. Implement PDF download functionality
4. Add responsive design throughout

### Phase 5: Integration & Testing
1. Test with real Django backend
2. Verify all API endpoints work
3. Test authentication flow
4. Validate responsive design
5. Performance optimization

### Phase 6: Deployment
1. Configure for GitHub Pages deployment
2. Test production build
3. Verify backend connectivity
4. Documentation handoff

## Critical Success Factors

### Backend Compatibility
- All API endpoints must work exactly as specified
- Data structures must match backend expectations
- Authentication flow must be preserved
- No backend modifications allowed

### User Experience
- Maintain all current functionality
- Improve UI/UX while preserving features
- Responsive design mandatory
- Accessibility compliance

### Development Experience
- Mock data system for offline development
- Clear documentation and patterns
- Component reusability
- Code maintainability

## Deliverables Checklist

### Functional Requirements
- [ ] All 6 main pages implemented
- [ ] Navigation system complete with Materials route
- [ ] Authentication system with admin protection
- [ ] Mock data system working 100% offline
- [ ] Real backend integration working
- [ ] Download functionality for PDFs
- [ ] Image carousel implementation
- [ ] TILab Assistant interface

### Technical Requirements  
- [ ] Hash routing for GitHub Pages
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Component reusability
- [ ] Error handling and loading states
- [ ] Security best practices
- [ ] Performance optimization

### Quality Assurance
- [ ] Complete test coverage
- [ ] Cross-browser compatibility
- [ ] Accessibility compliance
- [ ] Performance benchmarks
- [ ] Documentation completeness

This migration guide provides all necessary information for a coding agent to rebuild the LABS TI frontend with a new design while maintaining full compatibility with the existing Django backend. The key is respecting the backend API contracts while having complete freedom to redesign the UI/UX implementation.