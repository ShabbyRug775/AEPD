import {MapContainer, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import Markers from './Markers'

  const mapView = () => {
    return <MapContainer center={{lat: '19.372632218014548', lng: '-99.24124002297789'}} zoom={13}>
      <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
      <Markers/>
    </MapContainer>
  }

export default mapView