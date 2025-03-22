
import React, { useState, useEffect, useRef } from 'react';
import { getSocket } from '../../utils/socket';
import { Send, Smile } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import EmojiPicker from 'emoji-picker-react'; // Import EmojiPicker

const Chat = () => {
  const { user } = useAuth(); // Access the user object
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null); // Ref for the emoji picker modal

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false); // Close the emoji picker
      }
    };

    // Add event listener when the emoji picker is shown
    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    // Request chat history from the server
    socket.emit("requestChatHistory");

    // Fetch chat history when the component mounts
    socket.on("chatHistory", (history) => {
      console.log("📜 Chat History Received:", history);
      setMessages(history);
    });

    // Listen for new messages
    socket.on("receiveMessage", (data) => {
      console.log("📩 New Message:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    const socket = getSocket();
    if (!socket) return;

    const msgData = {
      sender: `${user.firstName} ${user.lastName}`,
      message,
      receiver: "admin", // or the specific user ID/name
    };

    socket.emit("sendMessage", msgData);
    setMessage("");
    setShowEmojiPicker(false); // Hide emoji picker after sending message
  };

  // Function to format time in "10:00 AM" or "2:00 PM" format
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Function to group messages by date
  const groupMessagesByDate = (messages) => {
    const groupedMessages = {};
    messages.forEach((msg) => {
      const date = new Date(msg.createdAt).toDateString(); // Get the date part only
      if (!groupedMessages[date]) {
        groupedMessages[date] = [];
      }
      groupedMessages[date].push(msg);
    });
    return groupedMessages;
  };

  // Function to format date as "Today", "Yesterday", or the actual date
  const formatDate = (dateString) => {
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (dateString === today) {
      return "Today";
    } else if (dateString === yesterday.toDateString()) {
      return "Yesterday";
    } else if (dateString === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }); // Display the actual date in a readable format
    }
  };

  // Group messages by date
  const groupedMessages = groupMessagesByDate(messages);

  // Function to handle emoji selection
  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji); // Append the selected emoji to the message
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-xl font-semibold p-3 bg-white border-b"> Announcements 📌</h1>
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {Object.entries(groupedMessages).map(([date, messages]) => (
          <div key={date}>
            {/* Date Separator */}
            <div className="flex items-center my-4">
              <hr className="flex-1 border-t border-gray-400" />
              <span className="mx-4 text-gray-500">{formatDate(date)}</span>
              <hr className="flex-1 border-t border-gray-400" />
            </div>

            {/* Messages for this date */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col space-y-1 mb-4 ${
                  msg.sender === `${user.firstName} ${user.lastName}`
                    ? 'items-end' // Sent messages (right side)
                    : 'items-start' // Received messages (left side)
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[70%] ${
                    msg.sender === `${user.firstName} ${user.lastName}`
                      ? 'bg-blue-500 text-white' // Sent messages (right side)
                      : 'bg-gray-200' // Received messages (left side)
                  }`}
                >
                  <div className="font-bold">{msg.sender}</div>
                  <p>{msg.message}</p>
                  <div className="text-xs mt-1 text-right">
                    {formatTime(msg.createdAt)} {/* Display formatted time */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center p-4 border-t border-gray-300">
        {/* Message Input with Emoji Button */}
        <div className="relative flex-1 flex items-center bg-slate-300 rounded mx-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-transparent p-3 outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* Emoji Button */}
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="p-2 text-gray-500 hover:text-blue-600"
          >
            <Smile className="w-6 h-6" />
          </button>
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div
            ref={emojiPickerRef}
            className="absolute bottom-16 right-1/3 z-50" 
          >
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        {/* Send Button */}
        <button onClick={sendMessage} className="bg-slate-100 px-4 p-3 rounded">
          <Send className="text-green-600" />
        </button>
      </div>
    </div>
  );
};

export default Chat;











