import React from "react";
import AdminSideBar from "../admin/AdminSideBar.jsx";
import { Outlet } from "react-router-dom";
import { AdminProvider } from "../../context/AdminContext.jsx";
function Admin() {
  return (
    <div className="flex ">
      <AdminProvider>
        <AdminSideBar />
        <div className="p-7 pl-80 w-full min-h-screen ">
          <Outlet />
        </div>
      </AdminProvider>
    </div>
  );
}

export default Admin;
