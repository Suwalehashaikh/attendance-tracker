import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";
import Site from "../models/Site.js";
import Leave from "../models/Leave.js";

// ================= ADMIN DASHBOARD =================

export const getDashboardStats = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalEmployees = await Employee.countDocuments({
    role: "employee",
  });

  const totalSupervisors = await Employee.countDocuments({
    role: "supervisor",
  });

  const totalSites = await Site.countDocuments();

  const presentToday = await Attendance.countDocuments({
    date: today,
  });

  const checkedOut = await Attendance.countDocuments({
    date: today,
    checkOut: { $ne: null },
  });

  const checkedIn = presentToday;

  const absentToday = totalEmployees - presentToday;

  const pendingLeaves = await Leave.countDocuments({
    status: "Pending",
  });

  return {
    totalEmployees,
    totalSupervisors,
    totalSites,
    presentToday,
    absentToday,
    checkedIn,
    checkedOut,
    pendingLeaves,
  };
};

// ================= SUPERVISOR DASHBOARD =================

export const getSupervisorDashboard = async (
  supervisorId
) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const supervisor = await Employee.findById(
    supervisorId
  );

  if (!supervisor) {
    throw new Error("Supervisor not found");
  }

  const totalWorkers = await Employee.countDocuments({
    site: supervisor.site,
    role: "employee",
  });

  const workerIds = await Employee.find({
    site: supervisor.site,
    role: "employee",
  }).select("_id");

  const ids = workerIds.map((emp) => emp._id);

  const presentToday = await Attendance.countDocuments({
    employee: { $in: ids },
    date: today,
  });

  const absentToday = totalWorkers - presentToday;

  const pendingLeaves = await Leave.countDocuments({
    employee: { $in: ids },
    status: "Pending",
  });

  return {
    totalWorkers,
    presentToday,
    absentToday,
    pendingLeaves,
  };
};