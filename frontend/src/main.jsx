import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Landingpage from "../src/components/Landingpage.jsx";
import EmpologIn from "../src/components/employee/EmpologIn.jsx";
import LeaveApp from "../src/components/employee/LeaveApp.jsx";
import Dashboard from "../src/components/employee/Dashboard.jsx";
import Salaryslip from "../src/components/employee/Salaryslip.jsx";
import LeaveStatus from "../src/components/employee/LeaveStatus.jsx";
import Adminlogin from "../src/components/admin/Adminlogin.jsx";
import Emp from "./components/employee/Emp.jsx";
import Admin from "./components/admin/Admin.jsx";
import Adashboard from "./components/admin/ADashboard.jsx";
import AddEmployee from "./components/admin/AddEmployee.jsx";
import Manageleave from "./components/admin/Manageleave.jsx";
import EmpProfile from "./components/admin/EmpProfile.jsx";
import EditEmp from "./components/admin/EditEmp.jsx";
import GenereteSalary from "./components/admin/GenereteSalary.jsx";
import AboutUs from "./components/AboutUs.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landingpage />,
  },
  {
    path: "AboutUs",
    element: <AboutUs />,
  },
  {
    path: "empLogin",
    element: <EmpologIn />,
  },
  {
    path: "adminLogin",
    element: <Adminlogin />,
  },

  {
    path: "admin",
    element: <Admin />,
    children: [
      {
        path: "dashboard",
        element: <Adashboard />,
        children: [
          {
            path: "empprofile",
            element: <EmpProfile />,
          },
          {
            path: "editEmp",
            element: <EditEmp />,
          },
          {
            path: "genaratesalary",
            element: <GenereteSalary />,
          },
        ],
      },
      {
        path: "addEmployee",
        element: <AddEmployee />,
      },
      {
        path: "manageLeave",
        element: <Manageleave />,
      },
    ],
  },
  {
    path: "emp",
    element: <Emp />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "leave",
        element: <LeaveApp />,
      },
      {
        path: "leavestatus",
        element: <LeaveStatus />,
      },
      {
        path: "salaryslip",
        element: <Salaryslip />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-center"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light
"
    />
  </React.StrictMode>
);
