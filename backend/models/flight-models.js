import mongoose from 'mongoose'

const flightDataSchema = new mongoose.Schema({
  flightNumber: { type: String, unique: true },
  lastMarkerLocation: { type: String },
  altitudeData: [{ label: String, altitude: Number }]
});

const FlightData = mongoose.model("incidentreports", flightDataSchema);

export default FlightData