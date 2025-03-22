import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext.jsx";
 // Correct import for the CSS

createRoot(document.getElementById("root")).render(
  <>
   {/* <StrictMode> */}
   <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </AuthProvider>
    {/* </StrictMode> */}
  </>
);