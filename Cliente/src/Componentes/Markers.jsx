import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const Markers = (props) => {
  const { places } = props;
  
  const markers = places.map((place, i) => (
    <Marker key={i} position={place.geometry}>
      <Popup>
        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
          {place.name}
        </span>
        <br />
        <span style={{ fontSize: '12px' }}>
          Coordenadas: {place.geometry[0].toFixed(6)}, {place.geometry[1].toFixed(6)}
        </span>
      </Popup>
    </Marker>
  ));

  return markers;
};

export default Markers;