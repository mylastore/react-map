import {MapContainer, TileLayer, useMap} from 'react-leaflet'
import {icon} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import {useState} from "react"
import AnimationIcon from "../common/animationIcon"
import styles from "../../styles/map.module.css"

const Map = () => {
  const [map, setMap] = useState(null)
  const [target, setTarget] = useState()
  const location = process.env.pahrump
  const ZOOM_LEVEL = 14

  let mark

  function LocationIconControl() {
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
    if (target) {
      map.flyTo(
        target,
        ZOOM_LEVEL,
        {animate: true}
      )
    } else {
      map.locate({enableHighAccuracy: true, timeout: 7000})/* This will return map so you can do chaining */
        .on('locationfound', function (e) {
          setTarget(e.latlng)
          mark = L.marker(e.latlng, {icon: AnimationIcon})
          map.flyTo(
            e.latlng,
            ZOOM_LEVEL,
            {animate: true}
          )
          map.on('zoomend', function (e) {
            map.addLayer(mark)
          })
        })
        .on('locationerror', function (e) {
          console.log('location error ', e);
          alert("Location access denied.");
        })
    }
  }

  const mapView = () => {
    return <MapContainer
      center={location}
      zoom={12}
      scrollWheelZoom={true}
      whenCreated={setMap}
      style={{height: 400, width: "100%"}}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={process.env.osm}
      />
      <LocationIconControl />
    </MapContainer>
  }

  return (
    <div className={styles.map}>
      {mapView()}
    </div>
  )
}

export default Map
