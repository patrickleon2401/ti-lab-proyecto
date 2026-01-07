import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import StandardLayout from './components/StandardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import './styles/global.css';
import './components/styles/LaboratoryCard.css';

// Placeholder imports for pages that will be created
const CoursesPage = React.lazy(() => import('./pages/CoursesPage'));
const CourseDetailPage = React.lazy(() => import('./pages/CourseDetailPage'));
const MaterialsPage = React.lazy(() => import('./pages/MaterialsPage'));
const ManualsPage = React.lazy(() => import('./pages/ManualsPage'));
const ComponentDetailPage = React.lazy(() => import('./pages/ComponentDetailPage'));
const AvailabilityPage = React.lazy(() => import('./pages/AvailabilityPage'));
const AdminInterface = React.lazy(() => import('./pages/AdminInterface'));
const TILabAssistant = React.lazy(() => import('./pages/TILabAssistant'));
const LaboratoryDetailPage = React.lazy(() => import('./pages/LaboratoryDetailPage'));

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Routes with Standard Layout */}
            <Route path="/" element={<StandardLayout />}>
              <Route index element={<HomePage />} />
              <Route 
                path="Cursos" 
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <CoursesPage />
                  </React.Suspense>
                } 
              />
              <Route 
                path="detalle-curso/:id" 
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <CourseDetailPage />
                  </React.Suspense>
                } 
              />
              <Route 
                path="Materiales" 
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <MaterialsPage />
                  </React.Suspense>
                } 
              />
              <Route 
                path="Manuales" 
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <ManualsPage />
                  </React.Suspense>
                } 
              />
              <Route 
                path="componentes/:id" 
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <ComponentDetailPage />
                  </React.Suspense>
                } 
              />
              <Route 
                path="detalle-laboratorio/:id" 
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <LaboratoryDetailPage />
                  </React.Suspense>
                } 
              />
              <Route 
                path="disponibilidad" 
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <AvailabilityPage />
                  </React.Suspense>
                } 
              />
              <Route 
                path="tilab-assistant" 
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <TILabAssistant />
                  </React.Suspense>
                } 
              />
              <Route 
                path="AdminInterface" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <AdminInterface />
                    </React.Suspense>
                  </ProtectedRoute>
                } 
              />
            </Route>
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;