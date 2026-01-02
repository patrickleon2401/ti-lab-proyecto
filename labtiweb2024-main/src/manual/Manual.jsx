import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import TopBar from "../topbar/TopBar";
import { local, pcdeApoyo } from '../config';
import './Manual.css'; // Asegúrate de crear este archivo CSS
import { useNavigate } from "react-router-dom"; // Para redirigir cuando el usuario haga clic

const ComponenteCard = ({ componente, onClick }) => {
  const cardStyle = {
    backgroundColor: '#f4f4f4',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    boxSizing: 'border-box',
    height: 'auto',
  };
  
  const imagePlaceholderStyle = {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    borderRadius: '8px',
    position: 'relative',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return (
    <div style={cardStyle} onClick={() => onClick(componente)}>
      <div style={imagePlaceholderStyle}>
        <img src={componente.foto1} alt={componente.nombre} style={imageStyle} />
      </div>
      <h3>{componente.nombre}</h3>
    </div>
  );
};

const Manual = () => {
  const [componentes, setComponentes] = useState([]);
  const [selectedComponente, setSelectedComponente] = useState(null); // Almacena el componente seleccionado
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Traer todos los componentes cuando el componente se monta
  useEffect(() => {
    fetch(`http://${pcdeApoyo}/back/obtener_componentes`) // Cambiar con la URL adecuada
      .then((response) => response.json())
      .then((data) => {
        setComponentes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los componentes:", error);
        setLoading(false);
      });
  }, []);

  // Cuando el usuario hace clic en un componente, se muestra la vista de detalles
  const handleComponenteClick = (componente) => {
    setSelectedComponente(componente);
    navigate(`/componentes/${componente.id}`); // Redirige a la página de detalles del componente
  };

  // Si estamos cargando, mostramos un mensaje de carga
  if (loading) {
    return <div>Cargando componentes...</div>;
  }

  // Si hay un componente seleccionado, mostramos la vista de detalles
 

  // Si no hay componente seleccionado, mostramos todos los componentes
  return (
    <div className="manual-container">
      <TopBar className="topbar" />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar className="sidebar" />
        <div className="content">
          <h2>Componentes de LABS TI</h2>
          <p>Consulta los componentes y sus manuales correspondientes.</p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              marginTop: '20px',
            }}
          >
            {componentes.map((componente) => (
              <ComponenteCard
                key={componente.id}
                componente={componente}
                onClick={handleComponenteClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manual;
