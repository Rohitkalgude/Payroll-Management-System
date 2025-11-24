import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { EmpProvider } from "../../context/EmployeeContext";

function Emp() {
  return (
    <div className="flex  font-Inter">
      <EmpProvider>
        <Sidebar />
        <div className="p-7 pl-72 w-full min-h-screen ">
          <Outlet />
        </div>
      </EmpProvider>
    </div>
  );
}

export default Emp;
