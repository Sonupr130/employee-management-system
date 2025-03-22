import React from "react";
import Navbar from "./Usernavbar";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
       <div className="">
        <Outlet/>
       </div>
    </div>
  );
};

export default Dashboard;
