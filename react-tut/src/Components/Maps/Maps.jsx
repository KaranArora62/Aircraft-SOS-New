import React, { useState, useRef,useEffect } from "react";
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Polyline,
  TileLayer
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { customMarkerUserPos } from "./CustomMarker";
import Logout from "../Logout";
import axios from 'axios'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CalculateTotalDistance from "./CalculateTotalDistance";
import RunMarker from "./RunMarker";
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'

const Maps = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['email', 'username']);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/verifyAPIForAIRLINES');
        console.log(res);
        if (res.data.msg === 'Success_to_Airlines_Portal') {
          setSuccess("Welcome to airlines");
        }
        else{
          navigate('/')
        }
        
      } catch (err) {
        console.log(err);
        // Handle error here, e.g., set a different state to indicate failure
      }
    };

    fetchData();
  }, []);

  const mapRef = useRef();
  const [center, setCenter] = useState({
    lat: 40.629036,
    lng: -101.411075
  });
  const [map, setMap] = useState(null);

  const pos = [
    [47.517214, -122.291706], // Start
    [32.909523, -97.083218], // End
  ];
  // console.log(`The lat and long ${pos[0][0]}`);
  const [speed, setSpeed] = useState(0); // Speed of the marker in m/s
  const [manipulatedSpeed, setManipulatedSpeed] = useState(0);
  const [altitudes, setAltitudes] = useState([]); // New state for altitudes
  const [markerRunning, setMarkerRunning] = useState(true);
  const [lastMarkerLocation, setLastMarkerLocation] = useState(null);
  const [audioo, setAudioo] = useState(false);
  const increaseSpeed = () => {
    setManipulatedSpeed(manipulatedSpeed+10000);
  };

  // Function to decrease speed
  const decreaseSpeed = () => {
    setManipulatedSpeed(manipulatedSpeed - 10000);
  };

  const stopMarker = () => {
    setMarkerRunning(false);
  };

  const handleStopButtonClick = () => {
    stopMarker();

    // Display alert with the last marker location
    alert(`Last marker location: ${lastMarkerLocation}`);
    if (lastMarkerLocation != null) {
      axios.post("http://localhost:5000/api/auth/savedataAPI", { lastMarkerLocation,altitudes })
        .then((response) => {
          console.log("Location stored successfully:", response.data);
          // Handle success if needed
        })
        .catch((error) => {
          console.error("Error storing location:", error);
          // Handle error if needed
        });
    }
  };

  const handleMarkerEnd = (lastLocation) => {
    setLastMarkerLocation(lastLocation);
  };

  return (
    
    <>
      <h3>Welcome User - {cookies.username} <br />Email - {cookies.email}</h3>
      <h3>Welcome to - {success}</h3>
      <MapContainer
        style={{ height: "480px", width: "100%" }}
        zoom={4}
        center={center}
        ref={mapRef}
        whenReady={setMap}
        scrollWheelZoom={true}
      >
        <FeatureGroup>
          {pos?.map((mark, i) => (
            <Marker key={i} position={mark} icon={customMarkerUserPos} />
          ))}

          <Polyline positions={pos} color="red" />
          <RunMarker audioo={audioo} setAudioo={setAudioo} altitudes={altitudes} setAltitudes={setAltitudes} manipulatedSpeed={manipulatedSpeed} speed={speed} setSpeed={setSpeed} lat1={pos[0][0]} lon1={pos[0][1]} lat2={pos[1][0]} lon2={pos[1][1]} markerRunning={markerRunning}
        onStop={stopMarker}
        onMarkerEnd={handleMarkerEnd}/>
        </FeatureGroup>

        <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
        <CalculateTotalDistance lat1={pos[0][0]} lon1={pos[0][1]} lat2={pos[1][0]} lon2={pos[1][1]} />
        <p>Current Speed in Parent Component: {speed} km/h</p>

      <button onClick={increaseSpeed}>Increase Speed</button>
      <button onClick={decreaseSpeed}>Decrease Speed</button>
      <button onClick={handleStopButtonClick}>Stop Marker</button>
      {audioo ? <Alert severity="error">
                  <AlertTitle>High Speed : Slow Down The Speed</AlertTitle>
                  
                </Alert>: null}

                <br />
                {altitudes.length>0 ? <><ul>{altitudes.map((altitude,i) => {
                  return (<li key={i}>{altitude}</li>)
                })}</ul></> : null}
      <Logout />

    </>
  );
};
export default Maps;

