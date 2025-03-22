import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import payRoutes from "./routes/payoutRoutes.js";
import payoutRoutes from "./routes/payoutRoutes.js";
import http from "http";
import { Server } from "socket.io";
import Chat from "./models/ChatSchema.js";
import chalk from "chalk"; // ✅ Import Chalk for Colored Console Logs


dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


// 🟢 Store Active Users
const onlineUsers = []; // Array to store online users

 

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(authRoutes);
app.use(payRoutes);
app.use("/api", payoutRoutes);

app.get("/", (req, res) => {
  res.send({
    activeStatus: "Server is running now! 🔥",
    error: false,
  });
});


app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'favicon.ico'));
});
// ✅ 404 Route Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "❌ Route not found" });
});

// Real-time Socket.io Logic
io.on("connection", async (socket) => {
  const { userId = "Not Found", name = "Not Found", role = "Not Found" } = socket.handshake.auth;

  console.log(chalk.green(`
===========================================
🔗 ${chalk.bold(`${name} Connected`)}
-------------------------------------------
🔹 User ID   : ${userId}
🔹 Name      : ${name}
🔹 Role      : ${role}
🔹 Socket ID : ${socket.id}
===========================================
`));


// Log specific message for users with role "user"
if (role === "user") {
  console.log(chalk.blue(`
===========================================
👤 ${chalk.bold(`${name} Connected`)}
-------------------------------------------
🔹 User ID   : ${userId}
🔹 Socket ID : ${socket.id}
===========================================
`));
}


// Add user to online users list
const user = { id: socket.id, name, role };
onlineUsers.push(user);
io.emit("onlineUsers", onlineUsers); // Emit updated online users list to all clients

 
  // Emit chat history to the admin
  if (role === "admin") {
    const chatHistory = await Chat.find().sort({ createdAt: 1 });
    socket.emit("chatHistory", chatHistory);
  }

   // Handle request for chat history
   socket.on("requestChatHistory", async () => {
    const chatHistory = await Chat.find().sort({ createdAt: 1 });
    socket.emit("chatHistory", chatHistory);
  });

  // 📢 Handle All Messages (Broadcast to Everyone)
  socket.on("sendMessage", async ({ sender, message, receiver = null }) => {
    console.log(chalk.cyan(`
===========================================
📩 ${chalk.bold("New Message")}
-------------------------------------------
🔹 Sender  : ${sender}
🔹 Message : ${message}
===========================================
`));

    // Save the message to the database
    const newMessage = await Chat.create({ sender, message, receiver, createdAt: new Date() });

    // Broadcast the message to everyone
    io.emit("receiveMessage", newMessage);
  });

  // ❌ Handle Disconnect
  socket.on("disconnect", () => {
    console.log(chalk.red(`
===========================================
❌ ${chalk.bold(`${name} Disconnected`)}
-------------------------------------------
🔹 Name      : ${name}
🔹 User ID   : ${userId}
🔹 Socket ID : ${socket.id}
===========================================
`));



// Remove user from online users list
const index = onlineUsers.findIndex((u) => u.id === socket.id);
if (index !== -1) {
  onlineUsers.splice(index, 1); // Remove the user
  io.emit("onlineUsers", onlineUsers); // Emit updated online users list to all clients
}
  });
});

// Automatically switch ports
const PORT = process.env.PORT || 6000;
server
  .listen(PORT, () => {
    console.log(chalk.cyan(`
===========================================
🚀 ${chalk.bold("Server Running on Port")} ${PORT}
===========================================
`));
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(chalk.yellow(`
===========================================
⚠️ Port ${PORT} is already in use! Switching to 6000
===========================================
`));
      server.listen(6000, () => console.log(chalk.cyan(`🚀 Server running on port 6000`)));
    } else {
      console.error(err);
    }
  });






