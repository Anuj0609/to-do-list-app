import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import axios from "axios";

const TaskInput = () => {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [weather, setWeather] = useState(null);
  const dispatch = useDispatch();

  const handleAddTask = async () => {
    if (taskText.trim() !== "") {
      let taskWeather = null;

      if (
        taskText.toLowerCase().includes("run") ||
        taskText.toLowerCase().includes("hike")
      ) {
        const city = "London"; // Replace with dynamic city if needed

        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=42feaff7e7f178aec2c9ec08ddc1de79&units=metric`
          );
          taskWeather = {
            description: response.data.weather[0].description,
            temperature: response.data.main.temp,
          };
        } catch (error) {
          console.error("Weather API error:", error);
          taskWeather = {
            description: "Unable to fetch weather data",
            temperature: "--",
          };
        }
      }

      const newTask = {
        text: taskText,
        priority,
        timestamp: new Date().getTime(),
        weather: taskWeather,
      };

      dispatch(addTask(newTask));
      setTaskText(""); // Reset input field
      setWeather(null); // Reset weather info
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

      {weather && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            Weather: {weather.description}
          </p>
          <p className="text-sm text-gray-600">
            Temperature: {weather.temperature}°C
          </p>
        </div>
      )}

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
