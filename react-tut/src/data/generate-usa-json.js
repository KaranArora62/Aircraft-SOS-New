import fs from 'fs';
import * as topojson from 'topojson-client';

const usaData = {
  type: 'FeatureCollection',
  features: []
};

const stateNames = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida',
  'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska',
  'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas',
  'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

stateNames.forEach((name, index) => {
  const randomArea = Math.random() * 100;
  const randomCoordinates = Array.from({ length: Math.floor(Math.random() * 10) + 3 }, () => [
    Math.random() * 60 - 120,
    Math.random() * 40 + 20
  ]);
  
  const feature = {
    type: 'Feature',
    properties: { name },
    geometry: {
      type: 'Polygon',
      coordinates: [randomCoordinates]
    }
  };
  
  usaData.features.push(feature);
});

const topojsonData = {
  type: 'Topology',
  objects: {
    states: {
      type: 'GeometryCollection',
      geometries: usaData.features.map((feature) => {
        return {
          type: 'Polygon',
          properties: feature.properties,
          coordinates: [feature.geometry.coordinates]
        };
      })
    }
  }
};

fs.writeFileSync('usa.json', JSON.stringify(topojsonData));
console.log('USA TopoJSON file generated.');
