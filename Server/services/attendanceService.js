import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";
import calculateDistance from "../utils/calculateDistance.js";

export const checkInEmployee = async (req) => {
  const { latitude, longitude } = req.body;

  const employeeId = req.user.id;

  // Find employee with assigned site
  const employee = await Employee.findById(employeeId).populate("site");

  if (!employee) {
    throw new Error("Employee not found");
  }

  // Check if employee has an assigned site
  if (!employee.site) {
    throw new Error("Employee is not assigned to any site");
  }

  // Today's date (00:00:00)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Prevent multiple check-ins for the same day
  const alreadyCheckedIn = await Attendance.findOne({
    employee: employee._id,
    date: today,
  });

  if (alreadyCheckedIn) {
    throw new Error("Already checked in today");
  }

  // ===============================
  // GPS GEOFENCING
  // ===============================

  const distance = calculateDistance(
    latitude,
    longitude,
    employee.site.latitude,
    employee.site.longitude
  );

  console.log(`Distance from site: ${distance.toFixed(2)} meters`);

  if (distance > employee.site.radius) {
    throw new Error("You are outside the site boundary");
  }

  // ===============================
  // CREATE ATTENDANCE
  // ===============================
console.log("Attendance User:", req.user);
  const attendance = await Attendance.create({
    employee: employee._id,
    site: employee.site._id,
    date: today,
    checkIn: new Date(),

    checkInLocation: {
      latitude,
      longitude,
    },

    status: "Present",
  });

  return attendance;
};
export const checkOutEmployee = async (req) => {
  const { latitude, longitude } = req.body;

  const employeeId = req.user.id;

  const employee = await Employee.findById(employeeId).populate("site");

  if (!employee) {
    throw new Error("Employee not found");
  }

  // Today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find today's attendance
  const attendance = await Attendance.findOne({
    employee: employee._id,
    date: today,
  });

  if (!attendance) {
    throw new Error("Please check in first");
  }

  if (attendance.checkOut) {
    throw new Error("Already checked out today");
  }

  // GPS Validation
  const distance = calculateDistance(
    latitude,
    longitude,
    employee.site.latitude,
    employee.site.longitude
  );

  if (distance > employee.site.radius) {
    throw new Error("You are outside the site boundary");
  }

  // Save checkout time
  attendance.checkOut = new Date();

  attendance.checkOutLocation = {
    latitude,
    longitude,
  };

  // Calculate working hours
  const milliseconds =
    attendance.checkOut - attendance.checkIn;

  attendance.workingHours = Number(
    (milliseconds / (1000 * 60 * 60)).toFixed(2)
  );

  await attendance.save();

  return attendance;
};
export const getMyAttendance = async (employeeId) => {
  const attendance = await Attendance.find({
    employee: employeeId,
  })
    .populate("site", "siteName siteCode city")
    .sort({ date: -1 });

  return attendance;
};
export const getAllAttendance = async () => {
  const attendance = await Attendance.find()
    .populate(
      "employee",
      "employeeId name designation department"
    )
    .populate(
      "site",
      "siteCode siteName city"
    )
    .sort({ date: -1 });

  return attendance;
};