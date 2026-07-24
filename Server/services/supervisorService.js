import Employee from "../models/Employee.js";

import Leave from "../models/Leave.js";


export const getSupervisorWorkers = async (supervisorId) => {
  const supervisor = await Employee.findById(supervisorId);

  if (!supervisor) {
    throw new Error("Supervisor not found");
  }

  const workers = await Employee.find({
    site: supervisor.site,
    role: "employee",
  })
    .select(
      "employeeId name designation department phone status isActive"
    )
    .sort({ createdAt: -1 });

  return workers;
};
// ================= Supervisor Leave List =================

export const getSupervisorLeaves = async (supervisorId) => {
  const supervisor = await Employee.findById(supervisorId);

  if (!supervisor) {
    throw new Error("Supervisor not found");
  }

  const workers = await Employee.find({
    site: supervisor.site,
    role: "employee",
  }).select("_id");

  const workerIds = workers.map((worker) => worker._id);

  const leaves = await Leave.find({
    employee: { $in: workerIds },
  })
    .populate(
      "employee",
      "employeeId name designation department"
    )
    .sort({ createdAt: -1 });

  return leaves;
};

// ================= Approve / Reject Leave =================

export const supervisorLeaveAction = async (
  supervisorId,
  leaveId,
  status,
  remark
) => {
  const supervisor = await Employee.findById(supervisorId);

  if (!supervisor) {
    throw new Error("Supervisor not found");
  }

  const leave = await Leave.findById(leaveId).populate(
    "employee"
  );

  if (!leave) {
    throw new Error("Leave request not found");
  }

  if (
    leave.employee.site.toString() !==
    supervisor.site.toString()
  ) {
    throw new Error("Access Denied");
  }

  if (!["Approved", "Rejected"].includes(status)) {
    throw new Error(
      "Status must be Approved or Rejected"
    );
  }

  leave.status = status;
  leave.adminRemark = remark || "";

  await leave.save();

  return leave;
};
// ================= Supervisor Workers =================

