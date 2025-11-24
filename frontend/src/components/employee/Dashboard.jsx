import React from "react";
import Dashbordcard from "./Dashbordcard";
import Salarychart from "../../Charts/Salarychart";
import Attendencechart from "../../Charts/Attendencechart";
import { IndianRupee } from "lucide-react";
import { CircleDollarSign } from "lucide-react";
import { BsPersonRolodex } from "react-icons/bs";
import { useContext } from "react";
import EmpContext from "../../context/EmployeeContext";
import axios from "axios";
import { toast } from "react-toastify";

function dashboard() {
  const { emp } = useContext(EmpContext);

  const hendleClick = async () => {
    const today = new Date();
    const curentDate = `${String(today.getDate()).padStart(2, "0")}/${String(
      today.getMonth() + 1
    ).padStart(2, "0")}/${today.getFullYear()}`;

    try {
      const token = localStorage.getItem("empToken");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {
        employeeId: emp._id,
        date: curentDate,
      };

      const result = await axios.post(
        "http://localhost:3000/api/employee/addattendance",
        body,
        config
      );
      toast.success(result.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
      // console.log(err)
    }
  };

  if (!emp) {
    return <div>Loading...</div>; // Or any fallback UI
  }
  return (
    <div className="">
      <div>
        <div>
          <h1 className="text-4xl">welcome {emp.name},</h1>
        </div>
      </div>

      <div className="flex justify-end">
        <div>
          <button
            className=" bg-green-600 hover:bg-green-700 text-white shadow-shadowStyle py-3 px-5 rounded-lg font-sans"
            onClick={hendleClick}
          >
            Add Attendance{" "}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-start">
        <div>
          <Attendencechart />
        </div>
        <div>
          <Salarychart />
        </div>
      </div>

      <div className="flex gap-5 p-5  items-center justify-center">
        <Dashbordcard
          value="job role"
          data={emp.jobRole}
          headicon={
            <BsPersonRolodex
              size={50}
              className="text-white bg-blue-700 p-3 rounded-md"
            />
          }
        />
        <Dashbordcard
          value="monthly payroll"
          data={emp.salary}
          icon={<IndianRupee size={20} className="inline" />}
          headicon={
            <CircleDollarSign
              size={50}
              className="text-white bg-blue-700 p-3 rounded-md"
            />
          }
        />
        <Dashbordcard
          value="total earnings"
          data={Math.round(emp.salaryPaid)}
          icon={<IndianRupee size={20} className="inline" />}
          headicon={
            <CircleDollarSign
              size={50}
              className="text-white bg-blue-700 p-3 rounded-md"
            />
          }
        />
      </div>
    </div>
  );
}

export default dashboard;
