import React, { useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';

const Markers = ({ lat, lng, name }) => {
  const markerRef = useRef(null);

  return (
    <Marker
      position={[lat, lng]}
      ref={markerRef}
      eventHandlers={{
        mouseover: () => {
          markerRef.current.openPopup();
        },
        mouseout: () => {
          markerRef.current.closePopup();
        },
      }}
    >
      <Popup>
        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
          {name}
        </span>
        <br />
        <span style={{ fontSize: '8px' }}>
          Coordenadas: {lat.toFixed(6)}, {lng.toFixed(6)}
        </span>
      </Popup>
    </Marker>
  );
};

export default Markers;
