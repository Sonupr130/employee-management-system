import { io } from "socket.io-client";


let socket = null;


export const connectSocket = (userId, name, role) => {
    if (!socket) {
        socket = io(import.meta.env.VITE_API_URL || "http://localhost:6000", {
            transports: ["websocket", "polling"],
            auth: { 
                userId, 
                name, 
                role 
            },  // ✅ Pass userId, name, role inside auth
        });

        socket.on("connect", () => console.log("✅ Connected to Socket:", socket.id));
        socket.on("receiveMessage", (data) => console.log("📩 New Message:", data));
    }
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        console.log("❌ Socket Disconnected");
        socket = null;
    }
};



export const getSocket = (userId, name, role) => {
    if (!socket) {
        socket = io(import.meta.env.VITE_API_URL || "http://localhost:6000", {
            auth: {
                userId: userId || "Not Found",
                name: name || "Not Found",
                role: role || "Not Found",
            },
        });
    }
    return socket;
};
