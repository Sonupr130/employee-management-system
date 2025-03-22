import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../Layouts/UserLayout";
import Userdashborad from "../Views/User/Userdashborad";
import PayslipSection from "../Views/User/PayslipSection";
import AboutPage from "../Views/User/Aboutpage";
import TakeAppraisal from "../Views/User/TakeAppraisal";
import LeaveDashboard from "../Views/User/ApplyforLeave";
import AnnualLeave from "../Views/User/AnnualLeave";
import Sickleave from "../Views/User/Sickleave";
import Updateprofile from "../Views/User/Updating";
import NotFound from "../Components/NotFound";
import ForgotPassword from "../Views/User/ForgotPassword";
import ResetPassword from "../Views/User/ResetPassword";
import ProtectedRoute from "../Components/ProtectedRoute";


const UserRoutes = () => {
  return (
    <Routes>
      {/* PROTECTED ROUTE FOR USERS */}
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="dashboard" element={<UserLayout />}>
          <Route index element={<Userdashborad />} />
          <Route path="payroll" element={<PayslipSection />} />
          <Route path="comapny" element={<AboutPage />} />
          <Route path="take-appraisal" element={<TakeAppraisal />} />
          <Route path="leaveapply" element={<LeaveDashboard />} />
          <Route path="annualleave" element={<AnnualLeave />} />
          <Route path="sickleave" element={<Sickleave />} />
          <Route path="update-profile" element={<Updateprofile />} />
        </Route>
      </Route>

      {/* Fallback for unknown routes and public routes */}
      <Route path="*" element={<NotFound />} />
      
    </Routes>
  );
};

export default UserRoutes;
