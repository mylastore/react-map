module.exports = {
  env: {
    APP: 'OS MAPS',
    osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    denver: [39.726746, -104.979934],
    pahrump: [36.2069, -115.9739],
    lasvegas: [36.1567, -115.1628],
    usa: [38.6855, -100.0195],
    position: {
      bottomLeft: 'leaflet-bottom leaflet-left',
      bottomRight: 'leaflet-bottom leaflet-right',
      topLeft: 'leaflet-top leaflet-left',
      topRight: 'leaflet-top leaflet-right'
    },
    currentLocation: `<div class="marker">
       <div class="pin"></div>
       <div class="pin-effect"></div>
    </div>`
  }
}