import React, { useState } from "react";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import EmpContext from "../../context/EmployeeContext";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function LeaveApp() {
  const { emp } = useContext(EmpContext);

  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }

  const [inputVal, setInputVal] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });
  const navigate = useNavigate();

  const handleData = (e) => {
    const { name, value } = e.target;
    setInputVal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the dates before sending
    const formattedData = {
      startDate: formatDate(inputVal.startDate),
      endDate: formatDate(inputVal.endDate),
      reason: inputVal.reason,
    };

    try {
      const token = localStorage.getItem("empToken");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,

        },
      };

      const body = {
        empId: emp._id,
        startDate: formattedData.startDate,
        endDate: formattedData.endDate,
        reason: formattedData.reason,
      };

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/applyleave`,
        body,
        config
      );

      toast.success(result.data.message);

      navigate("/emp/dashboard");
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <div className="flex items-center h-full justify-center">
      <div className="px-10 pt-14 pb-20 border-2 shadow-shadowStyle rounded-2xl bg-divBg">
        <div className="flex items-center justify-center">
          <FaBuildingCircleArrowRight className="text-5xl" />
          <h1 className="text-3xl pl-3">Leave Application</h1>
        </div>
        <div className="mt-8">
          <form action="" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                placeholder="Enter start date"
                className="w-full border-2 outline-none border-blue-800 rounded-md p-3 mt-1 bg-transparent"
                name="startDate"
                value={inputVal.startDate}
                onChange={handleData}
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                placeholder="Enter end date"
                className="w-full border-2 outline-none border-blue-800 rounded-md p-3 mt-1 bg-transparent"
                name="endDate"
                value={inputVal.endDate}
                onChange={handleData}
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="reason">Leave Reason:</label>
              <input
                type="text"
                placeholder="Enter reason for leave"
                className="w-full border-2 outline-none border-blue-800 rounded-md p-3 mt-1 bg-transparent"
                name="reason"
                value={inputVal.reason}
                onChange={handleData}
                required
              />
            </div>
            <div className="text-white flex justify-center items-center mt-10">
              <button
                className="bg-btnclr py-2 px-10 m-2 rounded-lg hover:bg-blue-800 text-xl"
                type="submit"
              >
                Apply
              </button>
              <button
                className="bg-btnclr py-2 px-10 m-2 rounded-lg hover:bg-blue-800 text-xl"
                type="reset"
                onClick={() => setInputVal(data)}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LeaveApp;
