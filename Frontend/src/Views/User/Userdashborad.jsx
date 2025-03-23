import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Barchart from "./Barchart";
import Chat from "./Chat";
import config from "../../../config.js";

const Userdashborad = () => {
  const [userName, setUserName] = useState(""); // State to store user name
  const [jobTitle, setJobTitle] = useState(""); // State to store user name
  const [error, setError] = useState(null); // Error state
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [todos, setTodos] = useState([]); // Declare todos state
  const token = localStorage.getItem("token");
  const [expandedTodo, setExpandedTodo] = useState(null); // Track expanded item
  const toggleExpand = (todoId) => {
    setExpandedTodo(expandedTodo === todoId ? null : todoId);
  };

  const [leaveBalances, setLeaveBalances] = useState({
    "Annual Leave": 15,
    "Sick Leave": 15,
    "Causal Leave": 15,
    "Compassionate Leave": 15,
  });


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          setError("No authentication token found. Please log in.");
          return;
        }

        // ✅ Fetch user data
        const { data: userData } = await axios.get(
          // "http://localhost:5000/get-user-data",
          `${config.backendUrl}/get-user-data`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const userId = userData?._id;
        if (!userId) {
          setError("User ID not found.");
          return;
        }

        setUserName(userData?.name || "User");
        setJobTitle(userData?.jobTitle || "Job Title");

        // ✅ Fetch Pending Todos
        const { data } = await axios.get(
          // `http://localhost:5000/todos/pending/${userId}`
          `${config.backendUrl}/todos/pending/${userId}`
        );

        if (data.todos.length === 0) {
          console.log("No todos initiated to you"); // ✅ Log message when no todos
        }

        setTodos(data.todos); // ✅ Handles empty array properly

        // ✅ Fetch Leave History
        const { data: leaveData } = await axios.get(
          // "http://localhost:5000/get-leave-history",
          `${config.backendUrl}/get-leave-history`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setLeaveHistory(leaveData);

        // ✅ Fix leave balance update
        setLeaveBalances((prevBalances) => {
          const updatedBalances = { ...prevBalances };
          leaveData.forEach((leave) => {
            const normalizedType = leave.type
              .trim()
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase()); // ✅ Capitalize First Letter
            updatedBalances[normalizedType] =
              (updatedBalances[normalizedType] || 0) - leave.duration;
          });

          return updatedBalances;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  const updateTodoStatus = async (todoId, newStatus) => {
    try {
      // await axios.put(`http://localhost:5000/todo/update/${todoId}`, {
      await axios.put( `${config.backendUrl}/todo/update/${todoId}`, {
        status: newStatus,
      });

      // Update state to reflect changes in the UI

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === todoId ? { ...todo, status: newStatus } : todo
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="bg-[#E3EDF9] min-h-screen p-6">
      {/* Header Section */}
      {/* <div className="bg-blue-500 text-white rounded-lg p-6 mb-6 shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{userName || "User"}</h1>
          <p className="text-lg">{jobTitle || "JobTitle"}</p>
        </div>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500">
          Edit Profile
        </button>
      </div> */}

      <div
        className="relative rounded-lg p-6 mb-6 shadow-lg flex justify-between items-center overflow-hidden"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-vector/cartoon-working-day-scene-illustration_52683-62609.jpg?t=st=1742616289~exp=1742619889~hmac=2e739723116c9463708388a774040d5b24986a9f8fcc8033ce207522b4080a23&w=1380')`,
          backgroundSize: "cover", // Ensure the image covers the entire div
          backgroundPosition: "center", // Center the background image
        }}
      >
        {/* Overlay to improve text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white">
            {userName || "User"}
          </h1>
          <p className="text-lg text-white">{jobTitle || "JobTitle"}</p>
        </div>

        {/* Edit Profile Button */}
        <button className="relative z-10 bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500">
          Edit Profile
        </button>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap justify-center gap-8 mb-6">
        <Link to="/user/dashboard/leaveapply">
          <button className="bg-white text-lg text-blue-600 p-4 rounded-lg shadow hover:bg-blue-100">
            Apply for Leave
          </button>
        </Link>
        <Link to="/apply-for-leave">
          <button className="bg-white text-lg text-blue-600 p-4 rounded-lg shadow hover:bg-blue-100">
            KPI Goals
          </button>
        </Link>
        <Link to="/user/dashboard/take-appraisal">
          <button className="bg-white text-lg text-blue-600 p-4 rounded-lg shadow hover:bg-blue-100">
            Take Appraisal
          </button>
        </Link>
        <Link to="/user/dashboard/">
          <button className="bg-white text-lg text-blue-600 p-4 rounded-lg shadow hover:bg-blue-100">
            View Payslip
          </button>
        </Link>
        <Link to="/user/dashboard/update-profile">
          <button className="bg-white text-lg text-blue-600 p-4 rounded-lg shadow hover:bg-blue-100">
            Update Profile
          </button>
        </Link>
        <Link to="/updatingjsx">
          <button className="bg-white text-lg text-blue-600 p-4 rounded-lg shadow hover:bg-blue-100">
            Events
          </button>
        </Link>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Leave Days */}
        {/* Available Leave Days (Filtered from Leave History) */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Available Leave Days</h2>
          <ul className="space-y-2">
            {Object.keys(leaveBalances).map((leaveType) => (
              <li key={leaveType}>
                <p className="text-gray-700">{leaveType}</p>
                <div className="w-full bg-gray-300 rounded-full h-2.5 mt-1">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{
                      width: `${(leaveBalances[leaveType] / 15) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {leaveBalances[leaveType]} days remaining
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* To-Dos */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">To-dos</h2>
          <ul className="space-y-2">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <li
                  key={todo._id}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg"
                >
                  {/* Clickable Title */}
                  <div
                    className="cursor-pointer flex justify-between items-center"
                    onClick={() => toggleExpand(todo._id)}
                  >
                    <p className="font-bold">{todo.title}</p>
                    <span className="text-gray-500">
                      {expandedTodo === todo._id ? "▲" : "▼"}{" "}
                      {/* Dropdown icon */}
                    </span>
                  </div>

                  {/* Expandable Section */}
                  {expandedTodo === todo._id && (
                    <div className="mt-2 p-3 bg-blue-100 ">
                      <p>
                        <strong>Description:</strong>{" "}
                        {todo.description || "No description"}
                      </p>
                      <p>
                        <strong>Target Date:</strong>{" "}
                        {todo.targetDate || "No target date"}
                      </p>

                      {/* Status Buttons (Improved Layout) */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        <strong className="w-full">Status:</strong>
                        <button
                          className={`px-4 py-2 rounded-md flex-1 min-w-[120px] text-center ${
                            todo.status === "Pending"
                              ? "bg-yellow-400 text-black"
                              : "bg-gray-300 text-gray-700"
                          }`}
                          onClick={() => updateTodoStatus(todo._id, "Pending")}
                        >
                          Pending
                        </button>
                        <button
                          className={`px-4 py-2 rounded-md flex-1 min-w-[120px] text-center ${
                            todo.status === "Completed"
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 text-gray-700"
                          }`}
                          onClick={() =>
                            updateTodoStatus(todo._id, "Completed")
                          }
                        >
                          Completed
                        </button>
                        <button
                          className={`px-4 py-2 rounded-md flex-1 min-w-[120px] text-center ${
                            todo.status === "Not Completed"
                              ? "bg-red-500 text-white"
                              : "bg-gray-300 text-gray-700"
                          }`}
                          onClick={() =>
                            updateTodoStatus(todo._id, "Not Completed")
                          }
                        >
                          Not Completed
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No To-dos available.</p>
            )}
          </ul>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-lg shadow h-96 overflow-hidden">
        <Chat />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Birthdays */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Birthdays</h2>
          <ul className="space-y-4">
            {[
              "Jillian's Day - April 25th",
              "Jillian's Day - April 25th",
              "Jillian's Day - April 25th",
            ].map((birthday, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{birthday}</span>
                <button className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500">
                  Send Wishes
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Performance Appraisal */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Performance Appraisal</h2>
          <Barchart />
        </div>
      </div>
    </div>
  );
};

export default Userdashborad;
