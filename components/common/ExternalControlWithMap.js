import React, { useEffect, useState, useCallback } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import AnimationIcon from '../common/animationIcon'
import LocationControl from '../common/LocationControl'

const ZOOM_LEVEL = 16

function ExternalControl() {
  const [map, setMap] = useState(null)
  const [position, setPosition] = useState(map.getCenter())
  const [target, setTarget] = useState(null)

  const location = process.env.usa
  let mark

  const showDenver = useCallback(() => {
    map.setView(process.env.denver, '8')
  }, [map])

  const showLasVegas = useCallback(() => {
    map.setView(process.env.lasvegas, '8')
  }, [map])

  const mapView = useMemo(
    () => (
      <MapContainer
        center={location}
        zoom={4}
        scrollWheelZoom={true}
        style={{height: 400, width: '100%'}}
        whenCreated={setMap}
      >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OSM</a> contributors'
        url={process.env.osm}
      />
      <LocationControl position={process.env.position.topRight} />
      </MapContainer>
    ), []
  )

  function handlePermission() {
    navigator.permissions.query({ name: 'geolocation' }).then(function(result) {
      if (result.state === 'granted') {
        report(result.state)
        //geoBtn.style.display = 'none'
      } else if (result.state === 'prompt') {
        report(result.state)
        //geoBtn.style.display = 'none';
        //navigator.geolocation.getCurrentPosition(revealPosition,positionDenied,geoSettings);
      } else if (result.state === 'denied') {
        report(result.state)
        //geoBtn.style.display = 'inline'
      }
      result.onchange = function() {
        report(result.state)
      }
    })
  }

  function report(state) {
    console.log('Permission ' + state)
  }

  const showMyLocation = () => {
    if (target) {
      map.flyTo(
        target,
        ZOOM_LEVEL,
        { animate: true },
      )
    } else {
      map.locate({ enableHighAccuracy: false, timeout: 7000 })/* This will return map so you can do chaining */
        .on('locationfound', function(e) {
          handlePermission()
          setTarget(e.latlng)
          mark = L.marker(e.latlng, { icon: AnimationIcon })
          map.flyTo(
            e.latlng,
            ZOOM_LEVEL,
            { animate: true },
          )
          map.on('zoomend', function(e) {
            map.addLayer(mark)
          })
        })
        .on('locationerror', function(e) {
          console.log('location error ', e)
          alert('Location access denied.')
        })
    }
  }

  const resetMap = useCallback(() => {
    if (navigator.permissions.revoke) {
      navigator.permissions.revoke({ name: 'geolocation' }).then(function(result) {
        report(result.state)
      })
    }
    map.setView(process.env.usa, '4')
  }, [map])

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <div className={'card mt-3 mb-5'}>
      <div className={'card-body'}>
        <div className={'btn-group'} role='group'>
          <button type='button' className={'btn btn-outline-danger'} onClick={resetMap}>reset</button>
          <button type='button' className={'btn btn-outline-primary'} onClick={showDenver}>Denver</button>
          <button type='button' className={'btn btn-outline-primary'} onClick={showLasVegas}>Las Vegas
          </button>
          <button type='button' className={'btn btn-outline-primary'} onClick={showMyLocation}>Find My
            Location
          </button>
        </div>
        <!-- insert map here -->
        
      </div>
      <div className={'card-footer text-center'}>
        Latitude: {position.lat.toFixed(4)}, Longitude: {position.lng.toFixed(4)}{' '}
      </div>
    </div>
  )
}

export default ExternalControl