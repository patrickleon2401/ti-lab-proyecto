// Mock data for laboratories - simulates exact backend response
export const laboratoriosMock = [
  {
    id: 1,
    nombre: "Laboratorio de Redes",
    descripcion: "Laboratorio especializado en el estudio y práctica de redes de computadoras, configuración de equipos de red y análisis de protocolos de comunicación.\nCuenta con equipos modernos para simulación de topologías de red.",
    foto1: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=Lab+Redes+1",
    foto2: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=Lab+Redes+2",
    foto3: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=Lab+Redes+3"
  },
  {
    id: 2,
    nombre: "Laboratorio de Software",
    descripcion: "Espacio dedicado al desarrollo de software, programación y testing de aplicaciones.\nEquipado con herramientas de desarrollo y software especializado.",
    foto1: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=Lab+Software+1",
    foto2: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=Lab+Software+2",
    foto3: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=Lab+Software+3"
  },
  {
    id: 3,
    nombre: "Laboratorio de Hardware",
    descripcion: "Laboratorio para el estudio y mantenimiento de equipos de cómputo, ensamblaje de PCs y diagnóstico de fallas de hardware.\nCuenta con herramientas y equipos de prueba.",
    foto1: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=Lab+Hardware+1",
    foto2: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=Lab+Hardware+2",
    foto3: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=Lab+Hardware+3"
  },
  {
    id: 4,
    nombre: "Laboratorio de IoT",
    descripcion: "Laboratorio especializado en Internet de las Cosas, desarrollo de dispositivos conectados y programación de sistemas embebidos.\nEquipado con sensores, microcontroladores y kits de desarrollo.",
    foto1: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=Lab+IoT+1",
    foto2: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=Lab+IoT+2",
    foto3: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=Lab+IoT+3"
  }
];

// Mock function to get laboratory by ID
export const getLaboratorioByIdMock = (id) => {
  return laboratoriosMock.find(lab => lab.id === parseInt(id)) || null;
};