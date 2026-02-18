const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const fetchWeatherData = require("./services/weatherService");

const app = express();
app.use(cors({origin: true})); // Allow all origins (or restrict to your frontend)

app.get("/current", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({error: "City is required"});

  try {
    const data = await fetchWeatherData(city, "current");
    res.json(data);
  } catch (error) {
    res.status(500).json({error: "Failed to fetch weather data"});
  }
});

app.get("/forecast", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({error: "City is required"});

  try {
    const data = await fetchWeatherData(city, "forecast", true);
    res.json(data);
  } catch (error) {
    res.status(500).json({error: "Failed to fetch forecast data"});
  }
});

// Export the function
exports.api = functions.https.onRequest(app);
