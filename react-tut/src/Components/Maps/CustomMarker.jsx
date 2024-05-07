import L from "leaflet";
import iconMarker from '/Marker.png'
import planeMarker from '/plane.png'

export const customMarkerUserPos = new L.Icon({
  iconUrl: iconMarker,
  iconSize: [38, 38],
  iconAnchor: [5, 20],
  popupAnchor: [2, -40]
});

export const markerIcon = new L.Icon({
  iconUrl: planeMarker,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  
});
