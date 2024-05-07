// Function to generate random flight data
function generateRandomFlightData(numFlights) {
    const flights = [];
    // const airports = ['JFK', 'LAX', 'ORD', 'ATL', 'DFW', 'DEN', 'SFO', 'SEA', 'LAS', 'MIA'];
    const airports = [
        { code: 'JFK', name: 'John F. Kennedy International Airport', latitude: 40.6413, longitude: -73.7781 },
        { code: 'LAX', name: 'Los Angeles International Airport', latitude: 33.9416, longitude: -118.4085 },
        { code: 'ORD', name: 'O\'Hare International Airport', latitude: 41.9742, longitude: -87.9073 },
        { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', latitude: 33.6407, longitude: -84.4277 },
        { code: 'DFW', name: 'Dallas/Fort Worth International Airport', latitude: 32.8998, longitude: -97.0403 },
        { code: 'DEN', name: 'Denver International Airport', latitude: 39.8561, longitude: -104.6737 },
        { code: 'SFO', name: 'San Francisco International Airport', latitude: 37.6215, longitude: -122.3756 },
        { code: 'SEA', name: 'Seattle-Tacoma International Airport', latitude: 47.4502, longitude: -122.3088 },
        { code: 'LAS', name: 'McCarran International Airport', latitude: 36.0840, longitude: -115.1537 },
        { code: 'MIA', name: 'Miami International Airport', latitude: 25.7933, longitude: -80.2906 }
    ];
    
    const airlines = ['American Airlines', 'Delta Air Lines', 'United Airlines', 'Southwest Airlines', 'Alaska Airlines'];
  
    for (let i = 1; i <= numFlights; i++) {
      const flight = {
        id: i,
        flightNumber: `FL${i}`,
        airline: airlines[Math.floor(Math.random() * airlines.length)],
        origin: airports[Math.floor(Math.random() * airports.length)].code,
        destination: airports[Math.floor(Math.random() * airports.length)].code,
        departureTime: generateRandomTime(),
        arrivalTime: generateRandomTime(),
      };
      flights.push(flight);
    }
  
    return flights;
  }
  
  // Function to generate random time (HH:MM format)
  function generateRandomTime() {
    const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    return `${hour}:${minute}`;
  }
  
  // Example: Generate 10 random flights
  const numFlights = 10;
  const randomFlights = generateRandomFlightData(numFlights);
  console.log(randomFlights);
  