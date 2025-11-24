import "./App.css";
// import Landingpage from "./components/Landingpage";
// import {
//   createBrowserRouter,
//   Route,
//   RouterProvider,
//   Routes,
// } from "react-router-dom";
// import Adminlogin from "./components/admin/Adminlogin";
// import EmpologIn from "./components/employee/EmpologIn";
// import dashboard from "./components/employee/dashboard";
// import Adashboard from "./components/admin/Adashboard";
// import Personalinfo from "./components/employee/Personalinfo";
// import LeaveApp from "./components/employee/LeaveApp";
// import LeaveStatus from "./components/employee/LeaveStatus";
// import Salaryslip from "./components/employee/Salaryslip";
// import AddEmployee from "./components/admin/AddEmployee";
// import AMyprofile from "./components/admin/AMyprofile";
// import AllEmployee from "./components/admin/AllEmployee";
// import Manageleave from "./components/admin/Manageleave";
// import SalaryReport from "./components/admin/SalaryReport";
// import Emp from "./components/employee/Emp";

// export default function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Landingpage />,
//     },
//     {
//       path: "employee",
//       element: <EmpologIn />,
//     },
//     {
//       path: "employee/emp",
//       element: <Emp />,
//     },
//     {
//       path: "employee/emp/dashboard",
//       element: <dashboard />,
//     },
//     {
//       path: "employee/leave",
//       element: <LeaveApp />,
//     },
//     {
//       path: "employee/leavestatus",
//       element: <LeaveStatus />,
//     },
//     {
//       path: "employee/salaryslip",
//       element: <Salaryslip />,
//     },
//     {
//       path: "admin",
//       element: <Adminlogin />,
//     },
//     {
//       path: "admin/dashboard",
//       element: <Adashboard />,
//     },
//     {
//       path: "admin/dashboard/myprofile",
//       element: <AMyprofile />,
//     },
//     {
//       path: "admin/dashboard/addemployee",
//       element: <AddEmployee />,
//     },
//     {
//       path: "admin/dashboard",
//       element: <AllEmployee />,
//     },
//     {
//       path: "admin/dashboard/manageleave",
//       element: <Manageleave />,
//     },
//     {
//       path: "admin/dashboard/salaryreport",
//       element: <SalaryReport />,
//     },
//   ]);

//   return (
//     <>
//       {/* <Routes>
//         <Route path="/" element={<Landingpage />} />
//         <Route path="employee" element={<EmpologIn />} />

//         <Route path="/employee/emp" element={<Emp />}>
//           <Route path="/employee/dashboard" element={<Personalinfo />} />
//           <Route path="/employee/leave" element={<LeaveApp />} />
//           <Route path="/employee/leavestatus" element={<LeaveStatus />} />
//           <Route path="/employee/salaryslip" element={<Salaryslip />} />
//         </Route>

//         <Route path="admin" element={<Adminlogin />} />
//         <Route path="admin/dashboard" element={<Adashboard />}>
//           <Route path="/admin/dashboard/myprofile" element={<AMyprofile />} />
//           <Route path="/admin/dashboard/addemployee" element={<AddEmployee />} />
//           <Route path="/admin/dashboard" element={<AllEmployee />} />
//           <Route path="/admin/dashboard/manageleave" element={<Manageleave />} />
//           <Route
//             path="/admin/dashboard/salaryreport"
//             element={<SalaryReport />}
//           />
//         </Route>
//       </Routes> */}
//       <RouterProvider router={router} />
//     </>
//   );
// }

// // import "./App.css";
// // import Landingpage from "./components/Landingpage";
// // import { createBrowserRouter, RouterProvider } from "react-router-dom";
// // import Adminlogin from "./components/admin/Adminlogin";
// // import EmpologIn from "./components/employee/EmpologIn";
// // import dashboard from "./components/employee/dashboard";
// // import Adashboard from "./components/admin/Adashboard";
// // import LeaveApp from "./components/employee/LeaveApp";
// // import LeaveStatus from "./components/employee/LeaveStatus";
// // import Salaryslip from "./components/employee/Salaryslip";
// // import AddEmployee from "./components/admin/AddEmployee";
// // import AMyprofile from "./components/admin/AMyprofile";
// // import AllEmployee from "./components/admin/AllEmployee";
// // import Manageleave from "./components/admin/Manageleave";
// // import SalaryReport from "./components/admin/SalaryReport";
// // import Emp from "./components/employee/Emp";

// // export default function App() {
// //   const router = createBrowserRouter([
// //     {
// //       path: "/",
// //       element: <Landingpage />,
// //       children: [
// //         {
// //           path: "employee",
// //           element: <EmpologIn />,
// //           children: [
// //             {
// //               path: "emp",
// //               element: <Emp />,
// //               children: [
// //                 {
// //                   path: "dashboard",
// //                   element: <dashboard />,
// //                 },
// //                 {
// //                   path: "leave",
// //                   element: <LeaveApp />,
// //                 },
// //                 {
// //                   path: "leavestatus",
// //                   element: <LeaveStatus />,
// //                 },
// //                 {
// //                   path: "salaryslip",
// //                   element: <Salaryslip />,
// //                 },
// //               ],
// //             },
// //           ],
// //         },
// //         {
// //           path: "admin",
// //           element: <Adminlogin />,
// //           children: [
// //             {
// //               path: "dashboard",
// //               element: <Adashboard />,
// //               children: [
// //                 {
// //                   path: "myprofile",
// //                   element: <AMyprofile />,
// //                 },
// //                 {
// //                   path: "addemployee",
// //                   element: <AddEmployee />,
// //                 },
// //                 {
// //                   path: "",
// //                   element: <AllEmployee />,
// //                 },
// //                 {
// //                   path: "manageleave",
// //                   element: <Manageleave />,
// //                 },
// //                 {
// //                   path: "salaryreport",
// //                   element: <SalaryReport />,
// //                 },
// //               ],
// //             },
// //           ],
// //         },
// //       ],
// //     },
// //   ]);

// //   return (
// //     <RouterProvider router={router} />
// //   );
// // }
