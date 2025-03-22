// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import handshake from "../assets/handshake.png";
// import logo from "../assets/kris logo 3.svg";


// const Login = ({ userType }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

 
//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     try {
//       // ✅ Pehle `email` bhejke check karo ki yeh Admin hai ya User
//       const checkResponse = await axios.post("http://localhost:5000/check-role", { email });
  
//       const { role } = checkResponse.data; // role "admin" ya "user" milega
//       console.log(role); //
  
//       if (!role) {
//         setError("Email not found in the system.");
//         return;
//       }
  
//       // ✅ Jo role mila, uske hisaab se API hit karo
//       const endpoint =
//         role === "admin"
//           ? "http://localhost:5000/admin/login"
//           : "http://localhost:5000/user/login";
  
//       const loginResponse = await axios.post(endpoint, { email, password });
  
//       console.log("Login successful:", loginResponse.data);
      
//       const { token, user } = loginResponse.data;
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("role", role);
  
//       // ✅ Redirect based on role
//       navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard", { replace: true });
  
//     } catch (error) {
//       console.error("Login error:", error.response?.data || error.message);
//       setError(error.response?.data?.message || "Invalid credentials.");
//     }
//   };
  
  
  
  
  
  
//   return (
//     <div>
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">
//         <div className="w-1/2 p-8">
//           <h2 className="text-xl font-bold text-blue-800 mb-4">
//             <img src={logo} alt="KRIS Logo" />
//           </h2>
//           <p className="mb-8 text-gray-600">Login to your account.</p>
//           <form onSubmit={handleLogin}>
//             {error && <p className="text-red-500 mb-4">{error}</p>}
//             <div className="mb-6">
//               <label className="block text-gray-700 text-sm font-bold mb-2">E-mail Address</label>
//               <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Enter your email" />
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
//               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Enter your password" />
//             </div>
//             <div className="flex items-center justify-between mb-6">
//               <label className="flex items-center">
//                 <input type="checkbox" className="form-checkbox" />
//                 <span className="ml-2 text-gray-600">Remember me</span>
//               </label>
//               <Link to="/user/forgot-password" className="text-blue-500 hover:underline text-sm font-semibold">
//                 Forgot Password?
//               </Link>
//             </div>
//             <button type="submit" className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
//               Sign In
//             </button>
//           </form>
//           {/* <p className="mt-6 text-gray-600 text-center">
//             Don’t have an account yet? <Link to={`/${userType}/register`} className="text-blue-500 font-bold hover:underline">Join KRIS today.</Link>
//           </p> */}
//         </div>
//         <div className="w-1/2 relative bg-blue-900 text-white p-8 flex items-center justify-center">
//           <div className="absolute inset-0 bg-opacity-70">
//             <img className="h-full" src={handshake} alt="Handshake" />
//           </div>
//           <div className="relative z-10">
//             <h3 className="text-3xl font-bold">Manage all <span className="text-yellow-400">HR Operations</span> from the comfort of your home.</h3>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Login;















import React, { useState, useEffect } from "react";
import { io } from "socket.io-client"; // ✅ Import Socket.io
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import handshake from "../assets/handshake.png";
import logo from "../assets/kris logo 3.svg";

const socket = io("http://localhost:5000"); // ✅ Connect to the backend server

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`✅ Connected to socket with ID: ${socket.id}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from socket server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const checkResponse = await axios.post(
        "http://localhost:5000/check-role",
        { email }
      );
      const { role } = checkResponse.data;

      if (!role) {
        setError("Email not found in the system.");
        setLoading(false);
        return;
      }

      const endpoint =
        role === "admin"
          ? "http://localhost:5000/admin/login"
          : "http://localhost:5000/user/login";

      const loginResponse = await axios.post(endpoint, { email, password });
      const { token, user } = loginResponse.data;
      console.log("YEH USER", user);

      if (!user || !(user._id || user.id)) {
        console.error("🚨 User ID not found in response:", user);
        setError("User data missing.");
        setLoading(false);
        return;
      }

      // Use _id if available, otherwise fallback to id
      const userId = user._id || user.id;
      login({ token, user, role });

      // ✅ Emit user login event to the socket server
      socket.emit("user_logged_in", { userId, role });

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", role);

      navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">
        <div className="w-1/2 p-8">
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            <img src={logo} alt="KRIS Logo" />
          </h2>
          <p className="mb-8 text-gray-600">Login to your account.</p>

          <form onSubmit={handleLogin}>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                E-mail Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <Link
                to="/user/forgot-password"
                className="text-blue-500 hover:underline text-sm font-semibold"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>

        <div className="w-1/2 relative bg-blue-900 text-white p-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-opacity-70">
            <img className="h-full" src={handshake} alt="Handshake" />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold">
              Manage all <span className="text-yellow-400">HR Operations</span>{" "}
              from the comfort of your home.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;















