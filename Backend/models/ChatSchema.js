import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Recipient user
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    default: null,
  }, // Optional admin sender
  sender: {
    type: String,
    // required: true,
  },
  receiver: {
    type: String,
    default: null,
  },
  message: { type: String, required: true }, // Notification message
  isRead: { type: Boolean, default: false }, // Read/Unread status
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

export default mongoose.model("Chat", chatSchema);
