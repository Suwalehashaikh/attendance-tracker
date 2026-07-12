import Employee from "../models/Employee.js";

export const createEmployee = async (employeeData) => {
  const count = await Employee.countDocuments();

  const employeeId = `ATS-${new Date().getFullYear()}-${String(
    count + 1
  ).padStart(4, "0")}`;

  const employee = await Employee.create({
    employeeId,
    ...employeeData,
  });

  return employee;
};

export const getEmployees = async () => {
  return await Employee.find().sort({ createdAt: -1 });
};
export const getEmployeeById = async (id) => {
  return await Employee.findById(id);
};
export const updateEmployee = async (id, employeeData) => {
  return await Employee.findByIdAndUpdate(id, employeeData, {
    new: true,
    runValidators: true,
  });
};