import React, { useEffect, useState } from "react";
import LayoutWithSidebar from "../components/LayoutWithSidebar";
import Aula from "./Aula";
import { apiService } from '../services/api.service';

const Home = () => {
  const [laboratorios, setLaboratorios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaboratorios = async () => {
      try {
        const response = await apiService.getLaboratorios();
        if (!response.ok) {
          throw new Error("No se pudieron cargar los laboratorios");
        }
        const data = await response.json();
        console.log(data)
        setLaboratorios(data);
      } catch (error) {
        console.error("Error al cargar los laboratorios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaboratorios();
  }, []);

  if (loading) {
    return (
      <LayoutWithSidebar>
        <div className="loading-message">
          Cargando laboratorios...
        </div>
      </LayoutWithSidebar>
    );
  }

  return (
    <LayoutWithSidebar>
      <h2 className="loading-message">Conoce los Laboratorios</h2>
      <p className="loading-message">
        Los laboratorios de LABS TI son espacios interactivos para aprender y practicar habilidades 
        en tecnología e informática mediante actividades guiadas y simulaciones.
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        {laboratorios.map((laboratorio) => (
          <Aula 
            key={laboratorio.id}
            id={laboratorio.id}
            title={laboratorio.nombre} 
            imagen={laboratorio.foto1}
          />
        ))}
      </div>
    </LayoutWithSidebar>
  );
};

export default Home;