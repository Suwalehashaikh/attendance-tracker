import Employee from "../models/Employee.js";
import Site from "../models/Site.js";
import bcrypt from "bcrypt";







export const createEmployee = async (employeeData) => {
  const count = await Employee.countDocuments();

  const employeeId = `ATS-${new Date().getFullYear()}-${String(
    count + 1
  ).padStart(4, "0")}`;

  const hashedPassword = await bcrypt.hash(
    employeeData.password,
    10
  );

  const employee = await Employee.create({
    employeeId,
    ...employeeData,
    password: hashedPassword,
  });

  return employee;
};

export const getEmployees = async () => {
  return await Employee.find()
    .populate("site", "siteName siteCode city")
    .sort({ createdAt: -1 });
};
export const getEmployeeById = async (id) => {
  return await Employee.findById(id).populate(
    "site",
    "siteName siteCode city"
  );
};
export const updateEmployee = async (id, employeeData) => {
  if (employeeData.site) {
    const site = await Site.findById(employeeData.site);

    if (!site) {
      throw new Error("Selected site does not exist");
    }
  }

  return await Employee.findByIdAndUpdate(id, employeeData, {
    new: true,
    runValidators: true,
  }).populate("site", "siteName siteCode city");
};