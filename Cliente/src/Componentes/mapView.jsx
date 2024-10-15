import React from "react"
import {MapContainer, TileLayer, Marker}from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import Markers from "./Markers"
import {places} from '../assets/DataPark.json'
import { useState } from "react"

  const mapView = () => {
    // Aqui definimos la posición del mapa.
    const [state, setstate] = useState({
      currentLocation: {lat: '19.3875764319702', lng: '-99.15541782556365'},
      zoom: 11
    })

    return (
    <MapContainer center={state.currentLocation} zoom={state.zoom}>
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
      <Markers places={places}/>
    </MapContainer>
    )
  }

export default mapView