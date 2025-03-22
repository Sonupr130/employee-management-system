import { useEffect, useState } from "react";
import axios from "axios";

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/notifications/${userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  const markAsRead = async () => {
    try {
      await axios.put(`http://localhost:5000/notifications/read/${userId}`);
      setNotifications([]); // Clear notifications after marking as read
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {notifications.length > 0 ? (
        <>
          <ul className="bg-white shadow-lg rounded-lg p-4">
            {notifications.map((notification) => (
              <li key={notification._id} className="py-2 border-b">
                {notification.message}
              </li>
            ))}
          </ul>
          <button onClick={markAsRead} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
            Mark All as Read
          </button>
        </>
      ) : (
        <p>No new notifications.</p>
      )}
    </div>
  );
};

export default Notifications;
