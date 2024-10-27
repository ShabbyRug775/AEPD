// MapView.jsx
import React from "react";
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from "./Markers";

const MapView = ({ lat, lng, name, canchaCoordinates }) => {
    const center = { lat, lng };
    const zoom = 17;

    // Usar las coordenadas de la cancha si están disponibles
    const canchaPolygon = canchaCoordinates 
        ? [
            [canchaCoordinates.latitud + 0.0001, canchaCoordinates.longitud - 0.0001],
            [canchaCoordinates.latitud + 0.0001, canchaCoordinates.longitud + 0.0001],
            [canchaCoordinates.latitud - 0.0001, canchaCoordinates.longitud + 0.0001],
            [canchaCoordinates.latitud - 0.0001, canchaCoordinates.longitud - 0.0001]
        ]
        : null;

    return (
        <div className="w-full h-dvh">
            <MapContainer center={center} zoom={zoom}>
                <TileLayer 
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
                />
                <Markers lat={lat} lng={lng} name={name} />
                
                {/* Dibujar el polígono de la cancha */}
                {canchaPolygon && <Polygon positions={canchaPolygon} color="blue" />}
            </MapContainer>
        </div>
    );
};

export default MapView;