import User from "../models/user-models.js";
import FlightData from "../models/flight-models.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const homeAPI = async (req, res) => {
    try {
        res.status(200).send("Routing Using Controller");
    } catch (error) {
        console.log(error);
    }
};

const verifyAPIForSOS = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Token is missing" })
    }
    if (token) {
        jwt.verify(token, "MySecretKeyWithSOS", (err, decoded) => {
            if (err) {
                return res.json({ msg1: "Error in verifying token" })
            }
            if (decoded.authority === "Emergency Responders") {
                return res.status(200).json({ msg: "Success_to_Emergency_Teams_Portal" })
            }
            else {
                return res.json({ msg2: "NotIdentified" })
            }
        })
    }
}

const verifyAPIForAIRLINES = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Token is missing" })
    }
    if (token) {
        jwt.verify(token, "MySecretKeyWithAIRLINES", (err, decoded) => {
            if (err) {
                return res.json({ msg1: "Error in verifying token" })
            }
            if (decoded.authority === "airlines") {
                return res.status(200).json({ msg: "Success_to_Airlines_Portal" })
            }
            else {
                return res.json({ msg2: "Not Identified" })
            }
        })
    }
}
const altitudeData = async (req, res) => {
    try {
        const allRecords = await FlightData.find({});
        const response = {};

        allRecords.forEach((record, i) => {
            response[`tb${i}`] = record.altitudeData;
        });

        const count = await FlightData.countDocuments();
        // console.log(`Number of Documents ${count}`);

        res.status(200).json({ altitudeData: response, countDoc: count });
    } catch (error) {
        console.error("Error fetching altitude data:", error);
        res.status(500).json({ error: "An error occurred while fetching altitude data" });
    }
}
const savedataAPI = async (req, res) => {
    try {
      const { lastMarkerLocation, altitudes } = req.body;
      const altitudeData = altitudes.map((altitude, index) => ({
        label: (index + 1).toString(),
        altitude: altitude
      }));
  
      // Convert lastMarkerLocation array to string
      const locationString = lastMarkerLocation.join(',');
  
      // Generate a unique flight number
      let flightNumber;
      do {
        flightNumber = generateFlightNumber(); // Generate a random flight number
      } while (await FlightData.exists({ flightNumber: flightNumber }));
  
      // Create a new FlightData document
      const flightData = new FlightData({
        flightNumber: flightNumber,
        lastMarkerLocation: locationString, // Assign the converted location string
        altitudeData: altitudeData
      });
  
      // Save the FlightData document to the database
      await flightData.save();
  
      res.status(200).json({ message: "Data saved successfully", flightNumber: flightNumber });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ error: "An error occurred while saving data" });
    }
  };
  
  // Function to generate a random flight number
  function generateFlightNumber() {
    // Implement your logic to generate a random flight number
    // For example, you can generate a random string or number
    // Make sure it's unique in your database
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = 6;
    let flightNumber = "";
    for (let i = 0; i < length; i++) {
      flightNumber += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return flightNumber;
  }
  

const login = async (req, res) => {
    console.log('Login route reached');
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "No record exists" });
        }
        if (user) {
            bcrypt.compare(password, user.password, (err, respond) => {
                if (respond) {
                    if (user.authority === 'Emergency Responders') {
                        const token = jwt.sign({ email: user.email, authority: user.authority }, "MySecretKeyWithSOS")
                        console.log(token);
                        res.cookie('token', token);
                        return res.status(200).json({ message: `Success with ${user.username}`, username: user.username, authority: user.authority });
                    }
                    const token = jwt.sign({ email: user.email, authority: user.authority }, "MySecretKeyWithAIRLINES")
                    console.log(token);
                    res.cookie('token', token);
                    return res.status(200).json({ message: `Success with ${user.username}`, username: user.username, authority: user.authority });
                }
                else {
                    return res.status(401).json({ message: "The Password is incorrect" });
                }
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default { homeAPI, verifyAPIForSOS, login,altitudeData, verifyAPIForAIRLINES, savedataAPI };
