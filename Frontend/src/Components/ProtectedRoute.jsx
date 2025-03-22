import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found! Redirecting to login...");
    window.location.href = "/";
    return null; // Prevents rendering
  }

  try {
    const decoded = jwtDecode(token);

    // Token Expiry Check
    if (decoded.exp < Date.now() / 1000) {
      console.log("Token expired! Redirecting to login...");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/";
      return null;
    }

    // Role-based access control
    if (!allowedRoles.includes(decoded.role)) {
      console.log("Unauthorized access! Redirecting...");
      window.location.href = "/";
      return null;
    }

    return <Outlet />;
  } catch (error) {
    console.log("Invalid token! Redirecting to login...");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
    return null;
  }
};

export default ProtectedRoute;






