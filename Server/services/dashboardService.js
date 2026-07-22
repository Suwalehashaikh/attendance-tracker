import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";
import Site from "../models/Site.js";

export const getDashboardStats = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalEmployees = await Employee.countDocuments();

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

  return {
    totalEmployees,
    totalSites,
    presentToday,
    absentToday,
    checkedIn,
    checkedOut,
  };
};