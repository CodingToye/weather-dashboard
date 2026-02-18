import express from "express";
import fetchWeatherData from "../services/weatherService.js";

export const weatherRoute = express.Router();
// Define a route handler for the /weather endpoint
weatherRoute.get("/current", async (req, res) => {
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
  // Handle the request and send a response
  // res.send('Weather API endpoint');
});

weatherRoute.get("/forecast", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({error: "City parameter is required"});
  }
  try {
    const weatherData = await fetchWeatherData(city, "forecast", true);
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching forecast weather data:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
  // Handle the request and send a response
  // res.send('Weather API endpoint');
});

weatherRoute.get("/history", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({error: "City parameter is required"});
  }
  try {
    const weatherData = await fetchWeatherData(city, "history");
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching history weather data:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
  // Handle the request and send a response
  // res.send('Weather API endpoint');
});

weatherRoute.get("/astronomy", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({error: "City parameter is required"});
  }
  try {
    const weatherData = await fetchWeatherData(city, "astronomy", true);
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching forecast weather data:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
  // Handle the request and send a response
  // res.send('Weather API endpoint');
});
