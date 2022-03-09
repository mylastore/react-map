import React, { useMemo} from "react"
import locationSvg from "./locationSvg"

const iconUrl = 'data:image/svg+xml;base64,' + btoa(locationSvg)

const renderIcon = () => (
  <img src={iconUrl} width="100%" height="100%" style={{cursor: 'pointer'}} alt="Location Icon"/>
)

function LocationControl ({ position}) {

    // Memoize the minimap so it's not affected by position changes
  const myLocationControl = useMemo(
    () => (
      <div style={{background: 'white', width: '30px', height: '30px', lineHeight: '30px'}}>
        {renderIcon()}
      </div>

    ),
    [],
  )
  const positionClass = (position && process.env.position[position]) || process.env.position.topRight
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">
        {myLocationControl}
      </div>
    </div>
  )
}

export default LocationControl