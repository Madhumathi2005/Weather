import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
      );
      if (!response.ok) {
        throw new Error("Location not found");
      }
      const data = await response.json();
      setWeather(data);
      setError("");

      if (!history.includes(location)) {
        setHistory((prev) => [location, ...prev].slice(0, 5)); // Save the last 5 searches
      }
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clouds":
        return "🌥️";
      case "Clear":
        return "☀️";
      case "Rain":
        return "🌧️";
      case "Snow":
        return "❄️";
      case "Thunderstorm":
        return "⛈️";
      case "Drizzle":
        return "🌦️";
      case "Mist":
        return "🌫️";
      default:
        return "🌍";
    }
  };

  return (
    <div className="app">
      <div className="search-container">
        <h1>Weather Finder</h1>
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input-field"
        />
        <button onClick={fetchWeather} className="search-btn">
          Get Weather
        </button>
        {error && <p className="error-msg">{error}</p>}
      </div>

      {weather && (
        <div className="weather-container">
          <h2>
            {getWeatherIcon(weather.weather[0].main)} {weather.name}
          </h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp} °F</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} mph</p>
        </div>
      )}

      <div className="history-container">
        <h2>Search History</h2>
        {history.length === 0 ? (
          <p>No history yet.</p>
        ) : (
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
