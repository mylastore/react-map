import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet'
import {icon} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import React, {useState} from "react";

const MarkerIcon = icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
})

const Map = () => {
  const [target, setTarget] = useState()
  const location = process.env.pahrump
  const ZOOM_LEVEL = 11
  let map

  function LocationIconControl() {
    // get ref to current map
    map = useMap()
    return (
      <div className={process.env.position.topRight} onClick={showMyLocation}>
        <div className="leaflet-control leaflet-bar">
          <img
            style={{lineHeight: 1, display: 'block', cursor: 'pointer'}}
            src={'location-icon.png'}
            alt={'Get My Location'}
          />
        </div>
      </div>
    )
  }

  const showMyLocation = () => {
    let marker
    if(target){
      map.flyTo(
        target,
        ZOOM_LEVEL,
        {animate: true}
      )
    } else {
      map.locate({enableHighAccuracy: true, timeout: 3000})/* This will return map so you can do chaining */
        .on('locationfound', function (e) {
          setTarget(e.latlng)
          marker = L.marker(e.latlng, {icon: MarkerIcon}).bindPopup('Listings near your area')
          map.flyTo(
            e.latlng,
            ZOOM_LEVEL,
            {animate: true}
          )
          map.on('zoomend', function (e){
            map.addLayer(marker)
            marker.openPopup() //open marker popup programmatically
          })
        })
        .on('locationerror', function (e) {
          console.log(e);
          alert("Location access denied.");
        })
    }
  }

  return (
    <MapContainer center={location} zoom={12} scrollWheelZoom={true} style={{height: 400, width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url={process.env.osm}/>
      <LocationIconControl/>
    </MapContainer>
  )
}

export default Map
