import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Logout from "./components/Logout";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./index.css";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="app-container">
      <h1 className="text-center text-3xl font-bold p-4">To-Do List App</h1>

      <div className="flex justify-center items-center p-4 w-full">
        {!isAuthenticated ? <Login /> : <Logout />}
      </div>

      {!isAuthenticated ? (
        <p className="text-center text-gray-500">
          Please log in to manage tasks.
        </p>
      ) : (
        <div className="flex justify-between w-full px-8 py-4 space-x-8">
          {/* Left Half: Task Input */}
          <div className="w-1/2">
            <TaskInput />
          </div>

          {/* Right Half: Task List */}
          <div className="w-1/2">
            <TaskList />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
