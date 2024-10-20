// Mapa.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usarDeportivo } from "../Contexto/deportivoContexto";
import { DeportivoCard_idv } from "../Componentes/deportivos/DeportivoCardIndividual";
import MapView from "../Componentes/deportivos/mapView";
import '../App.css';

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
        <body className="bg-lime-100 p-10 mt-20 flex flex-col items-center gap-10 h-dvh">
                    {Deportivo ? (
                        <DeportivoCard_idv Deportivo={Deportivo} key={Deportivo._id} />
                    ) : (
                        <p>Cargando...</p>
                    )}

            {Deportivo ? (
                <MapView 
                            lat={Deportivo.ubicacionGeografica.latitud} 
                            lng={Deportivo.ubicacionGeografica.longitud} 
                            name={Deportivo.nombre} // Pasamos el nombre del deportivo
                />
             ) : (
                <p>Cargando mapa...</p>
            )}
        </body>
    );
}