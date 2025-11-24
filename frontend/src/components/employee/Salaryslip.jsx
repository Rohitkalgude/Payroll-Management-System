import React, { useState } from "react";
import Logo from "../../assets/Logo";
import axios from "axios";
import { useEffect } from "react";
import EmpContext from "../../context/EmployeeContext";
import { useContext } from "react";

function Salaryslip() {
  const [slipsData, setSlipData] = useState();

  const { emp } = useContext(EmpContext);

  useEffect(() => {
    const fetchSlip = async () => {
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
          "http://localhost:3000/api/employee/fetchEmployeeSalarySlips",
          body,
          config
        );
        // setSlip(result.data.Slip)
        setSlipData(result.data.salarySlips);
      } catch (err) {
        console.error(err);
      }
    };
    if (emp && emp._id) {
      fetchSlip();
      // Call the function if emp is defined
    } else {
      // Retry fetching attendance after a short delay if emp is undefined
      const timer = setTimeout(fetchSlip, 1000); // Adjust delay as needed
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [emp]);

  function changeDateFormate(dateString) {
    const [month, year] = dateString.split("/");
    const monthNames = [
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
    const monthName = monthNames[parseInt(month) - 1];

    return `${monthName} ${year}`;
  }

  return (
    <div className="p-5 ">
      <ul className="">
        {slipsData ? (
          slipsData.map((item, index) => (
            <div
              key={index}
              className="p-5 max-w-full border rounded-lg mb-5 bg-divBg"
            >
              <div className=" flex justify-between items-center mb-2 border-b-2">
                <div>
                  <div className="text-2xl mb-2 ">
                    PAYSLIP{" "}
                    <span className="text-gray-400 pl-1">
                      {changeDateFormate(item.monthOfSalaryIssue)}
                    </span>
                  </div>
                  <div className="text-sm my-2">
                    RETURN MAFIA PRIVETE LIMITED
                  </div>
                  <div className="uppercase text-xs text-gray-400 mb-5">
                    18 - Ashirvad industrial,
                    <div>bhestan surat - 245251</div>
                  </div>
                </div>
                <div>
                  <Logo className="w-36 h-auto" />
                </div>
              </div>
              <div className=" flex flex-col gap-3 border-b-2 mb-2 ">
                <h1 className="text-xl">employee details :</h1>
                <div className="text-sm flex gap-28 p-2">
                  <div>
                    name : <div>{item.empName}</div>
                  </div>
                  <div>
                    job role : <div>{item.jobRole}</div>
                  </div>
                  <div>
                    email : <div className="lowercase">{item.empEmail}</div>
                  </div>
                  <div>
                    date joined: <div>{emp && emp.joinDate}</div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col gap-3 border-b-2 mb-7">
                <div>
                  <h1 className="text-xl">SALARY DETAILS :</h1>
                </div>
                <div className="p-2 text-sm flex gap-28 ">
                  <div>
                    total payeble days : <div>{item.presentDays + item.absentDays}</div>
                  </div>
                  <div>
                    total working days : <div>{item.presentDays}</div>
                  </div>
                  <div>
                    total absent days : <div>{item.absentDays}</div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      Gross salary: <div>Rs.{item.baseSalary}</div>
                    </div>
                    <div>
                      Loss of pay:{" "}
                      <div>
                        Rs.{Math.round(item.baseSalary - item.inHandSalary)}
                      </div>
                    </div>
                    <div className="text-base">
                      net Salary : <div>Rs.{Math.round(item.inHandSalary)}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs my-2">
                  **Note :{" "}
                  <span>all amounts displayed in this payslip are in INR</span>
                </div>
                <div className="text-xs">
                  this is a system genarated slip and dosen't need signature
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-4xl text-gray-500 font-serif  flex items-center justify-center">
            no salary slips generated...
          </div>
        )}
      </ul>
    </div>
  );
}

export default Salaryslip;
