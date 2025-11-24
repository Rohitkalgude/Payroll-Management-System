const Employee = require('../../models/employeeModel');
const SalaryHistory = require('../../models/SalaryHistoryModel');

const generateSalarySlip = async (req, res) => {
  try {
    const { empId, monthOfSalaryIssue } = req.body;

    if (!empId || !monthOfSalaryIssue) {
      return res.status(400).json({ error: 'Employee ID and month of salary issue are required' });
    }

    // Find the employee
    const employee = await Employee.findById(empId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Parse the month and year of salary issue
    const [issueMonth, issueYear] = monthOfSalaryIssue.split('/').map(Number);

    // Parse the employee's joining month and year from the joinDate string
    const [joinDay, joinMonth, joinYear] = employee.joinDate.split('/').map(Number);

    // Check if the salary slip can be generated based on the joining date
    if (issueYear < joinYear || (issueYear === joinYear && issueMonth < joinMonth)) {
      return res.status(400).json({
        error: `Salary slip cannot be generated for ${monthOfSalaryIssue}. Employee joined in ${joinMonth}/${joinYear}.`
      });
    }

    // Find the salary history document for the employee
    let salaryHistory = await SalaryHistory.findOne({ empId });

    if (salaryHistory) {
      // Check if the salary slip for the given month-year already exists
      const existingSlip = salaryHistory.salarySlips.find(
        slip => slip.monthOfSalaryIssue === monthOfSalaryIssue
      );

      if (existingSlip) {
        return res.status(400).json({ error: `Salary slip for ${monthOfSalaryIssue} already exists `});
      }
    } else {
      // If no salary history exists, create a new one
      salaryHistory = new SalaryHistory({ empId });
    }

    // Calculate the present days and absent days
    const presentDays = employee.attendance.filter(date => {
      const [day, month, year] = date.split('/');
      return `${month}/${year} === monthOfSalaryIssue`;
    }).length;

    const totalDaysInMonth = new Date(issueYear, issueMonth, 0).getDate();
    const absentDays = totalDaysInMonth - presentDays;

    // Calculate the in-hand salary
    const inHandSalary = (employee.salary / totalDaysInMonth) * presentDays;

    // Create the salary slip
    const salarySlip = {
      empName: employee.name,
      empEmail: employee.email,
      jobRole: employee.jobRole,
      baseSalary: employee.salary,
      monthOfSalaryIssue,
      presentDays,
      absentDays,
      inHandSalary
    };

    // Add the new salary slip to the salary history
    salaryHistory.salarySlips.push(salarySlip);

    // Update the employee's total salary paid
    employee.salaryPaid += inHandSalary;

    // Save the updated employee and salary history documents
    await employee.save();
    await salaryHistory.save();

    res.status(201).json({ message: 'Salary slip generated and stored successfully', salarySlip });
  } catch (error) {
    console.error('Error generating salary slip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = generateSalarySlip;