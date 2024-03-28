const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const fetchWeatherData = require("./weatherService");

const app = express();
app.use(cors());

app.get("/current", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({error: "City parameter is required"});
  }
  try {
    const weatherData = await fetchWeatherData(city, "current");
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching current weather data:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
});

exports.api = functions.https.onRequest(app);
