import {Marker} from 'react-leaflet'
import { IconLocation } from './iconLocation'

const Markers = () => {
  return (
    <Marker position={{lat: '19.372632218014548', lng:'-99.24124002297789'}} icon={IconLocation}/>
  )
}

export default Markers