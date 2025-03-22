
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../assets/kris logo 3.png";
import HRlogo from "../../assets/hr.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMailDropdownOpen, setMailDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [userId, setUserId] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser).id : null;
  });
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(
    "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
  );

  useEffect(() => {
    if (!userId) return;
  
    const fetchData = async () => {
      try {
        const [notificationsRes, messagesRes] = await Promise.all([
          axios.get(`http://localhost:5000/notifications/${userId}`),
          axios.get(`http://localhost:5000/messages/${userId}`), // Missing API call added
        ]);
  
        setNotifications(
          Array.isArray(notificationsRes.data) ? notificationsRes.data : []
        );
        setMessages(messagesRes.data.notifications || []);
      } catch (error) {
        console.error("Error fetching notifications and messages:", error);
      }
    };
  
    fetchData();
  }, [userId]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/user/logout");
      localStorage.removeItem("token"); // Remove token
      localStorage.removeItem("user"); // Remove user data
      localStorage.removeItem("userId");
      localStorage.clear(); // Remove user ID if stored separately

      // Redirect to login page
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const markNotificationsAsRead = async () => {
    try {
      await axios.put(`http://localhost:5000/notifications/read/${userId}`);
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true }))
      );
    } catch (error) {
      //toast.error("Failed to mark notifications as read.");
      // console.log(error);
    }
  };
  const markMessagesAsRead = async () => {
    try {
      await axios.put(`http://localhost:5000/messages/read/${userId}`);
      setMessages((prev) => prev.map((msg) => ({ ...msg, isRead: true })));
    } catch (error) {
      toast.error("Failed to mark messages as read.");
    }
  };

  

  useEffect(() => {
    if (userId) {
      fetchProfileImage();
    }
  }, [userId]);

  const fetchProfileImage = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/profile-image/${userId}`
      );
      setProfilePic(response.data.imageUrl); // Set the Base64 image
    } catch (error) {
      console.error(
        "Error fetching profile image:",
        error.response?.data || error.message
      );
    }
  };

  const token = localStorage.getItem("token");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setError("No authentication token found. Please log in.");
        return;
      }
  
      try {
        const userResponse = await axios.get(
          "http://localhost:5000/get-user-data",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchProfileImage();
        const fetchedUserName = userResponse.data.name;
        if (!fetchedUserName) {
          console.error("Error: User name is missing.");
          return;
        }
        setUserName(fetchedUserName);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, [token]);

  
  


 

  return (
    <nav className="bg-white shadow h-20 px-10 flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-32">
          <img src={logo} alt="logo" />
        </div>
      </div>

      <div className="flex space-x-8 text-gray-700 text-lg items-center">
        <Link to="/user/dashboard/" className="hover:text-blue-500">Dashboard</Link>
        <Link to="#" className="hover:text-blue-500">Requests</Link>
        <Link to="/user/dashboard/payroll" className="hover:text-blue-500">Payroll</Link>
        <Link to="/user/dashboard/comapny" className="hover:text-blue-500">Company</Link>
        <Link to="#" className="hover:text-blue-500">Extras</Link>
      </div>

      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setDropdownOpen(!isDropdownOpen)}>
            <span className="material-icons text-blue-500 text-3xl">
              notifications
            </span>
            {Array.isArray(notifications) && notifications.some((notif) => !notif.isRead) && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {notifications.filter((notif) => !notif.isRead).length}
              </span>
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <button
                  onClick={markNotificationsAsRead}
                  className="text-blue-500 text-sm"
                >
                  Mark all as read
                </button>
              </div>
              <ul className="max-h-72 overflow-y-auto">
                {Array.isArray(notifications) && notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <li
                      key={notif._id}
                      className="flex items-start space-x-4 py-3 border-b last:border-none"
                    >
                      <img
                        src={HRlogo}
                        alt="avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p
                          className={`text-sm ${
                            notif.isRead
                              ? "text-gray-400"
                              : "text-black font-medium"
                          }`}
                        >
                          {notif.message}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 py-4 text-center">
                    No new notifications
                  </p>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Messages */}
       <div className="relative">
          <button onClick={() => setMailDropdownOpen(!isMailDropdownOpen)}>
            <span className="material-icons text-green-500 text-3xl">mail</span>
            {Array.isArray(messages) && messages.some((msg) => !msg.isRead) && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {messages.filter((msg) => !msg.isRead).length}
              </span>
            )}
          </button>

          {isMailDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-semibold">Messages</h3>
                <button
                  onClick={markMessagesAsRead}
                  className="text-blue-500 text-sm"
                >
                  Mark all as read
                </button>
              </div>
              <ul className="max-h-72 overflow-y-auto">
                {Array.isArray(messages) && messages.length > 0 ? (
                  messages.map((msg) => (
                    <li
                      key={msg._id}
                      className="py-3 border-b last:border-none"
                    >
                      <p
                        className={`text-sm ${
                          msg.isRead
                            ? "text-gray-400"
                            : "text-black font-medium"
                        }`}
                      >
                        {msg.message}
                      </p>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 py-4 text-center">
                    No new messages
                  </p>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Messages */}
        
{/* <div className="relative">
  <button onClick={() => setMailDropdownOpen(!isMailDropdownOpen)}>
    <span className="material-icons text-green-500 text-3xl">mail</span>
    {Array.isArray(messages) && messages.some((msg) => !msg.isRead) && (
      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
        {messages.filter((msg) => !msg.isRead).length}
      </span>
    )}
  </button>

  {isMailDropdownOpen && (
    <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="text-lg font-semibold">Messages</h3>
        <button
          onClick={markMessagesAsRead}
          className="text-blue-500 text-sm"
        >
          Mark all as read
        </button>
      </div>
      <ul className="max-h-72 overflow-y-auto">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.some((msg) => !msg.isRead) ? (
            messages.map((msg) => (
              <li key={msg._id} className="py-3 border-b last:border-none">
                <p
                  className={`text-sm ${
                    msg.isRead ? "text-gray-400" : "text-black font-medium"
                  }`}
                >
                  {msg.message}
                </p>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500 py-4 text-center">
              No new messages
            </p>
          )
        ) : (
          <p className="text-sm text-gray-500 py-4 text-center">
            No new messages
          </p>
        )}
      </ul>
    </div>
  )}
</div> */}


        {/* Profile Dropdown */}
        <div className="relative">
          <button onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}>
            <div className="h-12 w-12 rounded-full bg-red-600 overflow-hidden">
            <img className="rounded-full h-full w-full object-cover" src={profilePic} alt="" />
            </div>
          </button>
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg p-4 z-50">
              <p className="text-lg font-semibold text-center">{userName || "User not found"}</p>
              <button
                onClick={handleLogout}
                className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;









