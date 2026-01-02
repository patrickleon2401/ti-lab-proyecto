// Mock data for components - simulates exact backend response
import iotImg from "../Images/iot.jpg";
export const componentesMock = [
  {
    id: 1,
    nombre: "Router Cisco 2911",
    descripcion: "Router empresarial de alto rendimiento para redes de área amplia. Soporta múltiples protocolos de enrutamiento y características de seguridad avanzadas.",
    foto1: "https://www.google.com/url?sa=t&source=web&rct=j&url=https%3A%2F%2Fwww.redeszone.net%2Ftutoriales%2Fredes-cable%2Fdiferencias-interfaces-sub-interfaces-router%2F&ved=0CBUQjRxqFwoTCLDErv2c7ZEDFQAAAAAdAAAAABAH&opi=89978449",
    foto2: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=Router+Front",
    foto3: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=Router+Back",
    manuals: [
      {
        id: 1,
        nombre: "Guía de Configuración Básica",
        url: "router_cisco_basico.pdf"
      },
      {
        id: 2,
        nombre: "Manual de Seguridad",
        url: "router_cisco_seguridad.pdf"
      }
    ]
  },
  {
    id: 2,
    nombre: "Switch Catalyst 299",
    descripcion: "Switch gestionable de capa 1 con 24 puertos Gigabit Ethernet. Ideal para redes empresariales medianas.",
    foto1: iotImg,
    foto2: iotImg,
    foto3: iotImg,
    manuals: [
      {
        id: 3,
        nombre: "Guía de Instalación",
        url: "switch_catalyst_instalacion.pdf"
      },
      {
        id: 4,
        nombre: "Manual de VLANs",
        url: "switch_catalyst_vlans.pdf"
      }
    ]
  },
  {
    id: 3,
    nombre: "Access Point Aruba AP-225",
    descripcion: "Punto de acceso inalámbrico de doble banda con soporte para estándares 802.11ac. Ideal para redes WiFi empresariales.",
    foto1: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=AP+Aruba",
    foto2: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=AP+Top",
    foto3: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=AP+Side",
    manuals: [
      {
        id: 5,
        nombre: "Guía de Configuración WiFi",
        url: "ap_aruba_config.pdf"
      }
    ]
  },
  {
    id: 4,
    nombre: "Firewall FortiGate 60E",
    descripcion: "Firewall de próxima generación con protección integrada contra amenazas. Incluye VPN, filtrado web y antivirus.",
    foto1: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=FortiGate",
    foto2: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=FortiGate+Front",
    foto3: "https://via.placeholder.com/600x400/FF9500/FFFFFF?text=FortiGate+Back",
    manuals: [
      {
        id: 6,
        nombre: "Manual de Configuración",
        url: "fortigate_config.pdf"
      },
      {
        id: 7,
        nombre: "Guía de Políticas de Seguridad",
        url: "fortigate_politicas.pdf"
      }
    ]
  }
];

// Mock function to get component by ID
export const getComponenteByIdMock = (id) => {
  return componentesMock.find(comp => comp.id === parseInt(id)) || null;
};