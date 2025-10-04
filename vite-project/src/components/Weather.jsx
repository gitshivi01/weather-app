import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
 const[weather, setWeather]= useState();

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

const fetchWeather= async() => {
    try{
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);
       setWeather(response);
    }
    catch(error){
console.log("error fetching weather data", error);

    }
}

const handleClick=() => {
    fetchWeather();
}

  return (
    <div className="max-w-xl mx-auto p-10 text-center bg-blue-300 flex flex-col gap-6 shadow-md rounded-xl">
      <input
        type="text"
        className="bg-amber-50 border-2 border-gray-300 p-3 w-98 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityChange}
      />
      <button className="w-48 py-3 border-2 border-orange-200 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition" 
      onClick={handleClick}>
        Get Weather
      </button>
      {weather && (<>
      <div className="weather-info">
        <h3>{ weather.data.name}</h3>
        <p>Temperature: {weather.data.main.temp}°C</p>
        <p>Humidity: {weather.data.main.humidity}%</p>
        <p>Wind Speed: {weather.data.wind.speed}m/s</p>
         <p>{weather.data.weather[0].description}</p>
        </div>
         </>)}
    </div>
  );
}

export default Weather;
