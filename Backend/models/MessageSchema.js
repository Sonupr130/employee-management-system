import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Recipient user
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null }, // Optional admin sender
  message: { type: String, required: true }, // Notification message
  isRead: { type: Boolean, default: false }, // Read/Unread status
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

export default mongoose.model("Message", MessagesSchema);
