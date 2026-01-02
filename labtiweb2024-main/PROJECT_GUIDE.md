# LABS TI React Project - Development Guide

## Project Overview

This is a React-based web application for "LABS TI" - a laboratory management platform for the Systems Engineering program at Universidad de Lima. The application serves as an educational platform for managing laboratories, courses, materials, and technical manuals.

## Technology Stack

### Core Dependencies
- **React 18.3.1** - Modern React with hooks
- **React Router DOM 6.27.0** - Hash-based routing
- **React Slick 0.30.2** - Image carousel functionality
- **React Icons 5.3.0** - UI icons
- **PDF Libraries** - @react-pdf-viewer for PDF viewing, jsPDF for PDF generation

### Backend Integration
- **RESTful API** communication with Django backend
- **Mock Data Support** - Complete mock data layer for development
- **Base URL Configuration** - Centralized in `config.js`
- **Authentication** - JWT-based login system with localStorage persistence
- **Development Isolation** - Works 100% without backend via `USE_MOCK` flag

## Project Structure

```
src/
├── App.jsx                 # Main application entry point
├── config.js              # API configuration
├── router/
│   └── Rutas.jsx          # Route definitions
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
│   └── sidebar.jsx        # Navigation menu
├── home/
│   ├── Home.jsx           # Laboratory overview
│   ├── Aula.jsx           # Laboratory card component
│   ├── DetalleLaboratorio.jsx  # Laboratory details
│   ├── Home.css
│   ├── Aula.css
│   └── DetalleLaboratorio.css
├── cursos/
│   ├── Cursos.jsx         # Course catalog
│   ├── CursoCard.jsx      # Course card component
│   └── DetalleCurso.jsx   # Course details
├── disponibilidad/
│   ├── Disponibilidad.jsx # Laboratory schedule
│   └── Disponibilidad.css
├── manual/
│   ├── Manual.jsx         # Technical manuals browser
│   ├── ComponenteDetalle.jsx  # Component details
│   └── Manual.css
├── material/
│   ├── Material.jsx       # Course materials
│   └── Material.css
├── AdminHome/
│   └── AdminInterface.jsx # Admin dashboard
└── Images/
    └── iot.jpg            # Static images
```

## Routing System

### Routes Definition (`router/Rutas.jsx`)
```javascript
// Hash-based routing
const router = createHashRouter([
  { path: "/", element: <Home /> },
  { path: "/disponibilidad", element: <Disponibilidad /> },
  { path: "/Cursos", element: <Cursos /> },
  { path: "/Manuales", element: <Manual /> },
  { path: "/Materiales", element: <Material /> },
  { path: "/componentes/:id", element: <ComponenteDetalle /> },
  { path: "/detalle-laboratorio/:id", element: <DetalleLaboratorio /> },
  { path: "/detalle-curso/:id", element: <DetalleCurso /> },
  { path: "/AdminInterface", element: <AdminInterface /> },
]);
```

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
  - Interactive hover states
  - Selected item highlighting
  - Links to main sections
- **Styling**: Gray background (#D9D9D9), vertical layout

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
  - Groups materials by course
  - Download links for PDF materials
- **API Endpoint**: `/back/obtener_materiales`

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
- **Purpose**: Admin dashboard (placeholder)
- **Key Features**:
  - Simple placeholder interface
  - Orange-themed design
  - Accessible only to admin users

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

## Development Guidelines

### Component Creation
1. **Follow existing patterns**: Use similar structure to existing components
2. **Responsive design**: Always include mobile-friendly styles
3. **Loading states**: Implement loading indicators for API calls
4. **Error handling**: Include try-catch blocks for API operations
5. **Consistent naming**: Use camelCase for components and variables

### State Management
- **Local State**: Use `useState` for component-specific data
- **Side Effects**: Use `useEffect` for API calls and subscriptions
- **Navigation**: Use `useNavigate` from React Router
- **Authentication**: Store user data in localStorage

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

### Potential Improvements
1. **TypeScript**: Add type safety
2. **State Management**: Implement Context API or Redux
3. **Error Boundaries**: Add React error boundaries
4. **Loading Skeletons**: Improve loading states
5. **Testing**: Increase test coverage
6. **PWA**: Add progressive web app features
7. **Custom Hooks**: Extract more logic to custom hooks
8. **Component Library**: Expand reusable component set

### Performance Optimizations
1. **Code Splitting**: Implement lazy loading
2. **Image Optimization**: Compress and optimize images
3. **Caching**: Implement proper caching strategies
4. **Bundle Analysis**: Monitor and optimize bundle size

## Troubleshooting

### Common Issues
1. **API Connection**: Check `USE_MOCK` flag and backend status
2. **Mock Data Not Working**: Verify `USE_MOCK = true` in `src/constants/env.js`
3. **Real API Not Working**: Check `USE_MOCK = false` and backend URL in `config.js`
4. **Routing**: Ensure hash router is used for GitHub Pages
5. **Styling**: Check CSS imports and inline styles
6. **Authentication**: Verify localStorage and token handling

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

This guide provides comprehensive documentation for the LABS TI React project, enabling efficient development, maintenance, and enhancement of the platform.

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

### Refactoring Philosophy Applied
- **Conservative Approach**: Zero functional changes
- **Backward Compatibility**: All existing behavior preserved
- **Incremental Changes**: Small, verifiable commits
- **Legacy Respect**: Maintained original architecture