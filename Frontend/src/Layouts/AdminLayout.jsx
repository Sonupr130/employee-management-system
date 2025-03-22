import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSideNavbar from "../Components/AdminSideNavbar";
import AdminUpperNavbar from "../Components/AdminUpperNavbar";
import { useAuth } from "../context/AuthContext";
import { connectSocket } from "../utils/socket";


const MainLayout = ({ children }) => {
  const { auth } = useAuth();
  const user = auth?.user;

  console.log("🧐 useAuth() returned user:", user); // ✅ Debugging user data

  useEffect(() => {
    if (user?.id && user?.firstName && user?.role) {
      connectSocket(user.id, `${user.firstName} ${user.lastName}`, user.role);
    }
  }, [user]);

  return <>{children}</>;
};

const AdminLayout = () => {
  return (
    <MainLayout>
      <div className="flex bg-[#E3EDF9]">
        <AdminSideNavbar />
        <div className="flex-col flex-1">
          <AdminUpperNavbar />
          {/* MainContent  */}
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminLayout;