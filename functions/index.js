/* eslint-disable indent */

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const fetchWeatherData = require("./weatherService");

const app = express();

app.use(cors({origin: true}));

app.get("/current", async (req, res) => {
  console.log("Hitting current route handler");
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

app.get("/forecast", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({error: "City parameter is required"});
  }
  try {
    const weatherData = await fetchWeatherData(city, "forecast");
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching forecast weather data:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
});

exports.app = functions.https.onRequest(app);
