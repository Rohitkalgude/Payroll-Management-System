import { useEmployeeContext } from "../../context/SelectedEmployee";
import EmpProfile from "./EmpProfile";
import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function GenereteSalary() {
  const { selectedEmployee, handleCloseModal } = useEmployeeContext();
  const [showSalaryData, setshowSalaryData] = useState(false);
  const [salaryData, setSalaryData] = useState(null);

  const [monthYear, setMonthYear] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value; // value is in the format "YYYY-MM"
    const [year, month] = value.split("-");
    setMonthYear(`${month}/${year}`);
  };
  console.log(monthYear);
  console.log(selectedEmployee._id);

  const hendleGenarateSalary = async (employee) => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {
        empId: employee._id,
        monthOfSalaryIssue: monthYear,
      };

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/generateSalarySlip`,
        body,
        config
      );

      toast.success(result.data.message);
      setSalaryData(result.data.salarySlip);
      setshowSalaryData(true);
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };
  console.log(salaryData);

  return (
    <div>
      <EmpProfile />
      <div className="">
        <label htmlFor="monthYear">Select Month and Year: </label>
        <input
          type="month"
          className="w-full border-2 outline-none border-blue-800 rounded-md p-3 mt-1 bg-transparent "
          id="monthYear"
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center justify-center  border-b-2 ">
        <button
          className="bg-green-700 font-Inter font-semibold p-3 mb-6 mt-5 rounded-lg m-1 hover:bg-green-800 text-white "
          onClick={() => hendleGenarateSalary(selectedEmployee)}
        >
          Genarte Slip
        </button>
      </div>

      {showSalaryData && (
        <>
          <div className="mt-4">employee salary :</div>
          <div className="pb-5  ml-4   flex items-center justify-start gap-4 font-semibold font-Inter ">
            <div>
              <div>present day : {salaryData.presentDays}</div>
              <div>absent day : {salaryData.absentDays}</div>
            </div>
            <div>
              <div>
                base salary :{" "}
                <span>
                  <FaRupeeSign className="inline text-sm" />
                </span>
                {salaryData.baseSalary}
              </div>
              <div>
                in hand salary :
                <span>
                  <FaRupeeSign className="inline text-sm" />
                </span>
                {parseInt(salaryData.inHandSalary)}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default GenereteSalary;
