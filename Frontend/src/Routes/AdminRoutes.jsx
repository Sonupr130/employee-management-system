import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../Components/ProtectedRoute";
import AdminLayout from "../Layouts/AdminLayout";
import JobPanels from "../Views/Admin/pages/JobPanels";
import Candidates from "../Views/Admin/pages/Candidates";
import PayrollDashboard from "../Views/Admin/pages/PayrollDashboard";
import EmployeeManagement from "../Views/Admin/pages/EmployeeManagement";
import PerformanceManagement from "../Views/Admin/pages/PerformanceManagement";
import AdminJobManagement from "../Views/Admin/pages/AdminJobManagement";
import LeaveManagement from "../Views/Admin/pages/LeaveManagement";
import NotFound from "../Components/NotFound";
import UserRegister from "../Views/User/UserRegister";
import AdminChats from "../Views/Admin/pages/AdminChats";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        {/* PROTECTED ROUTE FOR USERS */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<JobPanels />} />
            <Route path="candidates" element={<Candidates />} />
            <Route path="payroll" element={<PayrollDashboard />} />
            <Route
              path="performance-management"
              element={<PerformanceManagement />}
            />
            <Route path="leave-management" element={<LeaveManagement />} />
            <Route
              path="employee-management"
              element={<EmployeeManagement />}
            />
            <Route path="jobportal" element={<AdminJobManagement />} />
            <Route path="add-employee" element={<UserRegister />} />
            <Route path="messages" element={<AdminChats />} />
          </Route>
        </Route>

        {/* Fallback for unknown routes */}
        <Route path="*" element={<NotFound />} />
        
        
      </Routes>
    </>
  );
};

export default AdminRoutes;


