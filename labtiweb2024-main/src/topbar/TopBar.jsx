// components/TopBar.jsx
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import LoginPanel from './LoginPanel';

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header style={styles.topBar}>
        <div style={styles.menuIcon} onClick={toggleMenu}>
          <FaBars size={30} color="#fff" />
        </div>

        <h1 style={styles.title}>Plataforma LABS TI</h1>

        <a
          href="https://www.ulima.edu.pe/pregrado/ingenieria-de-sistemas/plan-de-estudios-de-sistemas"
          style={styles.universityLink}
        >
          <img
            src="https://presidentsmedals.com/images/mugshots/4303498.jpg"
            alt="Universidad de Lima"
            style={styles.universityImage}
          />
        </a>
      </header>

      <LoginPanel isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};

const styles = {
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 20px',
    gap: '6px',
    position: 'absolute',
    width: '100%',
    height: '64px',
    left: '0',
    top: '0',
    backgroundColor: '#FF9500',
    color: '#fff',
  },
  menuIcon: {
    cursor: 'pointer',
    marginRight: '16px',
  },
  title: {
    fontSize: '24px',
    margin: '50px',
    textAlign: 'center',
    flexGrow: 1,
    marginLeft: '410px',
  },
  universityLink: {
    margin: '30px',
    padding: '0',
    width: '120px',
  },
  universityImage: {
    width: '120px',
    height: 'auto',
  },
};

export default TopBar;
