import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Modal from "./Modal";
import EmployeeContext from "../../context/SelectedEmployee";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Adashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false); // To check if the pop-up modal is open or not
  const [selectedEmployee, setSelectedEmployee] = useState(); // To store the selected employee's data
  const [search, setSearch] = useState(""); // Initialize with an empty string
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const hendleDelete = async (employee) => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/employee/deleteEmployeeByEmail`,
        {
          data: { email: employee.email }, // Axios requires the request body to be sent in the `data` property for DELETE requests
          ...config,
        }
      );
      navigate("/admin/dashboard");
      handleCloseModal();
      toast.success(employee.name + " deleted succesfully");
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const handleOpenModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
    localStorage.setItem("modalOpen", true);
    localStorage.setItem("selectedEmployee", JSON.stringify(employee));
    navigate("empprofile");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    localStorage.setItem("modalOpen", false);
    localStorage.removeItem("selectedEmployee");
    navigate("/admin/dashboard");
  };

  const handleSalary = (employee) => {
    // console.log(employee)
    navigate("genaratesalary"); // Absolute path
  };

  const handleEdit = (employee) => {
    // console.log(employee)
    navigate("editEmp"); // Absolute path
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/employee/getAllEmployees`,
          config
        );

        setEmployees(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployees();

    const modalOpen = localStorage.getItem("modalOpen") === "true";
    const storedEmployee = JSON.parse(localStorage.getItem("selectedEmployee"));

    if (modalOpen && storedEmployee) {
      setSelectedEmployee(storedEmployee);
      setIsModalOpen(true);
      navigate("empprofile");
    }
  }, [navigate, isModalOpen]);

  return (
    <>
      <div className="bg-sideBgClr p-5">
        <div className="bg-sideBgClr py-2 mt-2 mb-5">
          <form className="max-w-3xl mx-auto" onSubmit={handleSearchSubmit}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Search Employee..."
                value={search}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="text-end text-gray-600">
          total emloyees : {employees.length}
        </div>
        <div className="relative overflow-x-auto shadow-md bg-divBg sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-auto">
            <thead className="text-md text-gray-700 uppercase bg-manual">
              <tr>
                <th scope="col" className="px-6 py-4 max-w-[200px]">
                  Employee Name
                </th>
                <th scope="col" className="px-6 py-4 max-w-[200px]">
                  Email
                </th>
                <th scope="col" className="px-6 py-4 max-w-[150px]">
                  Job Role
                </th>
                <th scope="col" className="px-6 py-4 max-w-[150px]">
                  Base Salary
                </th>
                <th scope="col" className="px-6 py-4">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {search ? (
                employees.filter(
                  (item) =>
                    item.name.includes(search) || item.email.includes(search)
                ).length > 0 ? (
                  employees
                    .filter(
                      (item) =>
                        item.name.includes(search) ||
                        item.email.includes(search)
                    )
                    .map((item, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.name}
                        </th>
                        <td className="px-6 py-4 lowercase">{item.email}</td>
                        <td className="px-6 py-4">{item.jobRole}</td>
                        <td className="px-6 py-4">{item.salary}</td>
                        <td className="px-6 py-4 text-right">
                          <span
                            onClick={() => handleOpenModal(item)}
                            className="cursor-pointer font-medium hover:underline"
                          >
                            <TiEdit className="text-2xl text-green-700" />
                          </span>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 text-2xl py-10 text-center text-gray-500"
                    >
                      No employees found
                    </td>
                  </tr>
                )
              ) : (
                employees.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4 lowercase">{item.email}</td>
                    <td className="px-6 py-4">{item.jobRole}</td>
                    <td className="px-6 py-4">{item.salary}</td>
                    <td className="px-6 py-4 text-right">
                      <span
                        onClick={() => handleOpenModal(item)}
                        className="cursor-pointer font-medium hover:underline"
                      >
                        <TiEdit className="text-2xl text-green-700" />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <EmployeeContext.Provider value={{ selectedEmployee, handleCloseModal }}>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <Outlet />
          <div className="flex items-center justify-center gap-2 mt-2">
            <button
              className="bg-btnclr font-Inter font-semibold p-3 rounded-lg m-1 hover:bg-blue-800 text-white "
              onClick={() => handleSalary(selectedEmployee)}
            >
              Generate Salary
            </button>
            <button
              className="bg-btnclr font-Inter font-semibold p-3 rounded-lg m-1 hover:bg-blue-800 text-white "
              onClick={() => handleEdit(selectedEmployee)}
            >
              Edit Emp
            </button>
            <button
              className="bg-red-600 font-Inter font-semibold p-3 rounded-lg m-1 hover:bg-red-900 text-white "
              onClick={() => hendleDelete(selectedEmployee)}
            >
              Delete Emp
            </button>
          </div>
        </Modal>
      </EmployeeContext.Provider>
    </>
  );
}

export default Adashboard;
