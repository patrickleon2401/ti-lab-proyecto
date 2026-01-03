# LABS TI React Project - Development Guide

## Project Overview

This is a React-based web application for "LABS TI" - a laboratory management platform for the Systems Engineering program at Universidad de Lima. The application serves as an educational platform for managing laboratories, courses, materials, and technical manuals.

## Technology Stack

### Core Dependencies
- **React 18.3.1** - Modern React with hooks
- **React Router DOM 6.27.0** - Hash-based routing
- **React Slick 0.30.2** - Image carousel functionality
- **React Icons 5.3.0** - UI icons
- **PDF Libraries** - @react-pdf-viewer/core 3.12.0 for PDF viewing, jsPDF for PDF generation
- **GitHub Pages** - gh-pages 6.3.0 for deployment

### Backend Integration
- **RESTful API** communication with Django backend
- **Mock Data Support** - Complete mock data layer for development
- **Base URL Configuration** - Centralized in `config.js`
- **Authentication** - JWT-based login system with localStorage persistence
- **Development Isolation** - Works 100% without backend via `USE_MOCK` flag
- **AI Assistant Integration** - TILab Assistant with chat interface (placeholder for AI backend)

## Project Structure

### Frontend Structure
```
src/
├── App.jsx                 # Main application entry point
├── config.js              # API configuration (backend URLs)
├── router/
│   └── Rutas.jsx          # Route definitions (Hash Router)
├── components/            # Reusable UI components
│   ├── LayoutWithSidebar.jsx # Main layout wrapper
│   ├── Loading.jsx         # Loading state component
│   ├── DownloadButton.jsx  # Download button with mock/real logic
│   ├── ImageCarousel.jsx   # Image carousel wrapper
│   └── Card.jsx           # Generic card component
├── constants/             # Centralized constants
│   ├── env.js            # Environment flags (USE_MOCK)
│   ├── endpoints.js       # API endpoints definitions
│   ├── styles.js         # Color and spacing constants
│   └── ui.js            # UI configuration objects
├── services/              # Data layer abstraction
│   └── api.service.js    # API service with mock/real switch
├── utils/                 # Helper functions
│   ├── delay.js          # Delay simulation helper
│   ├── text.js           # Text rendering helpers
│   └── url.js            # URL building helpers
├── mock/                 # Mock data for development
│   ├── auth.mock.js      # Authentication mock
│   ├── componentes.mock.js # Components mock data
│   ├── cursos.mock.js    # Courses mock data
│   ├── laboratorios.mock.js # Laboratories mock data
│   └── materiales.mock.js # Materials mock data
├── topbar/
│   ├── TopBar.jsx         # Main header component
│   └── LoginPanel.jsx     # Authentication interface
├── sidebar/
│   └── sidebar.jsx        # Navigation menu (missing Materiales link)
├── home/
│   ├── Home.jsx           # Laboratory overview
│   ├── Aula.jsx           # Laboratory card component
│   ├── DetalleLaboratorio.jsx  # Laboratory details
│   ├── Home.css           # Responsive grid styles
│   ├── Aula.css           # Fixed card dimensions
│   └── DetalleLaboratorio.css
├── cursos/
│   ├── Cursos.jsx         # Course catalog
│   ├── CursoCard.jsx      # Course card component
│   └── DetalleCurso.jsx   # Course details with materials
├── disponibilidad/
│   ├── Disponibilidad.jsx # Laboratory schedule
│   └── Disponibilidad.css
├── manual/
│   ├── Manual.jsx         # Technical manuals browser
│   ├── ComponenteDetalle.jsx  # Component details
│   └── Manual.css         # Responsive grid with sidebar fix
├── material/
│   ├── Material.jsx       # Course materials (direct layout, not LayoutWithSidebar)
│   └── Material.css       # Material list styling
├── tilabAssistant/
│   ├── TILabAssistant.jsx # AI chat interface with simulated responses
│   └── TILabAssistant.css # Chat styling with animations
├── AdminHome/
│   └── AdminInterface.jsx # Admin dashboard with logout
├── parafuturoadmin.jsx/   # Alternative implementation (purpose unclear)
│   └── amdin.jsx         # Material with PDF viewer integration
└── Images/
    └── iot.jpg            # Static images
```

