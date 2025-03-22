import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import NotFound from "./Components/NotFound";
import Login from "./Components/Login";
import JobDetailPage from "./Views/Admin/pages/JobDetailPage";
import JobApplicationForm from "./Views/Admin/pages/JobApplicationForm";
import ForgotPassword from "./Views/User/ForgotPassword";
import ResetPassword from "./Views/User/ResetPassword";

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/job/:jobId" element={<JobDetailPage />} />
        {/* <Route path="/apply/:jobId" element={<JobApplicationForm />} /> */}
        <Route path="/user/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/user/reset-password/:resetPasswordToken"
                element={<ResetPassword />}
              />
      </Routes>
    </>
  );
}

export default App;
