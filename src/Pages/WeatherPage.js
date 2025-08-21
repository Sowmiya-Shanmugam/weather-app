import React, { useEffect, useState } from "react";
import {
  getCurrentWeather,
  getDailyForecast,
  searchCities,
} from "../api/fakeWeatherApi";

export default function WeatherPage() {
  const [city, setCity] = useState("Chennai");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch weather whenever city changes
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const w = await getCurrentWeather(city);
        setWeather(w);
        const f = await getDailyForecast(city);
        setForecast(f.forecast);
      } catch (e) {
        setError(e.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    if (city) load();
  }, [city]);

  // city search box
  const handleChange = async (e) => {
    const val = e.target.value;
    setCity(val);
    if (val.trim()) {
      const results = await searchCities(val);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="weather-app">
      <h2>Fake Weather App</h2>

      {/* Search box */}
      <div className="search-row">
        <input
          className="input"
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Search city..."
        />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((s) => (
            <button
              key={s.id}
              className="suggestion"
              onClick={() => {
                setCity(s.name);
                setSuggestions([]);
              }}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      {/* Loading + Error */}
      {loading && <p className="loading">Loading weather…</p>}
      {error && <p className="error">{error}</p>}

      {/* Current Weather */}
      {weather && !loading && !error && (
        <div className="card">
          <div className="flex">
            <h3>{weather.city}</h3>
            <span className="badge">{weather.description}</span>
          </div>
          <div className="meta">
            <span>🌡️ {weather.temp}°C (Feels {weather.feelsLike}°C)</span>
            <span>💧 {weather.humidity}%</span>
            <span>🌬️ {weather.wind} m/s</span>
          </div>
        </div>
      )}

      {/* Forecast */}
      {forecast.length > 0 && !loading && !error && (
        <>
          <h3 className="mt16">7-Day Forecast</h3>
          <div className="grid">
            {forecast.map((d, i) => (
              <div key={i} className="day">
                <div className="date">{d.date}</div>
                <div className="desc">{d.description}</div>
                <div className="range">
                  Min {d.min}° • Max {d.max}°
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
