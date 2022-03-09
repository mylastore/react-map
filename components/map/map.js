import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet'
import {icon} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React, {useState} from "react";

const svg = '<svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
  '<g opacity="0.16" filter="url(#filter0_f)">\n' +
  '<ellipse cx="20" cy="34" rx="5" ry="1" fill="#050708"/>\n' +
  '</g>\n' +
  '<g filter="url(#filter1_d)">\n' +
  '<path d="M28 22.3333C28 28.8148 20 34 20 34C20 34 12 28.8148 12 22.3333C12 20.1232 12.8429 18.0036 14.3431 16.4408C15.8434 14.878 17.8783 14 20 14C22.1217 14 24.1566 14.878 25.6569 16.4408C27.1571 18.0036 28 20.1232 28 22.3333Z" fill="white"/>\n' +
  '<path d="M28 22.3333C28 28.8148 20 34 20 34C20 34 12 28.8148 12 22.3333C12 20.1232 12.8429 18.0036 14.3431 16.4408C15.8434 14.878 17.8783 14 20 14C22.1217 14 24.1566 14.878 25.6569 16.4408C27.1571 18.0036 28 20.1232 28 22.3333Z" stroke="#F4F5F5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>\n' +
  '</g>\n' +
  '<circle cx="20" cy="22" r="3" fill="#050708"/>\n' +
  '<defs>\n' +
  '<filter id="filter0_f" x="10" y="28" width="20" height="12" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n' +
  '<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n' +
  '<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n' +
  '<feGaussianBlur stdDeviation="2.5" result="effect1_foregroundBlur"/>\n' +
  '</filter>\n' +
  '<filter id="filter1_d" x="3.2002" y="9.19922" width="33.6" height="37.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n' +
  '<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n' +
  '<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>\n' +
  '<feOffset dy="4"/>\n' +
  '<feGaussianBlur stdDeviation="4"/>\n' +
  '<feColorMatrix type="matrix" values="0 0 0 0 0.027451 0 0 0 0 0.04 0 0 0 0 0.0509804 0 0 0 0.12 0"/>\n' +
  '<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>\n' +
  '<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>\n' +
  '</filter>\n' +
  '</defs>\n' +
  '</svg>'; /* insert your own svg */
const iconUrl = 'data:image/svg+xml;base64,' + btoa(svg);

const MarkerIcon = icon({
  iconUrl: iconUrl,
  iconSize: [50, 64],
})

function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    dblclick() {
      map.locate()
    },
    locationfound(e) {
      console.log('useMapEvents location found ',e)
      setPosition(e.latlng)
      map.flyTo(e.latlng, 14)
    },
  })

  return position === null ? null : (
    <Marker  icon={MarkerIcon} position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

const Map = () => {
  return (
    <MapContainer center={[36.1176, -115.1281]} zoom={10} scrollWheelZoom={true} style={{height: 400, width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={process.env.awMap}
      />
      <LocationMarker/>
    </MapContainer>
  )
}

export default Map
