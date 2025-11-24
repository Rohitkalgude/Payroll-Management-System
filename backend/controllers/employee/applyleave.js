const mongoose = require("mongoose");
const Employee = require("../../models/employeeModel");

// Function to parse date from "dd/mm/yyyy" to Date object
const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(`${year}-${month}-${day}`);
};

// Check if two date ranges overlap
const isOverlapping = (start1, end1, start2, end2) => {
  return start1 <= end2 && end1 >= start2;
};

// Create a leave request
const applyleave = async (req, res) => {
  try {
    const { empId, startDate, endDate, reason } = req.body;

    if (!empId || !startDate || !endDate || !reason) {
      return res
        .status(400)
        .json({
          error: "Employee ID, start date, end date, and reason are required",
        });
    }

    const start = parseDate(startDate);
    const end = parseDate(endDate);

    // Ensure that end date is not before start date
    if (end < start) {
      return res
        .status(400)
        .json({
          error: "End date must be the same or later than the start date",
        });
    }

    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Include both start and end dates

    // Find the employee
    const employee = await Employee.findById(empId);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Parse the employee's join date
    const joinDate = parseDate(employee.joinDate);

    // Check if the leave start date is before the join date
    if (start < joinDate) {
      return res
        .status(400)
        .json({
          error: `Cannot apply for leave before the joining date: ${employee.joinDate}`,
        });
    }

    // Check for overlapping leaves
    const hasOverlap = employee.leaves.some((leave) => {
      const leaveStart = parseDate(leave.startDate);
      const leaveEnd = parseDate(leave.endDate);

      return isOverlapping(start, end, leaveStart, leaveEnd);
    });

    if (hasOverlap) {
      return res
        .status(400)
        .json({ error: "Leave already applied for the same dates" });
    }

    // Create a new leave request
    const leave = {
      _id: new mongoose.Types.ObjectId(),
      startDate,
      endDate,
      numberOfDays: diffDays,
      reason,
      adminMsg: null,
      status: "pending",
    };

    employee.leaves.push(leave);
    await employee.save();

    res
      .status(201)
      .json({ message: "Leave request created successfully", leave });
  }catch (error) {
    console.error("Error creating leave request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = applyleave;