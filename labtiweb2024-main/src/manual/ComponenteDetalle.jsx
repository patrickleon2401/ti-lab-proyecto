import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';  // Importa Slider desde react-slick
import { pcdeApoyo } from '../config';
import Sidebar from "../sidebar/sidebar";
import TopBar from "../topbar/TopBar";

const ComponenteDetalle = () => {
  const { id } = useParams();
  const [componente, setComponente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://${pcdeApoyo}/back/obtener_componente1/${id}`)
      .then(response => response.json())
      .then(data => {
        setComponente(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener el componente:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!componente) {
    return <div>No se pudo encontrar el componente.</div>;
  }

  // Configuración básica de react-slick con autoplay
  const settings = {
    dots: true,  // Muestra puntos para navegar entre las imágenes
    infinite: true,  // Permite el desplazamiento infinito
    speed: 500,  // Velocidad de transición
    slidesToShow: 1,  // Mostrar una imagen a la vez
    slidesToScroll: 1,  // Avanzar una imagen por cada clic
    autoplay: true,  // Habilita el deslizamiento automático
    autoplaySpeed: 3000,  // Intervalo de 3 segundos entre cada deslizamiento
  };

  return (
    <div className="manual-container">
      <TopBar className="topbar" />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar className="sidebar" />
        <div className="content">
          <h2>{componente.nombre}</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <p>{componente.descripcion || "Descripción no disponible"}</p>
          </div>

          {/* Carrusel de las fotos 2 y 3 */}
          <div style={{ marginBottom: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <Slider {...settings}>
              {componente.foto2 && (
                <div>
                  <img
                    src={componente.foto2}
                    alt="Foto 2"
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                </div>
              )}
              {componente.foto3 && (
                <div>
                  <img
                    src={componente.foto3}
                    alt="Foto 3"
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                </div>
              )}
            </Slider>
          </div>

          <h3>Manual(es) de {componente.nombre}</h3>
          <div className="manual-list">
            {componente.manuals && componente.manuals.length > 0 ? (
              componente.manuals.map((manual) => (
                <div key={manual.id} className="manual-item">
                  <span>{manual.nombre}</span>
                  <a href={`http://${pcdeApoyo}/back/descargar_pdf/${manual.url}`} className="download-button" download>
                    ⬇ Descargar
                  </a>
                </div>
              ))
            ) : (
              <div>No hay manuales disponibles para este componente.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponenteDetalle;
