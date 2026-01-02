// Mock data for materials - simulates exact backend response
export const materialesMock = [
  // Materials for course 1 (Redes de Computadoras)
  {
    id: 1,
    nombre: "Guía de Laboratorio - Configuración Básica de Redes",
    url: "redes_config_basica.pdf",
    curso__id: 1,
    curso__nombre: "Redes de Computadoras"
  },
  {
    id: 2,
    nombre: "Manual de Protocolos TCP/IP",
    url: "redes_tcpip.pdf",
    curso__id: 1,
    curso__nombre: "Redes de Computadoras"
  },
  {
    id: 3,
    nombre: "Prácticas de Subnetting",
    url: "redes_subnetting.pdf",
    curso__id: 1,
    curso__nombre: "Redes de Computadoras"
  },
  
  // Materials for course 2 (Programación Web)
  {
    id: 4,
    nombre: "Tutorial HTML5 y CSS3",
    url: "web_html_css.pdf",
    curso__id: 2,
    curso__nombre: "Programación Web"
  },
  {
    id: 5,
    nombre: "Guía JavaScript Moderno",
    url: "web_javascript.pdf",
    curso__id: 2,
    curso__nombre: "Programación Web"
  },
  {
    id: 6,
    nombre: "Ejercicios Prácticos de React",
    url: "web_react.pdf",
    curso__id: 2,
    curso__nombre: "Programación Web"
  },
  
  // Materials for course 3 (Bases de Datos)
  {
    id: 7,
    nombre: "Diseño de Base de Datos Relacional",
    url: "bd_disenio.pdf",
    curso__id: 3,
    curso__nombre: "Bases de Datos"
  },
  {
    id: 8,
    nombre: "Manual SQL Server",
    url: "bd_sqlserver.pdf",
    curso__id: 3,
    curso__nombre: "Bases de Datos"
  },
  {
    id: 9,
    nombre: "Guía MongoDB",
    url: "bd_mongodb.pdf",
    curso__id: 3,
    curso__nombre: "Bases de Datos"
  },
  
  // Materials for course 4 (Sistemas Operativos)
  {
    id: 10,
    nombre: "Administración de Linux Server",
    url: "so_linux.pdf",
    curso__id: 4,
    curso__nombre: "Sistemas Operativos"
  },
  {
    id: 11,
    nombre: "Guía de Windows Server",
    url: "so_windows.pdf",
    curso__id: 4,
    curso__nombre: "Sistemas Operativos"
  },
  
  // Materials for course 5 (Seguridad Informática)
  {
    id: 12,
    nombre: "Fundamentos de Ciberseguridad",
    url: "seguridad_fundamentos.pdf",
    curso__id: 5,
    curso__nombre: "Seguridad Informática"
  },
  {
    id: 13,
    nombre: "Análisis de Vulnerabilidades",
    url: "seguridad_vulnerabilidades.pdf",
    curso__id: 5,
    curso__nombre: "Seguridad Informática"
  },
  
  // Materials for course 6 (Desarrollo Móvil)
  {
    id: 14,
    nombre: "Desarrollo Android con Kotlin",
    url: "mobile_android.pdf",
    curso__id: 6,
    curso__nombre: "Desarrollo Móvil"
  },
  {
    id: 15,
    nombre: "Guía de Desarrollo iOS con Swift",
    url: "mobile_ios.pdf",
    curso__id: 6,
    curso__nombre: "Desarrollo Móvil"
  }
];

// Mock function to get materials by course ID
export const getMaterialesByCursoIdMock = (cursoId) => {
  return materialesMock.filter(material => material.curso__id === parseInt(cursoId));
};