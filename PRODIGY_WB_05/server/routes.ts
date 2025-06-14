import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { LocationSearchSchema, GeolocationSchema } from "@shared/schema";

const API_KEY = process.env.OPENWEATHER_API_KEY || process.env.VITE_OPENWEATHER_API_KEY;

// Sample data for when API key is not available
const SAMPLE_CURRENT_WEATHER = {
  dt: Math.floor(Date.now() / 1000),
  temp: 22,
  feels_like: 24,
  pressure: 1013,
  humidity: 65,
  visibility: 10000,
  wind_speed: 3.5,
  wind_deg: 180,
  weather: [{
    id: 800,
    main: "Clear",
    description: "clear sky",
    icon: "01d"
  }]
};

const SAMPLE_FORECAST = {
  current: SAMPLE_CURRENT_WEATHER,
  hourly: Array.from({ length: 24 }, (_, i) => ({
    dt: Math.floor(Date.now() / 1000) + (i * 3600),
    temp: 22 + Math.sin(i / 4) * 5,
    weather: [{
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: i % 8 < 4 ? "01d" : "02d"
    }]
  })),
  daily: Array.from({ length: 7 }, (_, i) => ({
    dt: Math.floor(Date.now() / 1000) + (i * 86400),
    temp: {
      min: 15 + Math.random() * 5,
      max: 25 + Math.random() * 8
    },
    weather: [{
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d"
    }]
  }))
};

const SAMPLE_LOCATIONS = [
  { name: "New York", country: "US", state: "NY", lat: 40.7128, lon: -74.0060 },
  { name: "Los Angeles", country: "US", state: "CA", lat: 34.0522, lon: -118.2437 },
  { name: "Chicago", country: "US", state: "IL", lat: 41.8781, lon: -87.6298 },
  { name: "London", country: "GB", lat: 51.5074, lon: -0.1278 },
  { name: "Paris", country: "FR", lat: 48.8566, lon: 2.3522 },
  { name: "Tokyo", country: "JP", lat: 35.6762, lon: 139.6503 },
  { name: "Sydney", country: "AU", lat: -33.8688, lon: 151.2093 },
  { name: "Toronto", country: "CA", lat: 43.6532, lon: -79.3832 },
  { name: "Berlin", country: "DE", lat: 52.5200, lon: 13.4050 },
  { name: "Mumbai", country: "IN", state: "Maharashtra", lat: 19.0760, lon: 72.8777 },
  { name: "Delhi", country: "IN", lat: 28.6139, lon: 77.2090 },
  { name: "Bangalore", country: "IN", state: "Karnataka", lat: 12.9716, lon: 77.5946 },
  { name: "Pune", country: "IN", state: "Maharashtra", lat: 18.5204, lon: 73.8567 },
  { name: "Hyderabad", country: "IN", state: "Telangana", lat: 17.3850, lon: 78.4867 },
  { name: "Chennai", country: "IN", state: "Tamil Nadu", lat: 13.0827, lon: 80.2707 },
  { name: "Kolkata", country: "IN", state: "West Bengal", lat: 22.5726, lon: 88.3639 },
  { name: "Seoul", country: "KR", lat: 37.5665, lon: 126.9780 },
  { name: "Moscow", country: "RU", lat: 55.7558, lon: 37.6176 },
  { name: "Dubai", country: "AE", lat: 25.2048, lon: 55.2708 },
  { name: "Singapore", country: "SG", lat: 1.3521, lon: 103.8198 },
  { name: "Bangkok", country: "TH", lat: 13.7563, lon: 100.5018 },
  { name: "Hong Kong", country: "HK", lat: 22.3193, lon: 114.1694 },
  { name: "Shanghai", country: "CN", lat: 31.2304, lon: 121.4737 },
  { name: "Beijing", country: "CN", lat: 39.9042, lon: 116.4074 }
];
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get current weather by coordinates
  app.get("/api/weather/current", async (req, res) => {
    try {
      const { lat, lon } = GeolocationSchema.parse({
        lat: parseFloat(req.query.lat as string),
        lon: parseFloat(req.query.lon as string),
      });

      if (!API_KEY) {
        console.log("No API key available, returning sample data");
        return res.json(SAMPLE_CURRENT_WEATHER);
      }

      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        console.error(`Weather API error: ${response.status} ${response.statusText}`);
        return res.json(SAMPLE_CURRENT_WEATHER);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching current weather:", error);
      res.json(SAMPLE_CURRENT_WEATHER);
    }
  });

  // Get forecast data by coordinates
  app.get("/api/weather/forecast", async (req, res) => {
    try {
      const { lat, lon } = GeolocationSchema.parse({
        lat: parseFloat(req.query.lat as string),
        lon: parseFloat(req.query.lon as string),
      });

      if (!API_KEY) {
        console.log("No API key available, returning sample forecast data");
        return res.json(SAMPLE_FORECAST);
      }

      const response = await fetch(
        `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&exclude=minutely,alerts`
      );

      if (!response.ok) {
        console.error(`Forecast API error: ${response.status} ${response.statusText}`);
        return res.json(SAMPLE_FORECAST);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching forecast:", error);
      res.json(SAMPLE_FORECAST);
    }
  });

  // Search locations by name
  app.get("/api/weather/search", async (req, res) => {
    try {
      const { query } = LocationSearchSchema.parse({ query: req.query.q });
      console.log(`Searching for: "${query}", API_KEY exists: ${!!API_KEY}`);

      // Always try API first if key exists
      if (API_KEY) {
        try {
          const response = await fetch(
            `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
          );

          if (response.ok) {
            const data = await response.json();
            console.log(`API returned ${data.length} results`);
            return res.json(data);
          } else {
            console.error(`OpenWeatherMap API error: ${response.status} ${response.statusText}`);
          }
        } catch (apiError) {
          console.error("API request failed:", apiError);
        }
      }

      // Fallback to sample data
      const queryLower = query.toLowerCase().trim();
      const filteredLocations = SAMPLE_LOCATIONS.filter(location => {
        const nameMatch = location.name.toLowerCase().includes(queryLower);
        const countryMatch = location.country.toLowerCase().includes(queryLower);
        const stateMatch = location.state && location.state.toLowerCase().includes(queryLower);
        
        console.log(`Checking ${location.name}: name=${nameMatch}, country=${countryMatch}, state=${stateMatch}`);
        return nameMatch || countryMatch || stateMatch;
      });
      
      console.log(`Fallback returned ${filteredLocations.length} results for "${query}"`);
      console.log(`Filtered locations:`, filteredLocations.map(l => l.name));
      res.json(filteredLocations);

    } catch (error) {
      console.error("Error in search endpoint:", error);
      res.status(500).json({ message: "Search failed" });
    }
  });

  // Reverse geocoding to get location name from coordinates
  app.get("/api/weather/location", async (req, res) => {
    try {
      const { lat, lon } = GeolocationSchema.parse({
        lat: parseFloat(req.query.lat as string),
        lon: parseFloat(req.query.lon as string),
      });

      if (!API_KEY) {
        // Return a generic location for demo
        return res.json({ name: "Sample City", country: "US", state: "CA" });
      }

      const response = await fetch(
        `${GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      );

      if (!response.ok) {
        console.error(`Reverse geocoding API error: ${response.status} ${response.statusText}`);
        return res.json({ name: "Sample City", country: "US", state: "CA" });
      }

      const data = await response.json();
      res.json(data[0] || { name: "Unknown Location", country: "Unknown" });
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      res.json({ name: "Sample City", country: "US", state: "CA" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
