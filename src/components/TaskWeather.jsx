import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskWeather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        fetchWeather(latitude, longitude);
      },
      (error) => {
        setError("Unable to retrieve location");
        console.error("Geolocation error: ", error);
      }
    );
  }, []);

  useEffect(() => {
    const API = "42feaff7e7f178aec2c9ec08ddc1de79";

    const fetchWeather = async (latitude, longitude) => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API}&units=metric`;
        const result = await axios.get(url);
        setWeather(result.data);
      } catch (err) {
        console.error("Error fetching weather data.");
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  return (
    <div>
      {error && <p>{error}</p>}
      {weather ? (
        <div>
          <h3>Weather OutSide: {weather.weather[0].description}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default TaskWeather;
