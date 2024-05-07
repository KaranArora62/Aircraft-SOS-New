import React from 'react'
// import RunMarker from './RunMarker';

const CalculateTotalDistance = (props) => {
    const startLat = props.lat1; // Latitude of New York City
    const startLon = props.lon1; // Longitude of New York City
    const endLat = props.lat2; // Latitude of Los Angeles
    const endLon = props.lon1; // Longitude of Los Angeles


    const earthRadius = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(endLat - startLat);
    const dLon = toRadians(endLon - startLon);
  
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(startLat)) * Math.cos(toRadians(endLat)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    

    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    }

  return (
    <div>
      Total Distance - {distance.toFixed(2)+" Kilometers"}
    </div>
  )
}

export default CalculateTotalDistance
