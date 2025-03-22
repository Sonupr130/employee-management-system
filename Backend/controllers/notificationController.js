import Notification from "../models/Notification.js";

// Create a new notification
export const createNotification = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging log

    const { userId, message } = req.body;
    if (!userId || !message) {
      return res.status(400).json({ error: "Missing userId or message" });
    }

    const notification = new Notification({ userId, message, isRead: false });
    await notification.save();
    console.log("Notification saved:", notification); // Debugging log
    res.status(201).json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Error creating notification" });
  }
};

// Fetch unread notifications for a user
export const getUnreadNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId, isRead: false });
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Error fetching notifications" });
  }
};

// Mark all notifications as read for a user
export const markNotificationsAsRead = async (req, res) => {
  try {
    const { userId } = req.params;
    await Notification.updateMany({ userId }, { isRead: true });
    res.json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error("Error updating notifications:", error);
    res.status(500).json({ error: "Error updating notifications" });
  }
};
