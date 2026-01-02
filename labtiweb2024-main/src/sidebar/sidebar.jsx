import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';

const Sidebar = () => {
  const [hovered, setHovered] = useState(null);  
  const [selected, setSelected] = useState(null);  

  const styles = {
    sidebar: {
      position: 'relative',
      width: '200px',
      height: '100%',
      left: '0',
      top: '80px',
      backgroundColor: '#D9D9D9',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 10px',
    },

    navItem: {
      color: '#000',
      textDecoration: 'none',
      fontSize: '18px',
      padding: '10px 0',
      textAlign: 'center',
      cursor: 'pointer',
      borderBottom: '1px solid #ccc',
      padding: '20px',
      transition: 'background-color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
    },

    navItemHover: {
      backgroundColor: '#FF9500',
      color: '#fff',
    },

    navItemSelected: {
      backgroundColor: '#FF9500',
      color: '#fff',
    },
  };

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleItemClick = (index) => {
    setSelected(index);  // Update the selected item
  };

  return (
    <div style={styles.sidebar}>
      <a
        href="#"
        style={{
          ...styles.navItem,
          ...(hovered === 0 ? styles.navItemHover : {}),
          ...(selected === 0 ? styles.navItemSelected : {}),
        }}
        onMouseEnter={() => handleMouseEnter(0)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleItemClick(0)}  // Removed preventDefault()
      >
        Inicio
      </a>
      <a
        href="#cursos"
        style={{
          ...styles.navItem,
          ...(hovered === 1 ? styles.navItemHover : {}),
          ...(selected === 1 ? styles.navItemSelected : {}),
        }}
        onMouseEnter={() => handleMouseEnter(1)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleItemClick(1)}  // Removed preventDefault()
      >
        Cursos
      </a>
      <a
        href="#disponibilidad"
        style={{
          ...styles.navItem,
          ...(hovered === 2 ? styles.navItemHover : {}),
          ...(selected === 2 ? styles.navItemSelected : {}),
        }}
        onMouseEnter={() => handleMouseEnter(2)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleItemClick(2)}  // Removed preventDefault()
      >
        Disponibilidad
      </a>
      
      
      <a
        href="#manuales"
        style={{
          ...styles.navItem,
          ...(hovered === 4 ? styles.navItemHover : {}),
          ...(selected === 4 ? styles.navItemSelected : {}),
        }}
        onMouseEnter={() => handleMouseEnter(4)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleItemClick(4)}  // Removed preventDefault()
      >
        Manuales
      </a>
      <a
        href="#tilab-assistant"
        style={{
          ...styles.navItem,
          ...(hovered === 5 ? styles.navItemHover : {}),
          ...(selected === 5 ? styles.navItemSelected : {}),
        }}
        onMouseEnter={() => handleMouseEnter(5)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleItemClick(5)}  // Removed preventDefault()
      >
        <FaRobot />
        TILab Assistant
      </a>
    </div>
  );
};

export default Sidebar;
