import logo from './logo.svg';
import './App.css';
import { RouterProvider } from "react-router-dom"
import Rutas from "./router/Rutas"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const App= ()=> {
  return (
    <RouterProvider router={ Rutas() } />
    
  );
}

export default App;
