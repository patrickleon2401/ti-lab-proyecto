import React, { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      try {
        setUser(JSON.parse(usuario));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('usuario');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Mock login response
      const mockResponse = {
        success: true,
        data: { 
          id: 1, 
          email: email, 
          rol: 'admin', 
          nombre: 'Admin User' 
        }
      };
      
      if (mockResponse.success) {
        localStorage.setItem('usuario', JSON.stringify(mockResponse.data));
        setUser(mockResponse.data);
        return { success: true };
      }
      return { success: false, error: 'Credenciales incorrectas' };
    } catch (error) {
      return { success: false, error: 'Error en el servidor' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('usuario');
    setUser(null);
  };

  const updateUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('usuario', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('usuario');
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.rol === 'admin';

  return {
    user,
    loading,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    updateUser
  };
};