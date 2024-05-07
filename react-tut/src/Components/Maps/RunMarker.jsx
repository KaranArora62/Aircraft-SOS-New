import React, { useState, useEffect, useMemo, useRef } from "react";
import { Marker } from "react-leaflet";
import { markerIcon } from "./CustomMarker";
import "leaflet/dist/leaflet.css";
import "./RunMarker.css";

const RunMarker = (props) => {
  const startLat = props.lat1;
  const startLon = props.lon1;
  const endLat = props.lat2;
  const endLon = props.lon2;
  const numberOfPoints = 1000;
  const timeInterval = 200; // 1 second

  const [allPoints, setAllPoints] = useState([]);
  const [prevTimestamp, setPrevTimestamp] = useState(0);
  const markerRef = useRef(null);

  const calculateDistance = (point1, point2) => {
    // Haversine formula to calculate distance between two points on Earth
    const R = 6371e3; // Earth's radius in meters
    const lat1 = (point1[0] * Math.PI) / 180;
    const lat2 = (point2[0] * Math.PI) / 180;
    const lon1 = (point1[1] * Math.PI) / 180;
    const lon2 = (point2[1] * Math.PI) / 180;
    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;

    const a =
      Math.sin(dlat / 2) * Math.sin(dlat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const points = useMemo(() => {
    const latDiff = (endLat - startLat) / (numberOfPoints + 1);
    const lngDiff = (endLon - startLon) / (numberOfPoints + 1);
    const calculatedPoints = [];

    for (let i = 1; i <= numberOfPoints; i++) {
      const lat = startLat + latDiff * i;
      const lng = startLon + lngDiff * i;
      calculatedPoints.push([lat, lng]);
    }

    return calculatedPoints;
  }, [startLat, startLon, endLat, endLon, numberOfPoints]);

  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [success, setSuccess] = useState(false);

  const audio = new Audio("./sound2.mp3"); // Replace "/sound.mp3" with the correct path to your MP3 file

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!props.markerRunning) {
        const randomAltitudes = Array.from({ length: allPoints.length }, () =>
          Math.floor(Math.random() * 5000) + 100 // Random altitude between 100 and 5100 meters
        );
        props.setAltitudes(randomAltitudes);
        // Stop the marker if markerRunning is false
        clearTimeout(timer);
        props.onMarkerEnd(allPoints[allPoints.length - 5]); // Send the last marker location to the parent
        return;
      }
      if (currentPointIndex < points.length - 1) {
        setCurrentPointIndex(currentPointIndex + 1);
        console.log(currentPointIndex);
        setAllPoints([...allPoints, points[currentPointIndex]]);
        const distance = currentPointIndex > 0 ? calculateDistance(
          points[currentPointIndex],
          points[currentPointIndex - 1]
        ) : 0;
        const timestamp = Date.now();
        const timeDifference = (timestamp - prevTimestamp) / 1000; // Time difference in seconds
        setPrevTimestamp(timestamp);
        // Calculate speed (distance / time)
        const speedInMs = distance / timeDifference; // Speed in meters per second
        const total = (props.manipulatedSpeed + speedInMs) / 19;
        props.setSpeed(total.toFixed(2)); // Set speed with 2 decimal places
        if (total > 1000) {
          if (!props.audioo) {
            audio.play();
            props.setAudioo(true);
          }
        } else {
          if (props.audioo) {
            audio.pause();
            props.setAudioo(false);
          }
        }

        // Smoothly transition the marker using CSS animation
        const marker = markerRef.current;
        if (marker) {
          marker.setLatLng(points[currentPointIndex]);
          marker.getElement()?.classList.add("marker-transition");
          setTimeout(() => {
            marker.getElement()?.classList.remove("marker-transition");
          }, timeInterval);

        }
      } else {
        clearTimeout(timer);
        console.log("Marker reached the end point.");
        setSuccess(true);
        console.log(allPoints);
      }
    }, timeInterval);

    return () => {
      clearTimeout(timer);
    };


  }, [currentPointIndex, points, props.markerRunning]);

  return (
    <>
      {
        success ? <Marker
          position={[endLat, endLon]}
          icon={markerIcon}
        />

          : <Marker
            position={points[currentPointIndex]}
            icon={markerIcon}
            ref={markerRef}
          />
      }
    </>
  );
};

export default RunMarker;