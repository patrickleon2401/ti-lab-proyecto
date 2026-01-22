import React from 'react';
import Sidebar from '../sidebar/sidebar';
import TopBar from '../topbar/TopBar';

/**
 * Layout component with TopBar and Sidebar
 * Provides consistent layout structure throughout the application
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render in main area
 * @param {string} props.className - Additional CSS classes for content area
 */
const LayoutWithSidebar = ({ children, className = "content" }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
      <TopBar className="topbar" />
      <div style={{ display: 'flex', flexGrow: 1, height: '100vh', }}>
        <Sidebar className="sidebar" />
        <div className={className}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutWithSidebar;