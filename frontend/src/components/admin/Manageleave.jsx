import React, { useState, useEffect } from "react";
import axios from "axios";

function Manageleave() {
  const [data, setData] = useState([]);

  function formatDate(dateStr) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const [day, month, year] = dateStr.split("/");
    return `${day}-${months[parseInt(month) - 1]}-${year}`;
  }

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Fetch both pending and all leaves
      const pendingResult = await axios.get(
        "http://localhost:3000/api/employee/getAllPendingLeaves",
        config
      );
      const allResult = await axios.get(
        "http://localhost:3000/api/employee/getAllLeaves",
        config
      );

      // Combine pending and all leaves
      const combinedData = [
        ...pendingResult.data.pendingLeaves.reverse(),
        ...allResult.data.allLeaves.reverse(),
      ];

      setData(combinedData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdminMsg = (index, e) => {
    const updatedData = [...data];
    updatedData[index].adminMsg = e.target.value;
    setData(updatedData);
    console.log(e.target.value);
  };

  const handleApprove = async (index) => {
    const updatedData = [...data];
    const leaveToUpdate = updatedData[index];
    updatedData[index].status = "approved";
    setData(updatedData);

    try {
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {
        empId: leaveToUpdate.empId,
        leaveId: leaveToUpdate.leaveId,
        status: leaveToUpdate.status,
        adminMsg: leaveToUpdate.adminMsg,
      };
      await axios.patch(
        "http://localhost:3000/api/employee/updateLeaveRequest",
        body,
        config
      );

      // Refresh the leaves after update
      await fetchLeaves();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (index) => {
    const updatedData = [...data];
    const leaveToUpdate = updatedData[index];
    updatedData[index].status = "rejected";
    setData(updatedData);

    try {
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {
        empId: leaveToUpdate.empId,
        leaveId: leaveToUpdate.leaveId,
        status: leaveToUpdate.status,
        adminMsg: leaveToUpdate.adminMsg,
      };
      await axios.patch(
        "http://localhost:3000/api/employee/updateLeaveRequest",
        body,
        config
      );

      // Refresh the leaves after update
      await fetchLeaves();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const profileImg =
    "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg";

  return (
    <div className="bg-divBg rounded-lg shadow-shadowStyle flex justify-center flex-wrap p-5">
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <div
            key={index}
            className="border w-full rounded-lg my-3 mx-2 bg-sideBgClr "
          >
            <div className="flex items-center p-4">
              <div className="p-2 mr-2">
                <img
                  src={item.photo || profileImg}
                  alt="no image available"
                  className="aspect-auto rounded-lg min-h-10 max-h-10 "
                />
              </div>
              <div>
                <h1>{item.name}</h1>
                <h6 className="text-sm text-gray-500">{item.jobRole}</h6>
              </div>
            </div>
            <div className="border-t-2">
              <div className="border-b-2">
                <div className="p-5">
                  <div>
                    {formatDate(item.startDate)} --- {formatDate(item.endDate)}
                  </div>
                  <div>Leave days: {item.numberOfDays}</div>
                  <div>
                    <span>Status: </span>
                    <span
                      className={`inline mx-2 ${
                        item.status === "approved"
                          ? "text-green-400"
                          : item.status === "pending"
                          ? "text-orange-400"
                          : "text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="mt-4">
                    <span>Reason: </span>
                    <span>{item.reason}</span>
                  </div>
                </div>
              </div>
              {item.status === "pending" && (
                <div className="flex items-center m-5">
                  <div>
                    <label>Admin Message: </label>
                    <input
                      type="text"
                      className="border mx-2 p-2 border-black rounded-lg bg-gray-100"
                      placeholder="Enter Message..."
                      onChange={(e) => handleAdminMsg(index, e)}
                    />
                  </div>
                  <div>
                    <button
                      className="w-20 p-2 hover:bg-green-700 bg-green-600 rounded-lg m-2 text-white"
                      onClick={() => handleApprove(index)}
                    >
                      Approve
                    </button>
                  </div>
                  <div>
                    <button
                      className="w-20 px-4 py-2 hover:bg-red-800 bg-red-700 rounded-lg m-2 text-white"
                      onClick={() => handleReject(index)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No leave requests available</p>
      )}
    </div>
  );
}

export default Manageleave;
