import React, { useState } from "react";
import axios from "axios";
import Profile from "../components/Profile.jsx";

const WeatherNow = () => {
  const user = { name: "Jamie", occupation: "Outdoor Enthusiast", email: "jamie@weather.com" };
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const res = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&current_weather=true`
    );
    setWeather(res.data.current_weather);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Weather Now</h2>
      <Profile user={user} />
      <div className="mt-6">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={fetchWeather} className="btn ml-2">Get Weather</button>
        {weather && (
          <div className="mt-4">
            <p><strong>Temperature:</strong> {weather.temperature}°C</p>
            <p><strong>Wind Speed:</strong> {weather.windspeed} km/h</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherNow;
