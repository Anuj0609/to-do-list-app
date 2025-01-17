import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-6 right-6 px-5 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all transform hover:scale-105"
    >
      Logout
    </button>
  );
};

export default Logout;
