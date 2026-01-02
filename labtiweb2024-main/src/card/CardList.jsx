import React from 'react';
import Card from './Card';  // Importa el componente Card
import iot from '../Images/iot.jpg'; // Importa la imagen

const CardList = () => {
  // Datos de los cursos con título, descripción y URL de la imagen
  const courses = [
    {
      title: "Internet de las Cosas | I1 - 305",
      description: "Lab1: Virtualización y Computación en la Nube",
      imagen: iot, // Usa la imagen importada
    },
    {
      title: "Virtualización y Computación en la Nube | I1 - 306",
      description: "Lab2: Redes y Ciberseguridad",
      imagen: iot, // Reutiliza la misma imagen o cambia a otra si la tienes
    },
    {
      title: "Alto Desempeño | I2 - 105",
      description: "Lab3: Técnicas de optimización y rendimiento.",
      imagen: iot, // Reutiliza la misma imagen o cambia a otra si la tienes
    },
    {
      title: "Redes y Ciberseguridad | I1 - 205",
      description: "Lab4: Seguridad en redes y protección de datos.",
      imagen: iot, // Reutiliza la misma imagen o cambia a otra si la tienes
    },
  ];

  return (
    <div className="cursos-container">
      <h2 className="cursos-title">Contamos con los siguientes laboratorios ...</h2>
      <div className="cursos-list">
        {courses.map((course, index) => (
          <Card 
            key={index} 
            title={course.title} 
            description={course.description} 
            imagen={course.imagen} // Pasa la imagen como prop
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
