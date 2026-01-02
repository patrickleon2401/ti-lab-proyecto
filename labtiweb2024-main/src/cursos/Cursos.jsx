import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import TopBar from "../topbar/TopBar";
import CursoCard from "./CursoCard"; // Asegúrate de importar el nuevo componente CursoCard
import { local, pcdeApoyo } from '../config';
const Cursos = () => {
  const [cursos, setCursos] = useState([]); // Estado para almacenar los cursos
  const [loading, setLoading] = useState(true); // Estado para el cargando (loading)

  // Usamos useEffect para realizar la solicitud HTTP al backend cuando el componente se monta
  useEffect(() => {
    fetch(`http://${pcdeApoyo}/back/obtener_cursos`) // Asegúrate de que esta URL coincida con tu endpoint en Django'http://127.0.0.1:8000/back/obtener_cursos
      .then((response) => response.json())
      .then((data) => {
        setCursos(data); // Establecemos los cursos obtenidos en el estado
        setLoading(false); // Desactivamos el loading cuando los datos sean cargados
      })
      .catch((error) => {
        console.error("Error al obtener los cursos:", error);
        setLoading(false); // Si ocurre un error, dejamos de mostrar el estado de carga
      });
  }, []); // El efecto se ejecuta una sola vez cuando el componente se monta

  // Mientras se cargan los cursos, mostramos un mensaje de "cargando"
  if (loading) {
    return <div>Cargando cursos...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopBar />
  
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar />
  
        <div style={{ marginTop: '64px', padding: '20px', flexGrow: 1, overflowY: 'auto' }}>
          <h2>Cursos</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)', // Tres elementos por fila
              gap: '20px', // Espacio entre las tarjetas
              marginTop: '10px',
              // Si las tarjetas tienen un tamaño mínimo, puedes poner un límite a la fila
            }}
          >
            {cursos.map((curso) => (
              <CursoCard key={curso.id} id={curso.id} curso={curso} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cursos;
