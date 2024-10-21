import React, { useEffect, useState } from "react";
import "./weather.css";
import search_icon from "../assets/images/search.png";
import clear_icon from "../assets/images/clear.png";
import wind_icon from "../assets/images/wind.png";
import humidity_icon from "../assets/images/humidity.png";

const Weather = () => {
  const apiKey = "7fd85bba8b645a88115bd5284dfe4a94"; // Replace with your actual API key
  const [city, setCity] = useState("India"); // State for the city input
  const [weatherData, setWeatherData] = useState(null); // State for weather data
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  const search = async (city) => {
    setLoading(true); // Set loading to true while fetching
    setError(null); // Reset error state
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Corrected template literal
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      console.log(data);
      setWeatherData(data); // Store the fetched data in state
    } catch (err) {
      console.error(err);
      setError(err.message); // Store the error message
      setWeatherData(null); // Clear weather data on error
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    search(city); // Search for the weather of the entered city
  };

  useEffect(() => {
    search(city); // Fetch weather data for the default city on mount
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search city"
            value={city}
            onChange={(e) => setCity(e.target.value)} // Update city state on input change
          />
          <button type="submit">
            <img src={search_icon} alt="Search" />
          </button>
        </form>
      </div>
      {loading && <p>Loading...</p>} {/* Show loading text while fetching */}
      {error && <p className="error">{error}</p>}{" "}
      {/* Show error message if any */}
      {weatherData && (
        <>
          <img src={clear_icon} alt="Weather icon" className="weather-icon" />
          <p className="temperature">{weatherData.main.temp}°C</p>
          <p className="location">
            {weatherData.name}, {weatherData.sys.country}
          </p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity icon" />
              <div>
                <p>{weatherData.main.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind speed icon" />
              <div>
                <p>{weatherData.wind.speed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
