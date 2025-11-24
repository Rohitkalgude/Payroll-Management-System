import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { useEffect } from "react";
import axios from "axios";
import EmpContext from "../../context/EmployeeContext";
import { useContext } from "react";

function LeaveStatus() {
  const { emp } = useContext(EmpContext);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      if (!emp || !emp._id) {
        // If emp data is not available, skip the API call
        return;
      }

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
        };

        const result = await axios.post(
          "http://localhost:3000/api/employee/getAllLeavesByEmployee",
          body,
          config
        );
        setLeaves(result.data.leaves.reverse());
        console.log(result.data.leaves[0]);
        console.log("api call");
      } catch (err) {
        console.error(err);
      }
    };
    if (emp && emp._id) {
      fetchLeaves();
      // Call the function if emp is defined
    } else {
      // Retry fetching attendance after a short delay if emp is undefined
      const timer = setTimeout(fetchLeaves, 1000); // Adjust delay as needed
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [emp]);

  return (
    <div className="">
      <div className="relative overflow-x-auto shadow-md bg-divBg  sm:rounded-lg ">
        <table className="w-full  text-xs text-left rtl:text-right text-gray-500 table-auto  ">
          <thead className="text-gray-700 uppercase bg-manual  ">
            <tr>
              <th scope="col" className="px-6 py-4  max-w-[200px]">
                Name
              </th>
              <th scope="col" className="px-6 py-4 max-w-[200px]">
                Email
              </th>
              <th scope="col" className="px-6 py-4 max-w-[150px]">
                Reason
              </th>
              <th scope="col" className="px-6 py-4 max-w-[150px]">
                Start Date
              </th>
              <th scope="col" className="px-6 py-4 max-w-[150px]">
                End Date
              </th>
              <th scope="col" className="px-6 py-4 max-w-[150px]">
                Status
              </th>
              <th scope="col" className="px-6 py-4 max-w-[150px]">
                Admin Msg
              </th>
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <td
                colSpan="7"
                className="px-6 text-2xl w-full py-10  text-center text-gray-500"
              >
                No leaves found
              </td>
            ) : (
              leaves.map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="pl-6 py-4  ">
                    <GoDotFill
                      className={`inline mx-2 ${
                        item.status === "approved"
                          ? "text-green-400"
                          : item.status === "pending"
                          ? "text-orange-400"
                          : "text-red-600"
                      }`}
                    />
                    {emp && emp.name}
                  </td>
                  <td className="px-6 py-4 lowercase ">{emp && emp.email}</td>
                  <td className="px-6 py-4">{item.reason}</td>
                  <td className="px-6 py-4">{item.startDate}</td>
                  <td className="px-6 py-4">{item.endDate}</td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      item.status === "approved"
                        ? "text-green-400"
                        : item.status === "pending"
                        ? "text-orange-400"
                        : "text-red-600"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="px-6 py-4">
                    {item.adminMsg ? item.adminMsg : "....."}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveStatus;
