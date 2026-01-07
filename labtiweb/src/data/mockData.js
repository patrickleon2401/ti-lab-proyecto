export const laboratoriosMock = [
  {
    id: 1,
    nombre: "Laboratorio de Redes",
    descripcion: "Equipamiento especializado en redes de computadoras con routers, switches, Access Points y herramientas de diagnóstico. Ideal para prácticas de configuración de redes locales, VLANs, routing protocols y administración de infraestructura de red.",
    foto1: "/Images/redes1.jpg",
    foto2: "/Images/redes2.jpg", 
    foto3: "/Images/redes3.jpg"
  },
  {
    id: 2,
    nombre: "Laboratorio de Software",
    descripcion: "Computadoras de alto rendimiento con software de desarrollo integrado. Entorno completo para programación en múltiples lenguajes, bases de datos y herramientas de testing. Perfecto para desarrollo de aplicaciones web y desktop.",
    foto1: "/Images/software1.jpg",
    foto2: "/Images/software2.jpg", 
    foto3: "/Images/software3.jpg"
  },
  {
    id: 3,
    nombre: "Laboratorio de Hardware",
    descripcion: "Estaciones de trabajo completas con equipos de diagnóstico, multímetros, osciloscopios y herramientas de reparación. Espacio ideal para ensamblaje, mantenimiento y reparación de computadoras y periféricos.",
    foto1: "/Images/hardware1.jpg",
    foto2: "/Images/hardware2.jpg", 
    foto3: "/Images/hardware3.jpg"
  }
];

export const cursosMock = [
  { id: 1, nombre: "Redes de Computadoras" },
  { id: 2, nombre: "Sistemas Operativos" },
  { id: 3, nombre: "Programación Web" },
  { id: 4, nombre: "Bases de Datos" },
  { id: 5, nombre: "Hardware y Mantenimiento" }
];

export const materialesMock = [
  {
    id: 1,
    nombre: "Guía de Prácticas Redes",
    curso: 1,
    archivo: "guia_redes.pdf"
  },
  {
    id: 2,
    nombre: "Manual de Configuración Switch",
    curso: 1,
    archivo: "manual_switch.pdf"
  },
  {
    id: 3,
    nombre: "Guía de Instalación Linux",
    curso: 2,
    archivo: "guia_linux.pdf"
  },
  {
    id: 4,
    nombre: "Manual de Comandos Unix",
    curso: 2,
    archivo: "comandos_unix.pdf"
  },
  {
    id: 5,
    nombre: "Tutorial HTML5 y CSS3",
    curso: 3,
    archivo: "tutorial_web.pdf"
  },
  {
    id: 6,
    nombre: "Guía JavaScript Avanzado",
    curso: 3,
    archivo: "javascript_avanzado.pdf"
  },
  {
    id: 7,
    nombre: "Manual de MySQL",
    curso: 4,
    archivo: "manual_mysql.pdf"
  },
  {
    id: 8,
    nombre: "Guía de Diseño de BD",
    curso: 4,
    archivo: "diseno_bd.pdf"
  }
];

export const componentesMock = [
  {
    id: 1,
    nombre: "Cisco Router 2811",
    descripcion: "Router de alta performance para entornos empresariales con soporte para protocolos de enrutamiento avanzados como OSPF, EIGRP, BGP y configuración de VPN.",
    fotos: ["/Images/router1.jpg", "/Images/router2.jpg"],
    manuales: [
      { id: 1, titulo: "Guía de Configuración Básica", archivo: "router_config_basica.pdf" },
      { id: 2, titulo: "Manual de Protocolos", archivo: "router_protocolos.pdf" }
    ]
  },
  {
    id: 2,
    nombre: "Catalyst Switch 2960",
    descripcion: "Switch de capa 2 con 24 puertos Gigabit, soporte para VLANs, Spanning Tree Protocol y configuración de Quality of Service para gestión de tráfico.",
    fotos: ["/Images/switch1.jpg", "/Images/switch2.jpg"],
    manuales: [
      { id: 3, titulo: "Manual de VLANs", archivo: "switch_vlans.pdf" },
      { id: 4, titulo: "Guía de Seguridad", archivo: "switch_seguridad.pdf" }
    ]
  },
  {
    id: 3,
    nombre: "Access Point Ubiquiti",
    descripcion: "Punto de acceso inalámbrico con tecnología WiFi 6, soporte para múltiples SSIDs, gestión centralizada y configuración de redes mesh.",
    fotos: ["/Images/ap1.jpg", "/Images/ap2.jpg"],
    manuales: [
      { id: 5, titulo: "Guía de Instalación", archivo: "ap_instalacion.pdf" },
      { id: 6, titulo: "Manual de Configuración WiFi", archivo: "ap_wifi_config.pdf" }
    ]
  }
];

export const disponibilidadMock = [
  { dia: 'Lunes', horarios: Array(16).fill('disponible') },
  { dia: 'Martes', horarios: Array(16).fill('disponible') },
  { dia: 'Miércoles', horarios: Array(16).fill('disponible') },
  { dia: 'Jueves', horarios: Array(16).fill('disponible') },
  { dia: 'Viernes', horarios: Array(16).fill('disponible') },
  { dia: 'Sábado', horarios: Array(16).fill('disponible') }
];