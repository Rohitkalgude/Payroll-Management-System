const Employee = require('../../models/employeeModel');

// Fetch all pending leave requests with employee details
const getAllLeaves = async (req, res) => {
  try {
    // Find all employees with at least one pending leave request
    const employees = await Employee.find({ 'leaves.status': { $in: ['rejected', 'approved'] } }, 'name jobRole photo leaves ');

    // Filter out only the pending leaves and format the response
    const allLeaves = employees.map(employee => {
      const leaves = employee.leaves.filter(leave => leave.status === 'rejected' || leave.status === 'approved');
      return leaves.map(leave => ({
        empId: employee._id,
        name: employee.name,
        jobRole: employee.jobRole,
        photo: employee.photo, // Ensure this is populated
        leaveId: leave._id,
        startDate: leave.startDate,
        endDate: leave.endDate,
        numberOfDays: leave.numberOfDays,
        reason: leave.reason,
        adminMsg: leave.adminMsg,
        status: leave.status,
        
      }));
    }).flat();

    res.status(200).json({ allLeaves });
  } catch (error) {
    console.error('Error fetching pending leave requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getAllLeaves;
