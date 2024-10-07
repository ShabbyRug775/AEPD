import { Link } from "react-router-dom";
import MapView from "../Componentes/MapView";
import '../App.css'
function Mapa() {
    return (
    <body className="bg-lime-50 p-10 mt-20">
        <section class="section"><MapView /></section>
    </body>
    );
}

export default Mapa