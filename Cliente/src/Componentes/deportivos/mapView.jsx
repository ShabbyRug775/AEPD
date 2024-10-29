import React from "react";
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from "./Markers";

const MapView = ({ lat, lng, name, canchas }) => {
    const center = { lat, lng };
    const zoom = 17;

    // Lista de colores para alternar entre canchas
    const colors = ["blue", "green", "red", "purple", "orange"];

    return (
        <div className="w-full h-dvh">
            <MapContainer center={center} zoom={zoom}>
                <TileLayer 
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
                />
                <Markers lat={lat} lng={lng} name={name} />
                
                {/* Dibujar polígonos para cada cancha, variando el color */}
                {canchas && canchas.map((cancha, index) => {
                    const ubicacion = cancha.ubicacionGeografica;
                    
                    // Definir el polígono de la cancha
                    const canchaPolygon = [
                        [ubicacion.lat_1, ubicacion.lng_1],
                        [ubicacion.lat_2, ubicacion.lng_2],
                        [ubicacion.lat_3, ubicacion.lng_3],
                        [ubicacion.lat_4, ubicacion.lng_4]
                    ];

                    // Alternar el color en función del índice
                    const color = colors[index % colors.length];

                    return (
                        <Polygon 
                            key={index} 
                            positions={canchaPolygon} 
                            color={color} 
                        />
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default MapView;