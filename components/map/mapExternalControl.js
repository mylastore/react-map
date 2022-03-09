import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState, useMemo } from 'react'
import LocationControl from '../common/LocationControl'
import ExternalControl from '../common/ExternalControl'
import styles from '../../styles/map.module.css'

const Map = () => {
  const [map, setMap] = useState(null)
  const location = process.env.usa

  const mapView = useMemo(
    () => (
      <MapContainer
        center={location}
        zoom={4}
        scrollWheelZoom={true}
        style={{ height: 400, width: '100%' }}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url={process.env.osm}
        />
        <LocationControl position={process.env.position.topRight} />
      </MapContainer>
    ), [],
  )

  return (
    <div>
      <div className={styles.external}>
        {map ? <ExternalControl map={map} /> : null}
      </div>
      <div className={styles.map}>
        {mapView}
      </div>
    </div>
  )
}

export default Map
