import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Views/User/Usernavbar";

const UserLayout = () => {
  return (
    <div>
      <Navbar />
       <div className="container mx-auto">
        <Outlet/>
       </div>
    </div>
  ); 
};

export default UserLayout;
 