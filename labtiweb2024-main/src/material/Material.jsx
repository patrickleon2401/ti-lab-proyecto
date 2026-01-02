import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import TopBar from "../topbar/TopBar";
import "./Material.css";
import { local, pcdeApoyo } from '../config';
const Material = () => {
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(true);

  // Usamos useEffect para realizar la solicitud HTTP al backend
  useEffect(() => {
    fetch(`http://${pcdeApoyo}/back/obtener_materiales`) // Cambia la URL si es necesario
      .then((response) => response.json())
      .then((data) => {
        setMateriales(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los materiales:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Cargando materiales...</div>;
  }

  // Agrupar materiales por curso
  const cursosConMateriales = materiales.reduce((acc, material) => {
    const cursoId = material["curso__id"];
    if (!acc[cursoId]) {
      acc[cursoId] = {
        cursoId,
        cursoNombre: material["curso__nombre"],
        materiales: [],
      };
    }
    acc[cursoId].materiales.push(material);
    return acc;
  }, {});

  // Convertir el objeto en un array de cursos
  const cursos = Object.values(cursosConMateriales);

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
          <h2>Materiales de LABS TI</h2>
          <p>Consulta y descarga los materiales de tus cursos.</p>

          {/* Mostrar los cursos con sus materiales */}
          {cursos.map((curso) => (
            <div key={curso.cursoId}>
              <h3>{curso.cursoNombre}</h3>
              <div className="material-list">
                {curso.materiales.map((material) => (
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
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Material;
