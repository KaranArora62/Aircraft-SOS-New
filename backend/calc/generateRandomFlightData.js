// Generate random flight data
function generateRandomFlightData() {
    const latitude = Math.random() * (90 - (-90)) + (-90);
    const longitude = Math.random() * (180 - (-180)) + (-180);
    const altitude = Math.random() * (50000 - 10000) + 10000; // Altitude range: 10,000 to 50,000 feet
  
    return { latitude, longitude, altitude };
  }

  export default generateRandomFlightData;