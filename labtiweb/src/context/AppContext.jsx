import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [appLoading, setAppLoading] = useState(false);
  
  // Get auth data from useAuth hook
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const navItems = [
    { name: 'Inicio', route: '/', index: 0 },
    { name: 'Cursos', route: '/Cursos', index: 1 },
    { name: 'Disponibilidad', route: '/disponibilidad', index: 2 },
    { name: 'Materiales', route: '/Materiales', index: 3 },
    { name: 'Manuales', route: '/Manuales', index: 4 },
    { name: 'TILab Assistant', route: '/tilab-assistant', index: 5 }
  ];

  const adminNavItems = [
    { name: 'Panel Administrativo', route: '/AdminInterface', index: 6 }
  ];

  const allNavItems = isAuthenticated && user?.rol === 'admin' 
    ? [...navItems, ...adminNavItems]
    : navItems;

  return (
    <AppContext.Provider value={{
      sidebarOpen,
      setSidebarOpen,
      loading: appLoading || authLoading,
      setLoading: setAppLoading,
      navItems: allNavItems,
      user,
      isAuthenticated
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};