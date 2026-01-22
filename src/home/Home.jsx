import React, { useEffect, useState } from "react";
import LayoutWithSidebar from "../components/LayoutWithSidebar";
import "./Home.css";  // Importamos el archivo CSS
import Aula from "./Aula";
import { apiService } from '../services/api.service';

const Home = () => {
  const [laboratorios, setLaboratorios] = useState([]);  // Estado para almacenar los laboratorios

  // Hacer la solicitud al backend para obtener los laboratorios
  useEffect(() => {
    const fetchLaboratorios = async () => {
      try {
        const response = await apiService.getLaboratorios();  // Usa el servicio API
        if (!response.ok) {
          throw new Error("No se pudieron cargar los laboratorios");
        }
        const data = await response.json();
        console.log(data)
        setLaboratorios(data);  // Almacena los datos obtenidos en el estado
      } catch (error) {
        console.error("Error al cargar los laboratorios:", error);
      }
    };

    fetchLaboratorios();
  }, []);  // El arreglo vacío [] asegura que solo se ejecute una vez cuando el componente se monte

  return (
    <LayoutWithSidebar>
      <h2>Conoce los Laboratorios</h2>
      <p>Los laboratorios de LABS TI son espacios interactivos para aprender y practicar habilidades 
        en tecnología e informática mediante actividades guiadas y simulaciones.</p>
        
      <div className="card-list">
        {/* Mapear los laboratorios y pasarlos como props a Aula */}
        {laboratorios.map((laboratorio) => (
          <Aula 
            key={laboratorio.id}
            id={laboratorio.id}
            title={laboratorio.nombre} 
            
            imagen={laboratorio.foto1}  // Puedes elegir cuál foto mostrar
          />
        ))}
      </div>
    </LayoutWithSidebar>
  );
};

export default Home;
