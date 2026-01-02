import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Para obtener el id del curso desde la URL
import Sidebar from "../sidebar/sidebar";
import TopBar from "../topbar/TopBar";
import "../material/Material.css"; // Asegúrate de que los estilos sean consistentes
import { local, pcdeApoyo } from '../config';

const DetalleCurso = () => {
  const { id } = useParams(); // Obtener el id del curso desde la URL
  const [materiales, setMateriales] = useState([]); // Estado para los materiales
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Usamos useEffect para realizar la solicitud HTTP al backend cuando el componente se monta
  useEffect(() => {
    console.log(id);
    // Hacer una solicitud para obtener los materiales del curso con el id específico
    fetch(`http://${pcdeApoyo}/back/obtener_materiales_por_curso/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Asegúrate de que el tipo de contenido sea 'application/json'
      },
      body: JSON.stringify({ curso_id: id })  // Envía el 'curso_id' como JSON
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMateriales(data); // Establecer los materiales en el estado
        } else {
          setMateriales([]); // Si no es un array, establecer un array vacío
        }
        setLoading(false); // Cambiar el estado de carga
      })
      .catch((error) => {
        console.error("Error al obtener los materiales:", error);
        setLoading(false);
      });
  }, [id]); // El efecto depende del id, se ejecutará cada vez que cambie

  if (loading) {
    return <div>Cargando materiales...</div>;
  }

  return (
    <div className="material-container">
      {/* TopBar en la parte superior */}
      <TopBar className="topbar" />

      {/* Contenedor para el Sidebar y el contenido principal */}
      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <Sidebar className="sidebar" />

        {/* Contenido principal */}
        <div className="content">
          <h2>Materiales del Curso</h2>
          <p>Consulta y descarga los materiales para este curso.</p>

          {/* Mostrar los materiales solo para este curso */}
          <div className="material-list">
            {materiales.length === 0 ? (
              <p>No hay materiales disponibles para este curso.</p>
            ) : (
              materiales.map((material) => (
                <div key={material.id} className="material-item">
                  <span>{material.nombre}</span>
                  <a
                    href={`http://${pcdeApoyo}/back/descargar_pdf/${material.url}`}
                    className="download-button"
                    download
                  >
                    ⬇ Descargar
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleCurso;
