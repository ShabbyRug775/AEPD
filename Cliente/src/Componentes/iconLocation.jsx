import L from 'leaflet';

// Importamos las imágenes con `import`
import icon from '../assets/icon.svg';

// Definimos el ícono de Leaflet
export const IconLocation = L.icon({
  iconUrl: icon, // URL del icono
  iconRetinaUrl: icon, // URL para pantallas Retina (alta resolución)
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35], // Tamaño del ícono
  className: "leaflet-venue-icon", // Clase CSS personalizada
});