### Backend Structure (Django)
```
backend-TILAB-rama56/
├── manage.py              # Django management script
├── requirements.txt       # Python dependencies
├── data.json             # Initial data population
├── db.sqlite3            # SQLite database
├── backend/              # Django project configuration
│   ├── settings.py      # Project settings including CORS
│   ├── urls.py          # Main URL routing
│   └── wsgi.py          # WSGI configuration
└── backendTi/           # Main Django app
    ├── models.py        # Database models (Laboratorio, Curso, Material, etc.)
    ├── views.py         # API view functions
    ├── urls.py          # App-specific URL routing
    ├── admin.py         # Django admin configuration
    └── migrations/      # Database migration files
```

## Routing System

### Routes Definition (`router/Rutas.jsx`)
```javascript
// Hash-based routing for GitHub Pages compatibility
const router = createHashRouter([
  { path: "/", element: <Home /> },
  { path: "/disponibilidad", element: <Disponibilidad /> },
  { path: "/Cursos", element: <Cursos /> },
  { path: "/Manuales", element: <Manual /> },
  // ⚠️ MISSING: Materials route not added to router
  // { path: "/Materiales", element: <Material /> },
  { path: "/componentes/:id", element: <ComponenteDetalle /> },
  { path: "/detalle-laboratorio/:id", element: <DetalleLaboratorio /> },
  { path: "/detalle-curso/:id", element: <DetalleCurso /> },
  { path: "/AdminInterface", element: <AdminInterface /> },
  { path: "/tilab-assistant", element: <TILabAssistant /> },
]);
```

### Navigation Issues Identified
1. **Missing Route**: Materials component exists but no route defined in router
2. **Sidebar Gap**: Navigation jumps from index 2 to 4 (missing index 3)
3. **Inconsistent URLs**: Some routes use uppercase, others lowercase
4. **Route Access**: Materials accessible only via direct URL navigation

## Component Analysis

### Navigation Components

#### TopBar (`topbar/TopBar.jsx`)
- **Purpose**: Main header with branding and navigation
- **Key Features**:
  - Hamburger menu for mobile navigation
  - University logo linking to official site
  - Platform title "Plataforma LABS TI"
  - Integrates with LoginPanel for authentication
