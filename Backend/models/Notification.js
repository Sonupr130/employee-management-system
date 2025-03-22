import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Recipient user
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    default: null,
  }, // Optional admin sender
  message: { type: String, required: true }, // Notification message
  isRead: { type: Boolean, default: false }, // Read/Unread status
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

export default mongoose.model("Notification", notificationSchema);
