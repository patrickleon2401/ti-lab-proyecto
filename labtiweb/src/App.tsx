import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppLayout from './components/layout/AppLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import Cursos from './pages/Cursos';
import Disponibilidad from './pages/Disponibilidad';
import Materiales from './pages/Materiales';
import Manuales from './pages/Manuales';
import TilabAssistant from './pages/TilabAssistant';
import AdminInterface from './pages/AdminInterface';
import LaboratorioDetalle from './pages/LaboratorioDetalle';
import CursoDetalle from './pages/CursoDetalle';
import ComponenteDetalle from './pages/ComponenteDetalle';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="Cursos" element={<Cursos />} />
              <Route path="detalle-curso/:id" element={<CursoDetalle />} />
              <Route path="detalle-laboratorio/:id" element={<LaboratorioDetalle />} />
              <Route path="disponibilidad" element={<Disponibilidad />} />
              <Route path="Materiales" element={<Materiales />} />
              <Route path="Manuales" element={<Manuales />} />
              <Route path="componentes/:id" element={<ComponenteDetalle />} />
              <Route path="tilab-assistant" element={<TilabAssistant />} />
              <Route path="AdminInterface" element={<AdminInterface />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;