import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // Para acceder a los parámetros de la URL
import { pcdeApoyo } from '../config';
import Sidebar from "../sidebar/sidebar";
import TopBar from "../topbar/TopBar";
import Slider from 'react-slick';  // Importa Slider desde react-slick
import './DetalleLaboratorio.css';

const DetalleLaboratorio = () => {
  const { id } = useParams();  // Obtiene el id de la URL
  const [laboratorio, setLaboratorio] = useState(null);

  useEffect(() => {
    const fetchLaboratorio = async () => {
      try {
        const response = await fetch(`http://${pcdeApoyo}/back/obtener_laboratorio1/${id}`);
        if (!response.ok) {
          throw new Error("No se pudo cargar el laboratorio");
        }
        const data = await response.json();
        setLaboratorio(data);  // Almacena los detalles del laboratorio
      } catch (error) {
        console.error("Error al cargar el laboratorio:", error);
      }
    };

    fetchLaboratorio();
  }, [id]);  // Ejecuta la solicitud cada vez que cambia el id

  if (!laboratorio) {
    return <div>Cargando...</div>; // Muestra un mensaje mientras se carga el laboratorio
  }

  // Configuración del carrusel de imágenes
  const settings = {
    dots: true,  // Muestra puntos de navegación debajo
    infinite: true,  // Permite el desplazamiento infinito
    speed: 500,  // Velocidad de transición
    slidesToShow: 1,  // Muestra una imagen a la vez
    slidesToScroll: 1,  // Avanza una imagen por cada clic
    autoplay: true,  // Habilita el deslizamiento automático
    autoplaySpeed: 3000,  // Intervalo de 3 segundos entre cada imagen
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopBar className="topbar" />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar className="sidebar" />
        <div className="detalle-laboratorio">
        <h1>{laboratorio.nombre}</h1>
    <div>
        {laboratorio.descripcion.split('\n').map((linea, index) => (
            <p key={index}>{linea}</p>
        ))}
    </div>
          {/* Carrusel de las imágenes */}
          <div className="imagenes-carrusel" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Slider {...settings}>
              {laboratorio.foto1 && (
                <div>
                  <img
                    src={laboratorio.foto1}
                    alt="Foto 1"
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                </div>
              )}
              {laboratorio.foto2 && (
                <div>
                  <img
                    src={laboratorio.foto2}
                    alt="Foto 2"
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                </div>
              )}
              {laboratorio.foto3 && (
                <div>
                  <img
                    src={laboratorio.foto3}
                    alt="Foto 3"
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                </div>
              )}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleLaboratorio;
