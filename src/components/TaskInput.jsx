import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import axios from "axios";

const TaskInput = () => {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const getWeatherForCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return null;
    }

    try {
      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const { latitude, longitude } = position.coords;

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=42feaff7e7f178aec2c9ec08ddc1de79&units=metric`
      );
      return {
        description: response.data.weather[0].description,
        temperature: response.data.main.temp,
      };
    } catch (err) {
      setError("Unable to fetch weather data for your location.");
      console.error("Geolocation or Weather API error:", err);
      return null;
    }
  };

  const handleAddTask = async () => {
    if (taskText.trim() !== "") {
      const weatherData = await getWeatherForCurrentLocation();
      console.log("Weather Data:", weatherData); // Debug weather data

      const newTask = {
        text: taskText,
        priority,
        timestamp: new Date().getTime(),
        weather: weatherData || null,
      };

      console.log("New Task:", newTask); // Debug task before dispatch
      dispatch(addTask(newTask));
      setTaskText("");
      setWeather(null);
    } else {
      alert("Please enter a task name.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Add New Task
      </h2>

      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter task name"
        className="p-3 border border-gray-300 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="p-3 border border-gray-300 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button
        onClick={handleAddTask}
        className="w-full bg-blue-500 text-white p-3 mt-4 rounded-md hover:bg-blue-600 transition-all duration-200"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
