import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      setUser(JSON.parse(usuario));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const apiService = (await import('../services/api.service')).apiService;
      const response = await apiService.post('/login', { email, password });
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('usuario', JSON.stringify(data.data));
        setUser(data.data);
        return { success: true };
      }
      return { success: false, error: 'Credenciales incorrectas' };
    } catch (error) {
      return { success: false, error: 'Error en el servidor' };
    }
  };

  const logout = () => {
    localStorage.removeItem('usuario');
    setUser(null);
  };

  const isAdmin = user?.rol === 'admin';

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin,
    login,
    logout
  };
};