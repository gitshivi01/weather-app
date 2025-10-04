import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleCityChange = (event) => setCity(event.target.value);

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      console.log("error fetching weather data", error);
      alert("City not found or API error!");
    }
  };

  const handleClick = () => fetchWeather();

  return (
    <div className="max-w-xl mx-auto p-10 text-center bg-blue-300 flex flex-col gap-6 shadow-md rounded-xl">
      <input
        type="text"
        className="bg-amber-50 border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityChange}
      />
      <button
        className="w-48 py-3 border-2 border-orange-200 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition mx-auto"
        onClick={handleClick}
      >
        Get Weather
      </button>

      {weather && (
        <div className="weather-info bg-white p-6 rounded-xl shadow-md flex flex-col items-center gap-2">
          <h3 className="text-2xl font-bold">{weather.name}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p className="text-lg font-semibold">
            Temperature: {weather.main.temp}°C
          </p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p className="capitalize">{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
