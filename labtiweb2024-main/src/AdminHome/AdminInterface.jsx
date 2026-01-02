// components/AdminInterface.jsx
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const AdminInterface = () => {
  const navigate = useNavigate();

  // Verificación de seguridad: solo permitir acceso si hay sesión de admin
  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (!storedUser) {
      // No hay sesión, redirigir al Home
      navigate('/', { replace: true });
      return;
    }
    
    try {
      const usuario = JSON.parse(storedUser);
      if (!usuario || usuario.rol !== 'admin') {
        // No es admin, redirigir al Home
        navigate('/', { replace: true });
        return;
      }
    } catch (error) {
      console.error("Error al parsear usuario desde localStorage:", error);
      localStorage.removeItem('usuario');
      navigate('/', { replace: true });
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    // Limpiar completamente la sesión del localStorage
    localStorage.removeItem('usuario');
    
    // Redirigir al Home
    navigate('/', { replace: true });
  };

  const handleLogoutMouseEnter = (e) => {
    e.target.style.backgroundColor = '#E68500'; // Naranja más oscuro
  };

  const handleLogoutMouseLeave = (e) => {
    e.target.style.backgroundColor = '#FF9500'; // Naranja original
  };

  return (
    <div style={styles.container}>
      {/* Botón de cerrar sesión en la esquina superior derecha */}
      <button 
        style={styles.logoutButton}
        onClick={handleLogout}
        onMouseEnter={handleLogoutMouseEnter}
        onMouseLeave={handleLogoutMouseLeave}
      >
        Cerrar sesión
      </button>
      
      <h1 style={styles.title}>Interfaz de Admin</h1>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Para posicionar el botón de logout
  },
  logoutButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#FF9500', // Color naranja consistente con la marca
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease',
    zIndex: 10,
  },
  title: {
    fontSize: '36px',
    color: '#FF9500',
    fontWeight: 'bold',
  },
};

export default AdminInterface;
