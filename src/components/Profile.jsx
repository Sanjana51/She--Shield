import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold text-pink-600 mb-4">Welcome, {user?.name}</h1>
        <p className="text-gray-700 mb-6">Email: {user?.email}</p>
        <button
          onClick={logout}
          className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

