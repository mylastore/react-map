import {useState} from "react"
import L from "leaflet"
import AnimationIcon from "./animationIcon"

function FindMe({e, map}) {
  const [target, setTarget] = useState(null)
  const ZOOM_LEVEL = 16
  let mark

  if (target) {
    return map.flyTo(
      target,
      ZOOM_LEVEL,
      {animate: true}
    )
  } else {
    return map.locate({enableHighAccuracy: false, timeout: 7000})/* This will return map so you can do chaining */
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
        console.log('location error ', e)
        alert("Location access denied.")
      })
  }


}

export default FindMe