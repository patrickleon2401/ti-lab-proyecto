import React, { useRef, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { pcdeApoyo } from '../config'; // Asegúrate de tener esta IP o dominio definido
import { useNavigate } from "react-router-dom";
const LoginPanel = ({ isOpen, onClose }) => {
  const panelRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
  if (storedUser) {
    try {
      const usuario = JSON.parse(storedUser);
      if (usuario && usuario.rol === 'admin') {
        navigate('/AdminInterface', { replace: true });
      }
    } catch (error) {
      console.error("Error al parsear usuario desde localStorage:", error);
      localStorage.removeItem('usuario');
    }
  }

  const handleClickOutside = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      onClose();
    }
  };

  if (isOpen) {
    document.addEventListener('mousedown', handleClickOutside);
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
    
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://${pcdeApoyo}/back/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('usuario', JSON.stringify(data));
      if (data.rol === 'admin') {
        navigate(`/AdminInterface`,{replace: true});;
      } else {
        navigate('/', { replace: true });
      }
    } else {
      setError(data.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div
      ref={panelRef}
      style={{
        ...styles.loginPanel,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      }}
    >
      <div style={styles.closeButton} onClick={onClose}>
        <FaTimes size={20} color="#FF9500" />
      </div>

      <h2 style={styles.loginTitle}>Iniciar Sesión</h2>
      <form style={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={styles.loginButton}>Ingresar</button>
      </form>
    </div>
  );
};

const styles = {
  loginPanel: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '300px',
    height: '100%',
    backgroundColor: '#fff',
    boxShadow: '2px 0 5px rgba(0,0,0,0.3)',
    padding: '20px',
    boxSizing: 'border-box',
    zIndex: 1000,
    transition: 'transform 0.3s ease-in-out',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  },
  loginTitle: {
    marginBottom: '20px',
    fontSize: '22px',
    color: '#FF9500',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  loginButton: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#FF9500',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default LoginPanel;
