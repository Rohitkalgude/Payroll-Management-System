import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import EmpContext from "../context/EmployeeContext";
import { useContext } from "react";
import axios from "axios";

export default function BasicLineChart() {
  const { emp } = useContext(EmpContext);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [salryData, setSalaryData] = useState();

  useEffect(() => {
    const fetchSalary = async () => {
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
          "http://localhost:3000/api/employee/calculatePastSixMonthsInHandSalary",
          body,
          config
        );
        setSalaryData(result.data.inHandSalaryByMonth);
        setLoading(false); // Data loading completed
      } catch (err) {
        console.error(err);
        setLoading(false); // Handle error and stop loading
      }
    };

    if (emp && emp._id) {
      fetchSalary(); // Call the function if emp is defined
    } else {
      // Retry fetching attendance after a short delay if emp is undefined
      const timer = setTimeout(fetchSalary, 100); // Adjust delay as needed
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [emp]);

  if (loading) {
    return <p>Loading...</p>; // Display a loading state while fetching data
  }
  const monthsArray = Object.keys(salryData);
  const salaryArray = Object.values(salryData);

  const allZero = salaryArray.every((value) => parseInt(value) === 0);

  if (allZero)
    return (
      <div className="flex items-center justify-center h-96 w-fit text-gray-600 text-2xl p-10 ">
        "salary Data not enough for graph."
      </div>
    );
  return (
    <LineChart
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
          data: salaryArray.reverse(),
          color: "#4A4AEF",
          label: "net salary",
        },
      ]}
      width={600}
      height={400}
    />
  );
}
