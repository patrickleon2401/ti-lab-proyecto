import React from 'react';
import { useNavigate } from "react-router-dom";
const CursoCard = ({ id,curso }) => {
  const navigate = useNavigate();
  // Estilos en línea para la tarjeta
  const cardStyle = {
    backgroundColor: '#f4f4f4',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%', // Asegura que las tarjetas ocupen el 100% de su contenedor
    maxWidth: '500px', // Un límite de tamaño para las tarjetas
    margin: '0 auto', // Centramos las tarjetas
    boxSizing: 'border-box', // Asegura que el padding no aumente el tamaño total
    height: 'auto', // Ajuste automático para la altura
  };
  
  const imagePlaceholderStyle = {
    width: '100%',
    height: '200px', // Dejar la altura en px o en porcentaje relativo
    overflow: 'hidden',
    borderRadius: '8px',
    position: 'relative', // Para asegurar que las imágenes no desborden el contenedor
  };
  
  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Usamos cover para cubrir el espacio del contenedor sin deformar la imagen
  };
  
  const titleStyle = {
    fontSize: '1.2rem', // Usamos rem para que el tamaño sea relativo al contenedor
    fontWeight: 'bold',
    marginTop: '10px',
  };
  
  const levelStyle = {
    fontSize: '1rem',
    color: '#888',
  };
  
  const handleClick = () => {
    // Redirige a la página de detalles del laboratorio
   
    navigate(`/detalle-curso/${id}`);
  };

  return (
    <div style={cardStyle} onClick={handleClick} >
      <div style={imagePlaceholderStyle}>
        <img src={curso.foto1} alt={curso.nombre} style={imageStyle} /> {/* Foto del curso */}
      </div>
      <h3 style={titleStyle}>{curso.nombre}</h3>
      <p style={levelStyle}>{curso.nivel_curso}</p>
    </div>
  );
};

export default CursoCard;
