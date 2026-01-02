// components/AdminInterface.jsx
import React from 'react';

const AdminInterface = () => {
  return (
    <div style={styles.container}>
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
  },
  title: {
    fontSize: '36px',
    color: '#FF9500',
    fontWeight: 'bold',
  },
};

export default AdminInterface;
