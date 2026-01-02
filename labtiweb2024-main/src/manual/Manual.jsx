import React, { useState, useEffect } from "react";
import LayoutWithSidebar from "../components/LayoutWithSidebar";
import Loading from "../components/Loading";
import Card from "../components/Card";
import { apiService } from '../services/api.service';
import { IMAGE_PLACEHOLDER_STYLES, IMAGE_STYLES } from '../constants/ui.js';
import './Manual.css'; // Asegúrate de crear este archivo CSS
import { useNavigate } from "react-router-dom"; // Para redirigir cuando el usuario haga clic

const ComponenteCard = ({ componente, onClick }) => {
  return (
    <Card onClick={() => onClick(componente)}>
      <div style={IMAGE_PLACEHOLDER_STYLES}>
        <img src={componente.foto1} alt={componente.nombre} style={IMAGE_STYLES} />
      </div>
      <h3>{componente.nombre}</h3>
    </Card>
  );
};

const Manual = () => {
  const [componentes, setComponentes] = useState([]);
  const [selectedComponente, setSelectedComponente] = useState(null); // Almacena el componente seleccionado
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Traer todos los componentes cuando el componente se monta
  useEffect(() => {
    apiService.getComponentes() // Usa el servicio API
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
    return <Loading message="Cargando componentes..." />;
  }

  // Si hay un componente seleccionado, mostramos la vista de detalles
 

  // Si no hay componente seleccionado, mostramos todos los componentes
  return (
    <LayoutWithSidebar>
      <div className="content manual-container">
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
      
    </LayoutWithSidebar>
  );
};

export default Manual;
