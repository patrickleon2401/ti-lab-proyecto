import { createHashRouter } from "react-router-dom"
import Home from "../home/Home"
import Disponibilidad from "../disponibilidad/Disponibilidad"
import Cursos from "../cursos/Cursos"
import Manual from "../manual/Manual"

import ComponenteDetalle from "../manual/ComponenteDetalle";
import DetalleLaboratorio from "../home/DetalleLaboratorio";
import DetalleCurso from "../cursos/DetalleCurso";
import AdminInterface from "../AdminHome/AdminInterface"
import TILabAssistant from "../tilabAssistant/TILabAssistant"

const Rutas = () => {
    return createHashRouter([
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/disponibilidad",
            element: <Disponibilidad/>
        },
        {
            path: "/Cursos",
            element: <Cursos/>
        },
        {
            path: "/Manuales",
            element: <Manual/>
        },
        
        {
            path: "/componentes/:id",  // La ruta con un parámetro dinámico ':id'
            element: <ComponenteDetalle />  // Componente que se mostrará al hacer click
        },
        {
            path: "/detalle-laboratorio/:id",  // La ruta con un parámetro dinámico ':id'
            element: <DetalleLaboratorio />  // Componente que se mostrará al hacer click
        },
        {
            path: "/detalle-curso/:id",  // La ruta con un parámetro dinámico ':id'
            element: <DetalleCurso />  // Componente que se mostrará al hacer click
        },
        {
            path: "/AdminInterface",
            element: <AdminInterface />
        },
        {
            path: "/tilab-assistant",
            element: <TILabAssistant />
        }
      



        
    ])
}
export default Rutas