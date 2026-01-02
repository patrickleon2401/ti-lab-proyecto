import React from 'react';
import './Card.css';  // Asegúrate de importar los estilos CSS



const Card = ({ title, description, imagen }) => {
  return (
    <>
    <div className="curso-card">
      <div className="curso-image-placeholder">
        <img  src={imagen} alt={title} className="curso-image" />
      </div>
      <h3 className="curso-nombre">{title}</h3>
      <p className="curso-nivel">{description}</p>
    </div>
    </>
  );
  
};

export default Card;