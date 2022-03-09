import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet'
import {icon} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React, {useState} from "react"
import useGeoLocation from "../../hooks/useGeoLocation"

const MarkerIcon = icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
})

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right'
}

const Map = () => {
  const location = useGeoLocation()
  const ZOOM_LEVEL = 16
  let currentMap

  function LocationIconControl() {
    // get ref to current map
    currentMap = useMap()
    return (
      <div className={POSITION_CLASSES.topright} onClick={showMyLocation}>
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
    if (location.loaded && !location.error) {
      currentMap.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        ZOOM_LEVEL,
        { animate: true }
      );
    } else {
      alert(location.error.message)
    }
    return true
  }

  return (
    <MapContainer center={[40.40931350359072, -107.41058349609375]} zoom={8} scrollWheelZoom={true} style={{height: 400, width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={process.env.awMap}
      />
      {location.loaded && !location.error && (
        <Marker
          icon={MarkerIcon}
          position={[
            location.coordinates.lat,
            location.coordinates.lng,
          ]}
        />
      )}
      <LocationIconControl />
    </MapContainer>
  )

}

export default Map
