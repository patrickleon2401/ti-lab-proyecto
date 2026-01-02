import React from 'react';
import Sidebar from "../sidebar/sidebar";
import TopBar from "../topbar/TopBar";
import "./Disponibilidad.css";

const Disponibilidad = () => {
  const horario = [
    ["7 - 8", "", "", "", "", "", ""],
    ["8 - 9", "", "", "", "", "", ""],
    ["9 - 10", "I1-306", "", "", "I1-305", "", "I1-305"],
    ["10 - 11", "I1-306", "", "", "I1-305", "", "I1-305"],
    ["11 - 12", "", "", "", "I1-305", "", "I1-305"],
    ["12 - 13", "", "", "", "I1-305", "I1-305", ""],
    ["13 - 14", "", "", "", "I1-305", "I1-305", ""],
    ["14 - 15", "", "", "", "I1-305", "", ""],
    ["15 - 16", "", "", "", "I1-305", "", ""],
    ["16 - 17", "", "", "", "I1-305", "", ""],
    ["17 - 18", "I1-306", "", "I1-305", "", "", ""],
    ["18 - 19", "I1-306", "", "I1-305", "", "", ""],
    ["19 - 20", "I1-306", "", "I1-305", "", "", ""],
    ["20 - 21", "I1-306", "", "", "", "", ""],
    ["21 - 22", "I1-306", "", "", "", "", ""],
  ];

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* TopBar en la parte superior */}
        <TopBar />

        {/* Contenedor para el Sidebar y el contenido principal */}
        <div style={{ display: 'flex', flexGrow: 1 }}>
          {/* Sidebar */}
          <Sidebar />

          {/* Contenido principal que ocupa el espacio restante */}
          <div style={{ marginTop: '64px', padding: '20px', flexGrow: 1 }}>
            <div className="container">
              <h2 className="main-title">Carrera de Ingeniería de Sistemas</h2>
              <h3 className="subtitle">Área: Tecnologías de la Información</h3>
              <h4 className="section-title">Disponibilidad de uso de Laboratorios 2024-2</h4>
              <table className="horario-table">
                <thead>
                  <tr>
                    <th>Hora</th>
                    <th>Lunes</th>
                    <th>Martes</th>
                    <th>Miércoles</th>
                    <th>Jueves</th>
                    <th>Viernes</th>
                    <th>Sábado</th>
                  </tr>
                </thead>
                <tbody>
                    {horario.map((fila, index) => (
                      <tr key={index}>
                        {fila.map((celda, idx) => (
                          <td
                            key={idx}
                            className={idx === 0 ? "hora" : celda ? "disponible" : ""}
                          >
                            {celda}
                          </td>
                      ))}
                    </tr>
                  ))}
                  </tbody>
              </table>
              <div className="legend">
                <div className="disponible-box"></div>
                <span>Disponibilidad para alumnos</span>
              </div>
              <p className="note">Nota: Sujeto a modificaciones por recuperaciones, reprogramaciones, eventos, etc.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Disponibilidad;
