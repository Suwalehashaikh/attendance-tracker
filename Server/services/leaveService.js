import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";

export const applyLeave = async (req) => {
  const employeeId = req.user.id;

  const { fromDate, toDate, reason } = req.body;

  const employee = await Employee.findById(employeeId);

  if (!employee) {
    throw new Error("Employee not found");
  }

  const leave = await Leave.create({
    employee: employeeId,
    fromDate,
    toDate,
    reason,
  });

  return leave;
};

export const getMyLeaves = async (employeeId) => {
  return await Leave.find({ employee: employeeId }).sort({
    createdAt: -1,
  });
};

export const getAllLeaves = async () => {
  return await Leave.find()
    .populate(
      "employee",
      "employeeId name designation department"
    )
    .sort({ createdAt: -1 });
};

export const updateLeaveStatus = async (
  leaveId,
  status,
  adminRemark
) => {
  const leave = await Leave.findById(leaveId);

  if (!leave) {
    throw new Error("Leave request not found");
  }

  leave.status = status;
  leave.adminRemark = adminRemark || "";

  await leave.save();

  return leave;
};