import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import TopBar from "../topbar/TopBar";
import "./Home.css";  // Importamos el archivo CSS
import Aula from "./Aula";
import { local, pcdeApoyo } from '../config';

const Home = () => {
  const [laboratorios, setLaboratorios] = useState([]);  // Estado para almacenar los laboratorios

  // Hacer la solicitud al backend para obtener los laboratorios
  useEffect(() => {
    const fetchLaboratorios = async () => {
      try {
        const response = await fetch(`http://${pcdeApoyo}/back/obtener_laboratorios`);  // Asegúrate de que la URL sea la correcta
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* TopBar en la parte superior */}
      <TopBar className="topbar" />
      
      {/* Contenedor para el Sidebar y el contenido principal */}
      <div style={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar */}
        <Sidebar className="sidebar" />

        {/* Contenido principal que ocupa el espacio restante */}
        <div className="content">
          <h2>Conoce los Laboratorios</h2>
          <p>Los laboratorios de LABS TI son espacios interactivos para aprender y practicar habilidades 
            en tecnología e informática mediante actividades guiadas y simulaciones.</p>
            
              
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
      </div>
    </div>
  );
};

export default Home;
