// Mapa.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usarDeportivo } from "../Contexto/deportivoContexto";
import { DeportivoCard_idv } from "../Componentes/deportivos/DeportivoCardIndividual";
import MapView from "../Componentes/deportivos/mapView";
import '../App.css';
import {DeportivoCardCancha} from "../Componentes/deportivos/DeportivoCardCancha"

export function Mapa() {
    const { consulDepor } = usarDeportivo();
    const params = useParams();
    const [Deportivo, setDeportivo] = useState(null); // Para almacenar el deportivo específico

    useEffect(() => {
        const loadPark = async () => {
            if (params.id) {
                const result = await consulDepor(params.id);
                setDeportivo(result); // Guardamos el deportivo en el estado
            }
        };
        loadPark();
    }, [params.id, consulDepor]);

    return (
        <body className="bg-lime-100 p-2 mt-20 flex flex-col items-center gap-4">
  {Deportivo ? (
    <>
      {/* Contenedor para las dos tarjetas en un diseño de 2 columnas */}
      <div className="w-full flex flex-col lg:flex-row gap-4">
        {/* Tarjeta del Deportivo (mitad de la pantalla) */}
        <div className="flex-1">
          <DeportivoCard_idv Deportivo={Deportivo} key={Deportivo._id} />
        </div>

        {/* Tarjeta de las Canchas (mitad de la pantalla) */}
        <div className="flex-1">
          <DeportivoCardCancha Deportivo={Deportivo} key={Deportivo._id} />
        </div>
      </div>

      {/* Mapa abajo ocupando todo el ancho */}
      <div className="w-full mt-4">
        <MapView 
          lat={Deportivo.ubicacionGeografica.latitud} 
          lng={Deportivo.ubicacionGeografica.longitud} 
          name={Deportivo.nombre}
          canchas={Deportivo.canchas} 
        />
      </div>
    </>
  ) : (
    <p>Cargando...</p>
  )}
</body>
    );
}