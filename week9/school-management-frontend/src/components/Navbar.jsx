import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { useContext } from "react";
import {AuthContext} from "../context/AuthContext"
    

export default function Navbar() {

  const {user, setUser} = useContext(AuthContext)
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // const user = token ? JSON.parse(atob(token.split(".")[1])) : null;

  const handleLogout = () => {
    logout();
    setUser(null)
    navigate("/");
  };

  return (
    <nav className="bg-white border-b shadow px-6 py-4 flex justify-between items-center">
      <div
        className="text-xl font-semibold text-gray-700 cursor-pointer"
        onClick={() => navigate("/")}
      >
        School System
      </div>

      {user? (
        <>
          {/* Navigation links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/courses")}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Courses
            </button>
            <button
              onClick={() => navigate("/students")}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Students
            </button>
            <button
              onClick={() => navigate("/teachers")}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Teachers
            </button>
          </div>

          {/* User info and logout */}
          <div className="flex items-center gap-4 ml-6">
            <span className="text-sm text-gray-600">
              Logged in as <strong>{user?.email || "User"}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}
