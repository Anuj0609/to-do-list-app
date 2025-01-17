import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../redux/taskSlice";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks); // Correct single declaration
  const dispatch = useDispatch();

  const handleDelete = (index) => {
    dispatch(deleteTask(index));
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { High: 3, Medium: 2, Low: 1 };

    if (priorityOrder[a.priority] > priorityOrder[b.priority]) return -1;
    if (priorityOrder[a.priority] < priorityOrder[b.priority]) return 1;

    return b.timestamp - a.timestamp;
  });

  return (
    <div className="space-y-4 p-4 max-w-lg mx-auto">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 italic text-lg">
          No tasks available
        </p>
      ) : (
        sortedTasks.map((task, index) => {
          const priorityColors = {
            High: "bg-red-500",
            Medium: "bg-yellow-500",
            Low: "bg-green-500",
          };

          return (
            <div
              key={index}
              className="flex justify-between items-center p-4 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex flex-col space-y-2">
                <p className="text-lg font-semibold">
                  {task.text || "No task name"}
                </p>
                <p className="text-sm text-gray-500">
                  <span
                    className={`text-white px-2 py-1 rounded-md ${
                      priorityColors[task.priority]
                    }`}
                  >
                    {task.priority}
                  </span>
                </p>
                {task.weather &&
                  task.weather.description &&
                  task.weather.temperature && (
                    <div className="text-sm text-gray-500 mt-2">
                      <p>Weather: {task.weather.description}</p>
                      <p>Temperature: {task.weather.temperature}°C</p>
                    </div>
                  )}
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TaskList;
