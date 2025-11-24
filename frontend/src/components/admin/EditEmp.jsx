import React from "react";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEmployeeContext } from "../../context/SelectedEmployee";
import axios from "axios";
import { toast } from "react-toastify";


function EditEmp() {
  const { selectedEmployee ,handleCloseModal } = useEmployeeContext();

  const [inputVal, setInputValue] = useState(selectedEmployee);

  const hendleData = (e) => {
    switch (e.target.name) {
      case "email":
        setInputValue({ ...inputVal, email: e.target.value });
        break;
      case "jobRole":
        setInputValue({ ...inputVal, jobRole: e.target.value });
        break;

      case "salary":
        setInputValue({ ...inputVal, salary: e.target.value });
        break;
    }
  };
  // console.log(inputVal);

  const navigate = useNavigate();
  const hendlesubmit = async (e) => {
    e.preventDefault();


    try {
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {
        employeeId: selectedEmployee._id,
        ...inputVal,
      };
  
      const result = await axios.patch(
        "http://localhost:3000/api/employee/editEmployee",
        body,
        config
      );

      toast.success(result.data.message);
      handleCloseModal()
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };
  return (
    <div className="flex items-center justify-center w-full border-b-2 border-black">
      <div className="px-20 pt-10 pb-6 ">
        <div className=" p-8 gap-3 rounded-md bg-sideBgClr shadow-shadowStyle  mb-8 flex items-center justify-center">
          <div className="flex items-center justify-center">
            <VscAccount className="text-5xl " />
          </div>
          <h1 className="text-3xl ">edit employee</h1>
        </div>

        <form action="" onSubmit={hendlesubmit}>
          <div className="mt-4">
            <label htmlFor="email" className="">
              email :
            </label>
            <input
              type="email"
              className="w-full border-2 outline-none border-blue-800 rounded-md p-3 mt-1 bg-transparent"
              placeholder="Enter email "
              name="email"
              value={inputVal.email}
              onChange={hendleData}
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="jobe-role" className="">
              job role :
            </label>
            <input
              type="text"
              className="w-full border-2 outline-none border-blue-800 rounded-md p-3 mt-1 bg-transparent"
              placeholder="Enter role"
              name="jobRole"
              value={inputVal.jobRole}
              onChange={hendleData}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="salary" className="">
              salary :
            </label>
            <input
              type="number"
              className=" custom-number-input w-full border-2 outline-none border-blue-800 rounded-md p-3 mt-1 bg-transparent "
              placeholder="Enter salary"
              name="salary"
              value={inputVal.salary}
              onChange={hendleData}
              required
            />
          </div>

          <div className="flex justify-center mt-6 ">
            <button
              type="submit"
              className="bg-btnclr py-2 px-4 text-xl font-semibold rounded-lg mx-2 hover:bg-blue-800 border-2 text-white"
            >
              Save
            </button>{" "}
            <button
              type="reset"
              className="bg-btnclr py-2 px-4 text-xl font-semibold rounded-lg mx-2 hover:bg-blue-800 border-2 text-white "
              onClick={() => setInputValue(selectedEmployee)}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmp;
