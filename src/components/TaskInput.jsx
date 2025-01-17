import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

const TaskInput = () => {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Low");
  const dispatch = useDispatch();

  // List of keywords that trigger weather fetching
  const outdoorKeywords = ["run", "hike", "jog", "bike", "outdoor", "walk"];

  // Handle task input
  const handleAddTask = async () => {
    if (taskText.trim() === "") return; // Prevent adding empty tasks

    const weather = await getWeatherForTask(taskText); // Fetch weather data based on task content

    const newTask = {
      text: taskText,
      priority,
      timestamp: Date.now(),
      weather, // Add weather to the task
    };

    dispatch(addTask(newTask));
    setTaskText(""); // Clear input field after adding task
  };

  // Get weather for current location if task contains outdoor-related keywords
  const getWeatherForTask = async (taskText) => {
    const containsOutdoorKeyword = outdoorKeywords.some((keyword) =>
      taskText.toLowerCase().includes(keyword)
    );

    if (!containsOutdoorKeyword) {
      return null; // No weather data needed for indoor tasks
    }

    return await getWeatherForCurrentLocation(); // Fetch weather if outdoor-related keyword found
  };

  // Get weather for current location
  const getWeatherForCurrentLocation = async () => {
    try {
      const geoResponse = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = geoResponse.coords;
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=42feaff7e7f178aec2c9ec08ddc1de79&q=${latitude},${longitude}`
      );
      const data = await response.json();
      return {
        description: data.current.condition.text,
        temperature: data.current.temp_c,
      };
    } catch (error) {
      console.error("Error getting weather:", error);
      return null; // Return null in case of error
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Add a New Task
      </h2>

      <input
        type="text"
        placeholder="Enter task..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
      />

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <label className="mr-2 text-lg">Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button
          onClick={handleAddTask}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 focus:outline-none"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
