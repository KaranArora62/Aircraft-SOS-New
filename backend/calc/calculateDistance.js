function calculateDirectDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
  
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
  
    return distance; // Distance in kilometers
}
  
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}
const startLat = 30.706758; // Latitude of New York City
const startLon = 76.217218; // Longitude of New York City
const endLat = 28.613738; // Latitude of Los Angeles
const endLon = 77.209206; // Longitude of Los Angeles
const numberOfPoints = 10; // Number of intermediate points
const distance = calculateDirectDistance(startLat, startLon,endLat, endLon);
console.log(distance.toFixed(2) + " km");