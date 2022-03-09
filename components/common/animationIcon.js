import {divIcon} from "leaflet/dist/leaflet-src.esm";

const AnimationIcon = divIcon({
  className: 'map-bg-animation',
  html: process.env.currentLocation
})

export default AnimationIcon