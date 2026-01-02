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
- **Base URL Configuration** - Centralized in `config.js`
- **Authentication** - JWT-based login system with localStorage persistence

## Project Structure

```
src/
├── App.jsx                 # Main application entry point
├── config.js              # API configuration
├── router/
│   └── Rutas.jsx          # Route definitions
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

### API Configuration (`config.js`)
```javascript
const config = {
  apiUrl: 'http://192.168.1.15:8000',  // Local IP configuration
  // Update this for different environments
};
export default config;
```

## Styling Guidelines

### Color Scheme
- **Primary Orange**: #FF9500 (brand color)
- **Secondary Gray**: #D9D9D9 (sidebar background)
- **White**: #FFFFFF (card backgrounds)
- **Black**: #000000 (text)

### CSS Architecture
- **Component-based CSS**: Each component has its own CSS file
- **Inline Styles**: Heavy use for dynamic styling
- **Responsive Design**: Media queries for mobile/tablet/desktop
- **Consistent Theme**: Orange primary color throughout

### Common Patterns
```css
/* Card styling */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-2px);
}

/* Responsive grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
```

## Data Flow Patterns

### API Integration Pattern
```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/back/endpoint`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
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
1. Update `config.js` if new endpoint needed
2. Use existing API pattern with `useEffect`
3. Implement loading and error states
4. Handle data transformation if needed

### Updating Navigation
1. Modify `sidebar/sidebar.jsx` for main navigation
2. Update `TopBar.jsx` for header navigation
3. Add routes in `Rutas.jsx`
4. Ensure responsive behavior

## Testing

### Available Scripts
```bash
npm start          # Development server
npm test           # Run tests
npm run build      # Production build
npm run eject      # Eject from CRA (irreversible)
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

## Future Enhancements

### Potential Improvements
1. **TypeScript**: Add type safety
2. **State Management**: Implement Context API or Redux
3. **Error Boundaries**: Add React error boundaries
4. **Loading Skeletons**: Improve loading states
5. **Testing**: Increase test coverage
6. **PWA**: Add progressive web app features

### Performance Optimizations
1. **Code Splitting**: Implement lazy loading
2. **Image Optimization**: Compress and optimize images
3. **Caching**: Implement proper caching strategies
4. **Bundle Analysis**: Monitor and optimize bundle size

## Troubleshooting

### Common Issues
1. **API Connection**: Check `config.js` URL and backend status
2. **Routing**: Ensure hash router is used for GitHub Pages
3. **Styling**: Check CSS imports and inline styles
4. **Authentication**: Verify localStorage and token handling

### Debug Tips
- Use browser DevTools for network requests
- Check console for JavaScript errors
- Verify API responses in Network tab
- Test responsive design with device emulation

This guide provides comprehensive documentation for the LABS TI React project, enabling efficient development, maintenance, and enhancement of the platform.