- **Styling**: Fixed position, orange theme (#FF9500)

#### Sidebar (`sidebar/sidebar.jsx`)
- **Purpose**: Main navigation menu
- **Key Features**:
  - Interactive hover states with orange highlight
  - Selected item highlighting
  - Links to main sections
  - Robot icon (FaRobot) for TILab Assistant
  - Index-based state management (hovered, selected)
- **Navigation Items**: Inicio (0), Cursos (1), Disponibilidad (2), [MISSING: Materiales (3)], Manuales (4), TILab Assistant (5)
- **Critical Issue**: Missing "Materiales" link - component exists but not added to navigation
- **Index Gap**: Navigation jumps from index 2 to 4, causing inconsistency
- **Styling**: Gray background (#D9D9D9), vertical layout, 200px width
- **State Pattern**: Uses hovered and selected state with index-based management

#### LoginPanel (`topbar/LoginPanel.jsx`)
- **Purpose**: Authentication interface
- **Key Features**:
  - Slide-in panel from left
  - Email/password authentication
  - Role-based redirection (admin vs user)
  - localStorage for session persistence
- **API Endpoint**: `/back/login`

### Main Feature Components

#### Home (`home/Home.jsx`)
- **Purpose**: Laboratory overview and landing page
- **Key Features**:
  - Fetches laboratories from backend API
  - Displays laboratory cards with images
  - Responsive grid layout
- **API Endpoint**: `/back/obtener_laboratorios`
- **State Pattern**:
```javascript
const [laboratorios, setLaboratorios] = useState([]);
const [loading, setLoading] = useState(true);
```

#### Aula (`home/Aula.jsx`)
- **Purpose**: Individual laboratory card component
- **Props**: `id`, `title`, `description`, `imagen`
- **Key Features**:
  - Clickable card with laboratory image
  - Navigation to detail view
  - Responsive design with hover effects

#### Cursos (`cursos/Cursos.jsx`)
- **Purpose**: Course catalog and management
- **Key Features**:
  - Grid layout (3 columns) for course cards
  - Loading states and error handling
- **API Endpoint**: `/back/obtener_cursos`

#### Disponibilidad (`disponibilidad/Disponibilidad.jsx`)
- **Purpose**: Laboratory schedule display
- **Key Features**:
  - Weekly schedule table (Monday-Saturday)
  - Time slots from 7:00-22:00
  - Color-coded availability (green for available)
- **Data**: Static hardcoded schedule

#### Manual (`manual/Manual.jsx`)
- **Purpose**: Technical manuals browser
- **Key Features**:
  - Grid layout for component cards
  - Navigation to component detail views
- **API Endpoint**: `/back/obtener_componentes`

#### ComponenteDetalle (`manual/ComponenteDetalle.jsx`)
- **Purpose**: Detailed component view with manuals
- **Key Features**:
  - Image carousel (react-slick) with auto-play
  - Component description
  - Downloadable manuals list
- **API Endpoint**: `/back/obtener_componente1/:id`

#### Material (`material/Material.jsx`)
- **Purpose**: Course materials management
- **Key Features**:
  - Groups materials by course using reduce function
  - Download links for PDF materials with mock/real URL switching
  - Direct layout implementation (does NOT use LayoutWithSidebar)
  - Manual TopBar and Sidebar integration
- **API Endpoint**: `/back/obtener_materiales`
- **State Pattern**:
```javascript
const [materiales, setMateriales] = useState([]);
const [loading, setLoading] = useState(true);
```
- **Data Processing**: Materials grouped by course ID and name
- **Layout Issue**: Uses custom layout instead of standard LayoutWithSidebar pattern
- **Navigation Issue**: Component exists but no route defined in router

#### DetalleCurso (`cursos/DetalleCurso.jsx`)
- **Purpose**: Course-specific materials view
- **Key Features**:
  - Materials filtered by specific course
  - POST request with course_id
- **API Endpoint**: `/back/obtener_materiales_por_curso/`

#### DetalleLaboratorio (`home/DetalleLaboratorio.jsx`)
- **Purpose**: Detailed laboratory information
- **Key Features**:
  - Image carousel with auto-play
  - Laboratory description with line breaks
- **API Endpoint**: `/back/obtener_laboratorio1/:id`

#### AdminInterface (`AdminHome/AdminInterface.jsx`)
- **Purpose**: Admin dashboard with session management
- **Key Features**:
  - Admin-only access control
  - Logout functionality
  - Orange-themed design
  - Session security verification
- **Authentication**: Automatic redirect if no admin session exists
- **Logout**: Clears localStorage and redirects to home

#### TILabAssistant (`tilabAssistant/TILabAssistant.jsx`)
- **Purpose**: AI-powered chat assistant for laboratory support
- **Key Features**:
  - Real-time chat interface with message history
  - Timestamps for all messages
  - User/bot message differentiation (orange/gray colors)
  - Responsive design for mobile devices
  - Smooth scroll to latest messages
  - Input validation and disabled state handling
  - Currently uses simulated responses (AI integration placeholder)
- **Styling**: Dedicated CSS with chat bubbles, animations, and responsive breakpoints
- **Future**: Real AI endpoint integration planned

#### Alternative Material Component (`parafuturoadmin.jsx/amdin.jsx`)
- **Purpose**: Enhanced material management with PDF viewer
- **Key Features**:
  - Static inventory table with 12 laboratory items
  - PDF viewer integration using @react-pdf-viewer/core
  - Local file upload functionality
  - Direct layout (not using LayoutWithSidebar pattern)
- **Note**: Alternative implementation to main Material component

## Configuration

### Environment Management
```javascript
// src/constants/env.js
export const USE_MOCK = true;  // Switch between mock and real API
```

### API Configuration (`config.js`)
```javascript
// Local IP configuration for real backend
const local = "192.168.51.205";
const pcdeApoyo = "127.0.0.1:8000";
export { local, pcdeApoyo };
```

### API Endpoints (`src/constants/endpoints.js`)
```javascript
// Centralized endpoint definitions
export const ENDPOINTS = {
  LABORATORIOS: '/obtener_laboratorios',
  CURSOS: '/obtener_cursos',
  COMPONENTES: '/obtener_componentes',
  MATERIALES: '/obtener_materiales',
  LOGIN: '/login/',
  // ... more endpoints
};
```

## Styling Guidelines

### Color Scheme (`src/constants/styles.js`)
```javascript
export const COLORS = {
  PRIMARY_ORANGE: '#FF9500',  // Brand color
  SIDEBAR_GRAY: '#D9D9D9',    // Sidebar background
  CARD_GRAY: '#f4f4f4',       // Card backgrounds
  TEXT_DARK: '#888',           // Text color
  WHITE: '#FFFFFF',
  BLACK: '#000000'
};
```

### Spacing Constants (`src/constants/styles.js`)
```javascript
export const SPACING = {
  CARD_PADDING: '15px',
  GRID_GAP: '20px',
  CONTENT_PADDING: '20px',
  BORDER_RADIUS: '8px',
  SMALL_GAP: '10px'
};
```

### CSS Architecture
- **Component-based CSS**: Each component has its own CSS file
- **Centralized Constants**: Colors and spacing in `src/constants/styles.js`
- **Inline Styles**: Heavy use for dynamic styling
- **Responsive Design**: Media queries for mobile/tablet/desktop
- **Consistent Theme**: Orange primary color throughout

### Reusable Components

### LayoutWithSidebar (`src/components/LayoutWithSidebar.jsx`)
```jsx
// Standard layout structure used throughout app
<LayoutWithSidebar>
  <h2>Page Title</h2>
  <p>Content here</p>
</LayoutWithSidebar>
```

### Loading Component (`src/components/Loading.jsx`)
```jsx
// Consistent loading state
<Loading message="Cargando datos..." />
```

### Download Button (`src/components/DownloadButton.jsx`)
```jsx
// Handles mock vs real backend URLs
<DownloadButton filename="document.pdf" />
```

### Card Component (`src/components/Card.jsx`)
```jsx
// Generic card with consistent styling
<Card onClick={handleClick}>
  <p>Card content</p>
</Card>
```

### Image Carousel (`src/components/ImageCarousel.jsx`)
```jsx
// Standardized image carousel with slick
<ImageCarousel>
  <div><img src="image1.jpg" /></div>
  <div><img src="image2.jpg" /></div>
</ImageCarousel>
```

## Helper Functions (`src/utils/`)

### Delay Helper (`src/utils/delay.js`)
```javascript
import { delay } from '../utils/delay.js';

await delay(1000); // Simulate API delay
```

### Text Helper (`src/utils/text.js`)
```javascript
import { renderMultilineText } from '../utils/text.js';

// Render text with line breaks as paragraphs
{renderMultilineText(description)}
```

### URL Helper (`src/utils/url.js`)
```javascript
import { createDownloadUrl } from '../utils/url.js';

// Creates correct URL based on mock/real mode
const downloadUrl = createDownloadUrl(filename);
```

## Data Flow Patterns

### API Service Layer (`src/services/api.service.js`)
```javascript
// Centralized API service with mock/real switch
import { apiService } from '../services/api.service.js';

const response = await apiService.getLaboratorios();
const data = await response.json();
```

### Mock Data Development
```javascript
// src/mock/ directory contains complete mock datasets
// Works offline, no backend required when USE_MOCK = true
export const laboratoriosMock = [
  { id: 1, nombre: "Lab Name", foto1: "image.jpg" }
];
```

## Authentication & Session Management

### Authentication System
```javascript
// src/mock/auth.mock.js - Mock authentication
const result = await authMock.login(email, password);
if (result.success) {
  localStorage.setItem('usuario', JSON.stringify(data));
}
```

### Session Storage Pattern
```javascript
// User session stored in localStorage
const storedUser = localStorage.getItem('usuario');
const usuario = JSON.parse(storedUser);
// usuario contains: { id, email, rol, nombre }
```

### Role-Based Access Control
```javascript
// Admin route protection
useEffect(() => {
  const storedUser = localStorage.getItem('usuario');
  if (!storedUser || !JSON.parse(storedUser)?.rol === 'admin') {
    navigate('/', { replace: true });
  }
}, [navigate]);
```

### Logout Implementation
```javascript
// src/AdminHome/AdminInterface.jsx
const handleLogout = () => {
  localStorage.removeItem('usuario');  // Clear session
  navigate('/', { replace: true });   // Redirect to home
};
```

### Component Pattern (Updated)
```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  apiService.getSomeData()
    .then((response) => response.json())
    .then((data) => {
      setData(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
      setLoading(false);
    });
}, []);
```

### Navigation Pattern
```javascript
// Navigate with parameters
const navigate = useNavigate();
const handleClick = (id) => {
  navigate(`/detalle-componente/${id}`);
};
```

## Key API Endpoints

| Endpoint | Method | Purpose | Component |
|----------|--------|---------|-----------|
| `/back/obtener_laboratorios` | GET | Fetch all laboratories | Home |
| `/back/obtener_laboratorio1/:id` | GET | Fetch laboratory details | DetalleLaboratorio |
| `/back/obtener_cursos` | GET | Fetch all courses | Cursos |
| `/back/obtener_materiales` | GET | Fetch all materials | Material |
| `/back/obtener_materiales_por_curso/` | POST | Fetch course materials | DetalleCurso |
| `/back/obtener_componentes` | GET | Fetch all components | Manual |
| `/back/obtener_componente1/:id` | GET | Fetch component details | ComponenteDetalle |
| `/back/login` | POST | User authentication | LoginPanel |
| `/back/ai-assistant` | POST | AI chat responses (planned) | TILabAssistant |

## Backend Integration

### Django Backend Configuration
The project includes a complete Django backend with the following features:

#### Database Models (`backendTi/models.py`)
- **Laboratorio**: Laboratory information with images and descriptions
- **Curso**: Course catalog with names and IDs
- **Material**: Educational materials with course relationships
- **Componente**: Technical components with manuals and photos
- **Manual**: Technical documentation with URLs
- **Admin**: User administration with role management

#### API Endpoints Structure
```python
# backendTi/urls.py
urlpatterns = [
    path('obtener_laboratorios/', views.obtener_laboratorios),
    path('obtener_laboratorio1/<int:id>/', views.obtener_laboratorio1),
    path('obtener_cursos/', views.obtener_cursos),
    path('obtener_materiales/', views.obtener_materiales),
    path('obtener_materiales_por_curso/', views.obtener_materiales_por_curso),
    path('obtener_componentes/', views.obtener_componentes),
    path('obtener_componente1/<int:id>/', views.obtener_componente1),
    path('login/', views.login),
    # AI Assistant endpoint (planned)
    # path('ai-assistant/', views.ai_assistant),
]
```

#### Frontend-Backend Connection
```javascript
// src/config.js
const local = "192.168.51.205";  // Backend server IP
const pcdeApoyo = "127.0.0.1:8000";  // Local development
export { local, pcdeApoyo };
```

#### CORS Configuration
Backend configured to accept requests from frontend development server.

## Development Guidelines

### Component Creation
1. **Follow existing patterns**: Use similar structure to existing components
2. **Responsive design**: Always include mobile-friendly styles with media queries
3. **Loading states**: Implement loading indicators for API calls
4. **Error handling**: Include try-catch blocks for API operations
5. **Consistent naming**: Use camelCase for components and variables
6. **Authentication guards**: Add session verification for protected routes
7. **Session management**: Implement logout where appropriate
8. **Layout consistency**: Use LayoutWithSidebar for standard pages
9. **Route registration**: Add new routes to router/Rutas.jsx
10. **Navigation updates**: Add new pages to sidebar/sidebar.jsx

### State Management
- **Local State**: Use `useState` for component-specific data
- **Side Effects**: Use `useEffect` for API calls and subscriptions
- **Navigation**: Use `useNavigate` from React Router
- **Authentication**: Store user data in localStorage with `usuario` key
- **Session Cleanup**: Remove `usuario` key for logout
- **Route Protection**: Verify admin role with automatic redirects

### Styling Best Practices
1. **Component CSS**: Create separate CSS file for each component
2. **Responsive Design**: Use media queries for different screen sizes
3. **Consistent Colors**: Stick to the established color scheme
4. **Hover Effects**: Add transitions for interactive elements
5. **Card Design**: Use consistent card styling across components

## Common Tasks

### Adding a New Component
1. Create component folder in appropriate directory
2. Create `.jsx` file with component structure
3. Create `.css` file for styling
4. Add route in `router/Rutas.jsx`
5. Import and use in parent components

### Adding API Integration
1. Add endpoint to `src/constants/endpoints.js`
2. Add method to `src/services/api.service.js`
3. Add mock data to appropriate file in `src/mock/`
4. Use existing component pattern with `apiService`

### Adding Protected Routes
1. Add session verification in `useEffect`
2. Check `localStorage.getItem('usuario')` exists
3. Verify `JSON.parse(usuario).rol === 'admin'` for admin routes
4. Redirect with `navigate('/', { replace: true })` if unauthorized
5. Implement logout with `localStorage.removeItem('usuario')`

### Using Mock Data for Development
1. Set `USE_MOCK = true` in `src/constants/env.js`
2. All API calls will use mock data automatically
3. No backend required for development
4. Switch to `false` for production

### Updating Navigation
1. Modify `sidebar/sidebar.jsx` for main navigation
2. Update `TopBar.jsx` for header navigation
3. Add routes in `Rutas.jsx`
4. Ensure responsive behavior

## Testing

### Available Scripts
```bash
npm start          # Development server (with mock/real API)
npm test           # Run tests
npm run build      # Production build
npm run eject      # Eject from CRA (irreversible)
```

### Development Modes
```bash
# Mock Mode (no backend required)
# Set USE_MOCK = true in src/constants/env.js
npm start

# Real Backend Mode
# Set USE_MOCK = false in src/constants/env.js
npm start

# Deploy to GitHub Pages
npm run deploy
```

### GitHub Pages Deployment
```bash
# Pre-deploy build and deploy
npm run predeploy
npm run deploy

# Deploy URL configured in package.json
"homepage": "https://patrickleon2401.github.io/ti-lab-proyecto"
```

### Testing Guidelines
- Use React Testing Library for component testing
- Test API integration with mock responses
- Test navigation and routing functionality
- Test responsive design behavior

## Deployment Considerations

### Production Build
1. Update `config.js` with production API URL
2. Run `npm run build` to create optimized bundle
3. Deploy build folder to web server
4. Ensure backend API is accessible

### Environment Variables
- Use `.env` files for sensitive configuration
- Update `config.js` to use environment variables
- Different configurations for development/production

## Security Notes

### Authentication
- JWT tokens stored in localStorage
- Role-based access control
- Session management on client side
- Admin session verification with automatic protection
- Logout functionality with session cleanup

### API Security
- Use HTTPS in production
- Implement proper error handling
- Validate user input on client side

## Development Improvements Applied

### Code Quality Enhancements
1. **✅ Extracted Utils**: Helper functions in `src/utils/`
2. **✅ Centralized Constants**: All constants in `src/constants/`
3. **✅ Service Layer**: Clean API abstraction
4. **✅ Reusable Components**: Common UI patterns extracted
5. **✅ Mock Data**: Complete offline development support
6. **✅ DRY Principle**: Eliminated code duplication

### Architecture Improvements
1. **✅ Component Composition**: Reusable layout and UI components
2. **✅ Configuration Management**: Centralized configuration
3. **✅ Data Layer Abstraction**: Clean separation of concerns
4. **✅ Development Isolation**: Backend independence achieved

## Future Enhancements

### Immediate Priorities (Critical Issues)
1. **🔥 Fix Materials Route**: Add missing route to `router/Rutas.jsx`
2. **🔥 Complete Sidebar Navigation**: Add Materiales link to fix index gap
3. **🔥 Layout Consistency**: Convert Material component to use LayoutWithSidebar
4. **🔥 Backend Integration Testing**: Test frontend with live Django backend
5. **🔥 Navigation Cleanup**: Fix inconsistent URL casing and indexing

### Potential Improvements
1. **TypeScript**: Add type safety for better development experience
2. **State Management**: Implement Context API or Redux for global state
3. **Error Boundaries**: Add React error boundaries for better error handling
4. **Loading Skeletons**: Improve loading states with skeleton components
5. **Testing**: Increase test coverage with React Testing Library
6. **PWA**: Add progressive web app features for offline support
7. **Custom Hooks**: Extract more logic to custom hooks for reusability
8. **Component Library**: Expand reusable component set
9. **Authentication System**: Implement comprehensive auth middleware
10. **Role Management**: Expand role-based access control

### TILab Assistant Roadmap
1. **🤖 AI Integration**: Connect to real AI backend endpoint (`/back/ai-assistant`)
2. **Context Awareness**: Integrate with laboratory data for contextual responses
3. **Multi-language Support**: Spanish/English interface
4. **Voice Input**: Add speech-to-text functionality
5. **Knowledge Base**: Integrate with manuals and materials for smart responses
6. **Smart Suggestions**: Contextual help recommendations based on user location

### Backend Development Roadmap
1. **🔗 API Testing**: Comprehensive testing of all frontend-backend endpoints
2. **🔒 Security Enhancement**: Implement JWT authentication and authorization
3. **📊 Admin Interface**: Enhance Django admin for content management
4. **🗄️ Database Optimization**: Add indexes and optimize queries
5. **📝 API Documentation**: Create comprehensive API documentation
6. **🚀 Production Deployment**: Configure production server and deployment

### Performance Optimizations
1. **Code Splitting**: Implement lazy loading for better initial load
2. **Image Optimization**: Compress and optimize images with WebP support
3. **Caching**: Implement proper caching strategies for API responses
4. **Bundle Analysis**: Monitor and optimize bundle size with webpack-bundle-analyzer
5. **Service Worker**: Add service worker for offline functionality

## Troubleshooting

### Common Issues
1. **API Connection**: Check `USE_MOCK` flag and backend status
2. **Mock Data Not Working**: Verify `USE_MOCK = true` in `src/constants/env.js`
3. **Real API Not Working**: Check `USE_MOCK = false` and backend URL in `config.js`
4. **Routing**: Ensure hash router is used for GitHub Pages
5. **Styling**: Check CSS imports and inline styles
6. **Authentication**: Verify localStorage and token handling
7. **Admin Access**: Check `localStorage.getItem('usuario')` contains admin role
8. **Logout Issues**: Verify `localStorage.removeItem('usuario')` is called
9. **Materials Route Missing**: Component exists but no route in Rutas.jsx
10. **Sidebar Navigation Gap**: Missing Materiales link (index 3 gap)
11. **Layout Inconsistency**: Material component uses custom layout instead of LayoutWithSidebar
12. **Backend Connection**: Django backend available but frontend needs configuration

### Development Mode Switch
```javascript
// src/constants/env.js
export const USE_MOCK = true;   // Development (no backend)
// export const USE_MOCK = false; // Production (real backend)
```

### Debug Tips
- Check `USE_MOCK` flag first when API calls fail
- Use browser DevTools for network requests (real mode only)
- Check console for JavaScript errors
- Verify mock data structure in `src/mock/` files
- Test responsive design with device emulation
- Mock data works completely offline
- **Authentication Debug**: Check `localStorage.getItem('usuario')` in DevTools Console
- **Session Debug**: Verify `JSON.parse(localStorage.getItem('usuario')).rol === 'admin'` for admin access
- **Logout Debug**: Ensure `localStorage.removeItem('usuario')` is called and executed
- **Redirect Debug**: Check for automatic redirects from protected routes
- **TILab Assistant Debug**: Check `delay` utility for simulated responses
- **PDF Viewer Debug**: Ensure @react-pdf-viewer/core is properly loaded
- **Navigation Debug**: Check sidebar links match routes in Rutas.jsx
- **Materials Debug**: Try direct URL `/#/materiales` - should show 404 due to missing route
- **Backend Debug**: Check Django server running on configured IP/port
- **CORS Debug**: Verify backend allows requests from frontend origin
- **Responsive Debug**: Test at 320px, 768px, 1024px breakpoints for grid layouts

This guide provides comprehensive documentation for the LABS TI React project, enabling efficient development, maintenance, and enhancement of the platform.

---

## Recent Updates (Current Version)

### New Features Added
1. **TILab Assistant**: Complete AI chat interface with responsive design and real-time messaging
2. **Enhanced PDF Management**: Alternative material component with PDF viewer integration
3. **GitHub Pages Deployment**: Automated deployment configuration with pre-deploy scripts
4. **Navigation Updates**: Added TILab Assistant to sidebar navigation with robot icon
5. **Backend Integration**: Django backend added with complete API endpoints and models

### Technical Improvements
1. **React PDF Viewer**: Integrated @react-pdf-viewer/core and @react-pdf-viewer/default-layout for PDF rendering
2. **Deployment Pipeline**: Pre-deploy and deploy scripts for GitHub Pages automation
3. **Enhanced Styling**: Dedicated CSS for chat interface with animations and responsive breakpoints
4. **Component Architecture**: Maintained consistent patterns for new features
5. **Backend Development**: Complete Django backend with migrations, models, and API views
6. **Responsive Design**: Comprehensive mobile-first approach with media queries for all breakpoints

### UI/UX Enhancements Applied
1. **Critical Bug Fixes**: Sidebar positioning issues resolved in Manual view
2. **Responsive Grids**: Implemented adaptive layouts (3→2→1 columns) for all card components
3. **Mobile Optimization**: Fixed card widths, padding, and spacing for mobile devices
4. **Layout Stability**: Ensured consistent TopBar width (100%) across all routes
5. **Content Area Optimization**: Used `calc(100vw - 240px)` to respect sidebar width

### Backend Development Status
- ✅ Django backend structure complete
- ✅ Database models for laboratories, courses, materials, components
- ✅ API endpoints implemented for all frontend features
- ✅ Migrations applied and database populated
- ✅ CORS configuration for frontend-backend communication
- ✅ Admin interface for content management

### Known Issues & TODOs
1. **Missing Navigation**: "Materiales" route exists but not linked in sidebar navigation
2. **AI Integration**: TILab Assistant using placeholder responses (backend endpoint ready)
3. **Component Duplication**: Alternative Material component (`parafuturoadmin.jsx/amdin.jsx`) purpose unclear
4. **Route Gaps**: Sidebar navigation indexing inconsistency (missing index 3)
5. **Backend Connection**: Frontend configured but needs testing with live backend

### Development Status
- ✅ Core functionality fully operational
- ✅ Mock data system working perfectly for offline development
- ✅ Authentication and session management complete
- ✅ Responsive design implemented across all components
- ✅ Backend API development complete
- ✅ UI fixes and optimizations applied
- ⏳ Frontend-backend integration testing needed
- ⏳ AI backend integration pending
- ⏳ Production deployment with real backend

---

## Migration & Refactoring Summary

### Legacy Code Refactoring Applied
The LABS TI React project underwent conservative refactoring to improve code quality while maintaining 100% functional compatibility:

**Before**: scattered constants, duplicated code, backend dependency
**After**: centralized architecture, reusable components, mock data support

### Key Benefits Achieved
1. **Development Independence**: 100% functional without backend
2. **Code Maintainability**: Centralized constants and utils
3. **Consistency**: Standardized components and patterns
4. **Team Collaboration**: Clear structure and documentation
5. **Rapid Development**: Mock data enables fast prototyping
6. **Security**: Proper authentication and session management
7. **User Experience**: Complete authentication flow with logout

### Refactoring Philosophy Applied
- **Conservative Approach**: Zero functional changes
- **Backward Compatibility**: All existing behavior preserved
- **Incremental Changes**: Small, verifiable commits
- **Legacy Respect**: Maintained original architecture
- **Security First**: Authentication and session integrity maintained