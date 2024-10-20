// Markers.jsx
import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const Markers = ({ lat, lng, name }) => {
  return (
    <Marker position={[lat, lng]}>
      <Popup>
        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
          {name}
        </span>
        <br />
        <span style={{ fontSize: '12px' }}>
          Coordenadas: {lat.toFixed(6)}, {lng.toFixed(6)}
        </span>
      </Popup>
    </Marker>
  );
};

export default Markers;