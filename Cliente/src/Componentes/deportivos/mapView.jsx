import React from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from "./Markers";

const MapView = ({ lat, lng, name }) => {
    const center = { lat, lng };
    const zoom = 17;

    return (
    <div className="w-full h-dvh">
    <MapContainer center={center} zoom={zoom}>
        <TileLayer 
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
        />
        <Markers lat={lat} lng={lng} name={name} />
    </MapContainer>
</div>
    );
};

export default MapView;
