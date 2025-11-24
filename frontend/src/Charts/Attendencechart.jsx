import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import EmpContext from "../context/EmployeeContext";
import { useContext } from "react";
import axios from "axios";

function Attendencechart() {
  const { emp } = useContext(EmpContext);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [attndenceData, setAttendenceData] = useState();

  useEffect(() => {
    const fetchAttendence = async () => {
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
          "http://localhost:3000/api/employee/countPastSixMonthsAttendance",
          body,
          config
        );
        setAttendenceData(result.data.attendanceByMonth);
        setLoading(false); // Data loading completed
      } catch (err) {
        console.error(err);
        setLoading(false); // Handle error and stop loading
      }
    };

    if (emp && emp._id) {
      fetchAttendence(); // Call the function if emp is defined
    } else {
      // Retry fetching attendance after a short delay if emp is undefined
      const timer = setTimeout(fetchAttendence,  100); // Adjust delay as needed
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [emp]);

  if (loading) {
    return <p>Loading...</p>; // Display a loading state while fetching data
  }
  const monthsArray = Object.keys(attndenceData);
  const attendanceArray = Object.values(attndenceData);

  const allZero = attendanceArray.every((value) => value === 0);
  if (allZero)
    return (
      <div className="flex items-center justify-center h-96 w-fit text-gray-600 text-2xl p-10 mx-3 ">
        "attendance Data not enough for graph."
      </div>
    );
  // console.log(allZero)
  return (
    <BarChart
      sx={{ padding: "20px" }}
      xAxis={[
        {
          scaleType: "band",
          data: monthsArray.reverse(),
          categoryGapRatio: 0.3,
          label: "Months",
        },
      ]}
      series={[
        {
          data: attendanceArray.reverse(), // Replace with dynamic data when available
          color: "#4A4AEF",
          label: "Attendance",
        },
      ]}
      width={600}
      height={400}
    />
  );
}

export default Attendencechart;
