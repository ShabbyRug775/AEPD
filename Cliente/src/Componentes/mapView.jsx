import React from "react"
import {MapContainer, TileLayer, Marker}from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import Markers from "./Markers"

  const mapView = () => {
    return <MapContainer center={{lat: '19.363451884694996', lng: '-99.24141581703375'}} zoom={15}>
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
      <Markers />
    </MapContainer>
  }

export default mapView