// import React, { useEffect } from "react";
// import AdminSideNavbar from "../../Components/AdminSideNavbar";
// import AdminUpperNavbar from "../../Components/AdminUpperNavbar";
// import { Outlet } from "react-router-dom";
// import axios from "axios";

// const AdminDashboard = () => {

//   const response = axios.get("http://localhost:5000/admin");
//   console.log(response);



//   return (
//     <div className="flex bg-[#E3EDF9]">
//       <AdminSideNavbar />

//       <div className="flex-col flex-1">
//         <AdminUpperNavbar/>

//         {/* MainContent  */}
//         <div className="p-2">
//           <Outlet /> 
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




import React, { useEffect } from "react";
import AdminSideNavbar from "../../Components/AdminSideNavbar";
import AdminUpperNavbar from "../../Components/AdminUpperNavbar";
import { Outlet } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {


  return (
    <div className="flex bg-[#E3EDF9]">
      <AdminSideNavbar />
      <div className="flex-col flex-1">
        <AdminUpperNavbar />
        {/* MainContent  */}
        <div className="p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

