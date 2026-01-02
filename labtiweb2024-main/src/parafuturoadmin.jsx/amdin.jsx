import React, { useState } from "react";
import Sidebar from "../sidebar/sidebar";
import TopBar from "../topbar/TopBar";
//import "./Material.css"; // Archivo CSS para estilos específicos
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const Material = () => {
  const tableData = [
    { item: 1, descripcion: "Alicate de corte STANDER 6\" diagonal", cantidad: 14 },
    { item: 2, descripcion: "Arduino MEGA 2560", cantidad: 36 },
    { item: 3, descripcion: "Botón pulsador de 2 pines para protoboard", cantidad: 21 },
    { item: 4, descripcion: "Botón pulsador de 4 pines en colores variados para protoboard", cantidad: 68 },
    { item: 5, descripcion: "Cable USB-A macho a USB-A macho", cantidad: 32 },
    { item: 6, descripcion: "Cables dupont para arduino x 20 unidades (20 cms) (MM, HH, MH)", cantidad: "-" },
    { item: 7, descripcion: "Compuerta lógica 74HC00 NAND", cantidad: 26 },
    { item: 8, descripcion: "Compuerta lógica 74HC02 NOR", cantidad: 28 },
    { item: 9, descripcion: "Compuerta lógica 74HC04 NOT", cantidad: 70 },
    { item: 10, descripcion: "Compuerta lógica 74LS04 NOT", cantidad: 33 },
    { item: 11, descripcion: "Compuerta lógica 74LS08 AND", cantidad: 58 },
    { item: 12, descripcion: "Compuerta lógica 74HC08 AND", cantidad: 92 },
  ];

  // Estado para el archivo PDF cargado manualmente
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPdfFile(fileURL);
    }
  };

  return (
    <div className="material-container">
      {/* TopBar */}
      <TopBar className="topbar" />

      {/* Contenedor con Sidebar y contenido */}
      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <Sidebar className="sidebar" />

        {/* Contenido principal */}
        <div className="content">
          <h2>Materiales de LABS TI</h2>
          <p>Consulta y gestiona los materiales disponibles, además de cargar un archivo PDF relacionado.</p>

          {/* Tabla de Materiales */}
          <table className="material-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Descripción</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.item}</td>
                  <td>{row.descripcion}</td>
                  <td>{row.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Cargar archivo PDF */}
          <div className="upload-section">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="upload-input"
            />
          </div>

          {/* Vista Previa del PDF */}
          {pdfFile && (
            <div className="pdf-preview">
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js`}>
                <Viewer fileUrl={pdfFile} />
              </Worker>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Material;
